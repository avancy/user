import ExecEvaluation from '@/components/views/evaluations/execute';
import EvaluationManager from '@/lib/interactions/backend/evaluations';
import { fetchApplicant } from '@/lib/services/server_side_props';
import EvaluationUtil from '@/lib/util/evaluation_util';
import { useEffect, useState } from 'react';

export default function Main({ applicant, evaluation_id }) {
  const [applicant_evaluation, setApplicantEvaluation] = useState(null);
  useEffect(() => {
    EvaluationManager.applicant.get({
      evaluation_id,
      onSuccess: (data) => setApplicantEvaluation(EvaluationUtil.filterUserAnswers(data)),
    });
  }, []);
  if (!applicant_evaluation) {
    return null;
  }
  return <ExecEvaluation applicant={applicant} applicant_evaluation={applicant_evaluation} />;
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

  return {
    props: {
      applicant,
      evaluation_id,
    },
  };
}
