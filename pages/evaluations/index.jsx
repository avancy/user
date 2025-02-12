import CandidateHomeLayout from '@/components/dashboard/candidate_home_layout';
import { fetchApplicant } from '@/lib/services/server_side_props';
import Evaluations from '@/components/views/evaluations';

export const EVALUATION_MOCKS = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Teste Disc',
    description: 'Avaliação que revela seu perfil comportamental para um melhor autoconhecimento.',
    status: 'pending',
    criteria: 'criteria',
    general_instructions: 'general_instructions',
    time_per_question: 10,
    image_index: 1,
    validity_period_days: 7,
    created_at: '2022-05-01T00:00:00.000Z',
    updated_at: '2022-05-01T00:00:00.000Z',
  },
  {
    id: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    name: 'Teste Matemático',
    description: 'Avaliação para medir suas habilidades matemáticas e raciocínio lógico.',
    status: 'active',
    criteria: 'math_criteria',
    general_instructions: 'Leia atentamente cada questão antes de responder.',
    time_per_question: 15,
    image_index: 2,
    validity_period_days: 14,
    created_at: '2022-06-01T00:00:00.000Z',
    updated_at: '2022-06-01T00:00:00.000Z',
  },
  {
    id: '5fa85f64-5717-4562-b3fc-2c963f66afa8',
    name: 'Teste de Lógica',
    description: 'Desafie sua capacidade de raciocínio lógico com perguntas instigantes.',
    status: 'draft',
    criteria: 'logic_criteria',
    general_instructions: 'Responda cada questão no menor tempo possível.',
    time_per_question: 20,
    image_index: 3,
    validity_period_days: 10,
    created_at: '2022-07-01T00:00:00.000Z',
    updated_at: '2022-07-01T00:00:00.000Z',
  },
];

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
