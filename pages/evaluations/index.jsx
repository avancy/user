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

  if (applicant === null) {
    return {
      redirect: {
        destination: `/auth/signin?redirect=${encodeURIComponent(`${req.url}`)}`,
        permanent: false,
      },
    };
  }

  return { props: { applicant: applicant } };
}
