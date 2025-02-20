import ExecEvaluation from '@/components/views/evaluations/execute';
import EvaluationManager from '@/lib/interactions/backend/evaluations';
import { fetchApplicant } from '@/lib/services/server_side_props';

export default function Main(props) {
  return <ExecEvaluation {...props} />;
}

export async function getServerSideProps({ req, params }) {
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
    if (applicant.error === 'EmailNotVerifiedException') {
      return {
        redirect: {
          destination: `/auth/signup/confirm${redirectUrl}`,
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: `/auth/signin${redirectUrl}`,
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

  const { evaluation_id } = params;

  let applicant_evaluation;

  await EvaluationManager.applicant.get({
    evaluation_id,
    onSuccess: (data) => {
      applicant_evaluation = data;
    },
  });

  return { props: { applicant, applicant_evaluation } };
}
