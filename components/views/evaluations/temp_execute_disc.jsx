import { DISC_WORDS } from '@/components/evaluation/execute/constants';
import EvaluationExecute from '@/components/evaluation/execute';
import { Notify } from '@/components/common/notification';
import { api } from '@/lib/api';

export default function TempExecuteDisc({ applicant }) {
  const handleSave = async (data) => {
    const req = {
      name: 'disc',
      value: data,
    };
    await api.post('/assessment', req);
    Notify.success('Dados salvos com sucesso!');
  };

  return (
    <EvaluationExecute
      values={DISC_WORDS}
      onSave={handleSave}
      applicant={applicant}
      redirectTo="/evaluations"
    />
  );
}
