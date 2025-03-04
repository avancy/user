import CandidateHomeLayout from '@/components/dashboard/candidate_home_layout';
import { fetchApplicant } from '@/lib/services/server_side_props';
import Evaluations from '@/components/views/evaluations';
import EvaluationManager from '@/lib/interactions/backend/evaluations';

export default function Main({ applicant, evaluations }) {
  return (
    <CandidateHomeLayout applicant={applicant}>
      <Evaluations evaluations={evaluations} />
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
    if (applicant.error === 'UserNotFoundException') {
      return {
        redirect: {
          destination: `/auth/signin${redirectUrl}`,
          permanent: false,
        },
      };
    }
    
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

  let response = {
    props: { applicant, evaluations: [] },
  };

  await EvaluationManager.getAll({
    onSuccess: (res) => {
      response.props.evaluations = res;
    },
  });

  return response;
}
