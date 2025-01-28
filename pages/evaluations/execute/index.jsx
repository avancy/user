import TempExecuteDisc from '@/components/views/evaluations/temp_execute_disc';
import { fetchApplicant } from '@/lib/services/server_side_props';

export default function Main({ applicant }) {
  return <TempExecuteDisc applicant={applicant} />;
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
