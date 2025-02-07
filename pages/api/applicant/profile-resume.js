import multer from 'multer';
import nextConnect from 'next-connect';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { UploadedResume } from '@/db';
import { ensureAuthenticatedApplicantMiddleware, getCurrentApplicantModel } from '@/lib/applicant';
import { serialize } from 'superjson';
import path from 'path';

const MAX_SIZE_10_MEGABYTES = 10 * 1024 * 1024;

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

aws.config.update({
  secretAccessKey: process.env.APP_BUCKET_RESUME_SECRET_ACCESS_KEY,
  accessKeyId: process.env.APP_BUCKET_RESUME_ACCESS_KEY_ID,
  region: process.env.APP_BUCKET_RESUME_DEFAULT_REGION,
});

const storageTypes = {
  s3: multerS3({
    s3: new S3Client({
      credentials: {
        secretAccessKey: process.env.APP_BUCKET_RESUME_SECRET_ACCESS_KEY || '',
        accessKeyId: process.env.APP_BUCKET_RESUME_ACCESS_KEY_ID || '',
      },
      region: process.env.APP_BUCKET_RESUME_DEFAULT_REGION || '',
    }),
    bucket: process.env.APP_RESUMES_BUCKET_NAME || '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        let ext = '';
        if (!file.originalname) {
          if (file.mimetype === 'application/pdf') {
            ext = '.pdf';
          }
        } else {
          ext = path.extname(file.originalname);
        }
        const fileName = `${hash.toString('hex')}${ext}`;
        cb(null, fileName);
      });
    },
  }),
  local: {},
};

const multerConfig = {
  storage: storageTypes.s3,
  limits: {
    fileSize: MAX_SIZE_10_MEGABYTES,
  },
  fileFilter: (req, file, cb) => {
    // const allowedMimes = ['application/pdf'];
    // if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
    // } else {
    //   cb(new Error('Invalid file type.'));
    // }
  },
};

const multerResumeUploadMiddleware = multer(multerConfig).single('file');

apiRoute.use(ensureAuthenticatedApplicantMiddleware);
// apiRoute.use(multerResumeUploadMiddleware);

apiRoute.post(async function (req, res) {
  multerResumeUploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send();
      return;
    } else if (err) {
      res.status(500).send();
      return;
    }

    let applicant = req.applicant;

    let file = req?.file || {};
    if (file && Object.keys(file).length > 0) {
      let resume = {
        applicant_id: applicant.id,
        path: file?.location || '',
        url: process.env.APP_UPLOAD_BASE_URL + '/' + file?.key,
        bucket: process.env.APP_RESUMES_BUCKET_NAME || '',
        size: file?.size || 0,
        acl: file?.acl || '',
        location: file?.location || '',
        storage_class: file?.storageClass || '',
        key: file?.key || '',
        plain_text: '',
      };

      let created = null;
      try {
        await UploadedResume.destroy({ where: { applicant_id: applicant.id } });
        created = await UploadedResume.create(resume);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error saving resume');
        return;
      }
      const { json, meta } = serialize(created);
      res.status(201).send(json);
      return;
    }

    res.status(400).send();
  });
});

apiRoute.get(async function (req, res) {
  let applicant = req.applicant;

  let resume = null;
  try {
    resume = await UploadedResume.findOne({ where: { applicant_id: applicant.id }, raw: true });
  } catch (err) {
    res.status(500).send('Error getting resume');
    return;
  }
  if (!resume) {
    res.status(200).send({});
    return;
  }
  const { json, meta } = serialize(resume);
  res.status(200).send(json);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
