import { DISC_WORDS } from '@/components/evaluation/execute/constants';
import EvaluationExecute from '@/components/evaluation/execute';
import { Notify } from '@/components/common/notification';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import { LoadingText } from '@/components/common/loadding/text';
import DiscFinish from '@/components/disc_finish';

export default function TempExecuteDisc({ applicant }) {
  const [disc, setDisc] = useState(null);
  const [hasDoneDiscBefore, setHasDoneDiscBefore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async (data) => {
    const req = {
      name: 'disc',
      value: data,
    };
    if (hasDoneDiscBefore) {
      await api.put('/assessment', req);
    } else {
      await api.post('/assessment', req);
    }
    Notify.success('Dados salvos com sucesso!');
  };

  const fetchDisc = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/assessment/disc');
      if (response.data) {
        setHasDoneDiscBefore(true);
        const updatedAt = new Date(response.data.updated_at);
        const expirationDate = new Date(updatedAt);
        expirationDate.setDate(expirationDate.getDate() + 90);
        const currentDate = new Date();

        if (currentDate > expirationDate) {
          setDisc(null);
        } else {
          setDisc(response.data);
        }
      } else {
        setHasDoneDiscBefore(false);
        setDisc(null);
      }
    } catch (err) {
      if (err.request.status === 404) return
      
      Notify.error('Erro ao buscar dados de DISC, tente novamente mais tarde');
      console.error(err);
      setDisc(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDisc();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <LoadingText />
      </div>
    );
  }

  if (disc !== null) {
    return <DiscFinish applicant={applicant} disc={disc} />;
  }

  return (
    <EvaluationExecute
      values={DISC_WORDS}
      onSave={handleSave}
      applicant={applicant}
      redirectTo="/evaluations"
    />
  );
}
