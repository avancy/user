import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import CandidateHomeLayout from './dashboard/candidate_home_layout';
import { useState, useEffect } from 'react';

export default function DiscFinish({ disc, restartDisc = () => {}, applicant }) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [canRedo, setCanRedo] = useState(false);
  const totalWords = 39;
  const chosenWords = disc?.value?.reduce((sum, item) => sum + item.qnt, 0) || 0;

  useEffect(() => {
    const updatedAt = new Date(disc.updated_at);
    updatedAt.setDate(updatedAt.getDate() + 90);
    const now = new Date();
    const diffDays = Math.ceil((updatedAt - now) / (1000 * 60 * 60 * 24));

    setDaysLeft(diffDays);
    setCanRedo(diffDays <= 0);
  }, [disc.updated_at]);

  return (
    <CandidateHomeLayout applicant={applicant}>
      <div className="flex flex-col items-center justify-center flex-1 p-6 f bg-gradient-to-r">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl bg-opacity-90 rounded-xl">
          {/* Título com ícone */}
          <div className="flex items-center justify-center mb-4 space-x-2">
            <CheckCircleIcon className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Status do DISC</h2>
          </div>

          {/* Barra de Progresso */}
          <div className="relative pt-1 mb-6">
            <label htmlFor="progress" className="block mb-4 text-sm font-medium text-gray-700">
              Quantidade de palavras selecionadas
            </label>
            <div className="flex justify-between mb-2 text-xs font-medium">
              <span>
                {chosenWords} / {totalWords} palavras
              </span>
            </div>
            <div className="flex mb-4">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${(chosenWords / totalWords) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Verificação de Tempo Restante */}
          {canRedo ? (
            <button
              onClick={restartDisc}
              className="w-full py-2 mt-4 font-bold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Refazer DISC
            </button>
          ) : (
            <div className="mt-4 text-gray-700">
              <div className="flex items-center justify-center mb-4">
                <ExclamationCircleIcon className="w-5 h-5 mr-2 text-yellow-600" />
                <p className="text-sm font-medium">
                  Faltam <span className="font-bold">{daysLeft}</span> dias para que você possa
                  refazer o teste.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </CandidateHomeLayout>
  );
}
