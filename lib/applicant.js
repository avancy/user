import { Applicant } from '@/db';
import { withSSRContext } from 'aws-amplify';

export async function getCurrentApplicantModel(req) {
  const { Auth } = withSSRContext({ req });
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (err) {
    return null;
  }

  let applicant = await Applicant.findOne({ where: { id: user.username } });
  return applicant;
}

export async function ensureAuthenticatedApplicantMiddleware(req, res, next) {
  let applicant = await getCurrentApplicantModel(req);

  if (!applicant) {
    res.status(401).send('Unauthorized');
    return;
  }
  req.applicant = applicant;
  next();
}
