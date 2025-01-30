import { fetchApplicant } from '@/lib/interactions/backend/server_side_props';
import EvaluationExecute from '@/components/views/evaluations/execute';

export default function Main({ applicant }) {
  return <EvaluationExecute applicant={applicant} />;
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
