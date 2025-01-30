import CandidateHomeLayout from '@/components/dashboard/home_layout';
import { fetchApplicant } from '@/lib/interactions/backend/server_side_props';
import Evaluations from '@/components/views/evaluations';
import { useEffect, useState } from 'react';
import EvaluationManager from '@/lib/interactions/backend/evaluations';

export default function Main({ applicant }) {
  const [evaluations, setEvaluations] = useState([]);

    useEffect(() => EvaluationManager.applicant.getAll({ onSuccess: setEvaluations }), []);

  return (
    <CandidateHomeLayout applicant={applicant}>
      <Evaluations evaluations={evaluations} />
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
