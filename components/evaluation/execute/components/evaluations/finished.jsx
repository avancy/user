import { Card, Typography, Button } from '@material-tailwind/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTestContext } from '@/contexts/evaluation';
import Countdown from 'react-countdown';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function EvaluationFinished() {
  const { options } = useTestContext();
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

  const timeSpent = (
    (new Date(options.finished ? options.finished_at : options.expiration_termination).getTime() -
      new Date(options.started_at).getTime()) /
    1000
  ).toFixed(2);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      router.reload();
      return <span>Preparando para refazer o teste...</span>;
    } else {
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full p-6 bg-transparent shadow-none sm:max-w-lg md:max-w-xl lg:max-w-2xl sm:p-12 sm:shadow-lg sm:rounded-2xl sm:bg-white">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="p-4 mb-6 bg-green-100 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <CheckCircleIcon className="text-green-500 w-36 h-36" />
          </motion.div>
          <Typography variant="h4" className="mb-2 text-xl font-semibold sm:text-2xl">
            {options.evaluation.name}
          </Typography>
          <Typography className="mb-4 text-sm text-gray-600 sm:text-base">
            Parabéns! Você concluiu sua avaliação com sucesso. Agora, os recrutadores irão analisar
            suas respostas e decidir se você seguirá nos processos seletivos.
          </Typography>

          <div className="mb-5 text-sm sm:text-base">
            <Typography variant="small" className="text-gray-500">
              <strong>Quantidade de Perguntas:</strong> {options.evaluation.questions.length}
            </Typography>
            <Typography variant="small" className="text-gray-500">
              <strong>Tempo Total Gasto:</strong> {timeSpent} segundos
            </Typography>
            {options?.expired_at ? (
              <Typography variant="small" className="mt-4 text-gray-500">
                <div>Você poderá refazer o teste em:</div>
                <Countdown date={new Date(options.expired_at)} renderer={renderer} />
              </Typography>
            ) : (
              <Typography variant="small" className="mt-4 text-gray-500">
                <div>Tempo restante:</div>
                <Countdown
                  date={
                    new Date(
                      new Date(options.started_at).getTime() +
                        options.valid_days * 24 * 60 * 60 * 1000,
                    )
                  }
                  renderer={renderer}
                />
              </Typography>
            )}
          </div>

          <Button
            onClick={handleBackClick}
            color="gray"
            className="w-full mt-4 transition-all duration-300 hover:bg-brand-primary-100 sm:w-auto"
          >
            Voltar para as Avaliações
          </Button>
        </div>
      </Card>
    </div>
  );
}
