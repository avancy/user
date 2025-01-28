import { ensureAuthenticatedApplicantMiddleware, getCurrentApplicantModel } from '@/lib/applicant';
import nextConnect from 'next-connect';

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(ensureAuthenticatedApplicantMiddleware);

apiRoute.get(async (req, res) => {
  let applicant = req.applicant;
  res.status(200).json({
    position_title: applicant.position_title,
    about: applicant.about,
  });
  return;
});

apiRoute.post(async (req, res) => {
  let applicant = req.applicant;
  let { position_title, about } = req.body;
  applicant.position_title = position_title;
  applicant.about = about;
  await applicant.save();
  res.status(200).send({ position_title, about });
  return;
});

export default apiRoute;
