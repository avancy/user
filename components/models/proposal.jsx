import { useRouter } from 'next/router';
import { Alert } from '../common/alert';
import JobManager from '@/lib/interactions/backend/job';
import { Modal } from '@mui/material';
import { Notify } from '../common/notification';

export default function ModalProposal({ jobInfo }) {
  const router = useRouter();
  const handleAcceptInvite = async () => {
    JobManager.apply({
      job_id: jobInfo?.id,
    });

    JobManager.invite.apply({
      job_id: jobInfo?.id,
      onSucess: () => {
        Modal.hide();
        router.reload();
      },
    });
  };

  const handleDenyInvite = () => {
    JobManager.invite.deny({
      job_id: jobInfo?.id,
      onSucess: () => {
        Notify.success('A aplicação foi recusada e não será mais possível aceitar o convite.');
      },
    });
  };

  return (
    <div className="w-[80vw] px-5 bg-white rounded-lg shadow-md py-7 ">
      <div className="flex justify-center px-6">
        <h2 className="mb-2 text-2xl font-semibold">
          Você foi convidado para a vaga de {jobInfo.title}
        </h2>
      </div>
      <div className="px-6 pb-6">
        <p className="mb-4 text-lg">
          A empresa {jobInfo.company} convidou-lhe para a vaga {jobInfo.title}. Você deseja
          participar do processo seletivo? Se sim, clique no botão "Aceitar convite":
        </p>
        <p>
          Se você clicar em "Recusar convite", o convite será cancelado. Caso não confirme sua
          participação em até 5 dias úteis, o convite expirará automaticamente.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 px-6 rounded-b ">
        <button
          className="px-6 py-2 text-white rounded-md bg-red-500/60 hover:bg-red-500 focus:outline-none"
          onClick={() =>
            Alert.question(
              'Recusar convite da vaga',
              'Você tem certeza que deseja recusar o convite?',
              'Sim',
              'Não',
              handleDenyInvite,
            )
          }
        >
          Recusar convite
        </button>
        <button
          className="px-6 py-2 text-white rounded-md bg-green-700/60 hover:bg-green-600 focus:outline-none"
          onClick={handleAcceptInvite}
        >
          Aceitar convite
        </button>
      </div>
    </div>
  );
}
