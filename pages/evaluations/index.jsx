import CandidateHomeLayout from '@/components/dashboard/candidate_home_layout';
import { fetchApplicant } from '@/lib/services/server_side_props';
import { EVALUATION_MOCKS } from '@/constrants/evaluation';
import Evaluations from '@/components/views/evaluations';

export default function Main({ applicant }) {
  return (
    <CandidateHomeLayout applicant={applicant}>
      <Evaluations evaluations={EVALUATION_MOCKS} />
    </CandidateHomeLayout>
  );
}

export async function getServerSideProps({ req }) {
  const applicant = await fetchApplicant(req);
  const redirectUrl = `?redirect=${encodeURIComponent(req.url)}`;
  if (applicant == null) {
    return {
      redirect: {
        destination: `/auth/signin${redirectUrl}`,
        permanent: false,
      },
    };
  }
  if (applicant?.error) {
    if (applicant.error === 'UserNotFoundException')
      return {
        redirect: {
          destination: `/auth/signin${redirectUrl}`,
          permanent: false,
        },
      };
    return {
      redirect: {
        destination: `/auth/signup/confirm${redirectUrl}`,
        permanent: false,
      },
    };
  }

  const { position_title, about, uploaded_resume } = applicant;
  if (position_title === '' || about === '' || !uploaded_resume || !uploaded_resume.url) {
    return {
      redirect: {
        destination: `/auth/signup/info${redirectUrl}`,
        permanent: false,
      },
    };
  }

  return { props: { applicant } };
}
