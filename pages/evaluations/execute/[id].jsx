import ExecEvaluation from '@/components/views/evaluations/execute';
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

  const { id } = params;
  const applicant_evaluation = {
    id,
    answers: '{}',
    evaluation_id: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    applicant_id: '5fa85f64-5717-4562-b3fc-2c963f66afa8',
    job_application_id: '6fa85f64-5717-4562-b3fc-2c963f66afa9',
    evaluation: {
      id: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
      name: 'Teste de matemática',
      evaluation_type: 'form',
      description:
        'Este é o primeiro passo para compreender melhor seu perfil comportamental e explorar suas forças e oportunidades de desenvolvimento. Este teste é uma ferramenta poderosa para oferecer insights que irão ajudar você em sua vida pessoal e profissional.',
      criteria: 'criteria',
      general_instructions: 'Leia atentamente cada questão antes de responder.',
      time_per_question: 90,
      image_index: 1,
      validity_period_days: 90,
      questions: [
        {
          id: '7fa85f64-5717-4562-b3fc-2c963f66afaa',
          evaluation_id: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
          question_text: 'Qual destas cores você prefere?',
          question_type: 'multiple_choice',
          multiple_choices: [
            {
              id: '8fa85f64-5717-4562-b3fc-2c963f66afab',
              text: 'Vermelho',
              question_id: '7fa85f64-5717-4562-b3fc-2c963f66afaa',
              created_at: '2025-02-12T00:00:00.000Z',
              updated_at: '2025-02-12T00:00:00.000Z',
            },
            {
              id: '9fa85f64-5717-4562-b3fc-2c963f66afac',
              text: 'Azul',
              question_id: '7fa85f64-5717-4562-b3fc-2c963f66afaa',
              created_at: '2025-02-12T00:00:00.000Z',
              updated_at: '2025-02-12T00:00:00.000Z',
            },
          ],
          created_at: '2025-02-12T00:00:00.000Z',
          updated_at: '2025-02-12T00:00:00.000Z',
        },
      ],
      created_at: '2025-02-12T00:00:00.000Z',
      updated_at: '2025-02-12T00:00:00.000Z',
    },
    valid_days: 7,
    question_quantity: 20,
    time_per_question: 10,
    started: true,
    finished: true,
    time_limit_to_start: '2025-02-15T00:00:00.000Z',
    expired_at: null,
    started_at: '2025-02-12T00:00:00.000Z',
    finished_at: null,
    created_at: '2025-02-12T00:00:00.000Z',
    updated_at: '2025-02-12T00:00:00.000Z',
  };

  return { props: { applicant, applicant_evaluation } };
}
