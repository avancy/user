import CandidateHomeLayout from '@/components/dashboard/candidate_home_layout';
import { fetchApplicant } from '@/lib/services/server_side_props';
import ApplicationsView from '@/components/views/application';

export default function Applications({ applicant }) {
  return (
    <CandidateHomeLayout applicant={applicant}>
      <ApplicationsView applicant={applicant} />
    </CandidateHomeLayout>
  );
}

export async function getServerSideProps({ req }) {
  const applicant = await fetchApplicant(req);

  if (applicant == null) {
    const redirect = `/auth/signin?redirect=${encodeURIComponent(`${req.url}`)}`;

    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    };
  }

  return { props: { applicant } };
}
