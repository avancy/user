import CandidateHomeLayout from '@/components/dashboard/home_layout';
import { fetchApplicant } from '@/lib/interactions/backend/server_side_props';
import ApplicationsView from '@/components/views/application';

export default function Applications({ applicant }) {
  console.log(applicant)
  return (
    <CandidateHomeLayout applicant={applicant}>
      <ApplicationsView applicant={applicant} />
    </CandidateHomeLayout>
  );
}

export async function getServerSideProps({ req }) {
  const applicant = await fetchApplicant(req);

  if (applicant == null) {
    return {
      redirect: {
        destination: `/auth/signin?redirect=${encodeURIComponent(`${req.url}`)}`,
        permanent: false,
      },
    };
  }

  return { props: { applicant } };
}
