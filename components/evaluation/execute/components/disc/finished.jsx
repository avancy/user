import { Card, Typography, Button } from '@material-tailwind/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTestContext } from '@/contexts/evaluation';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';

export default function DiscFinished() {
  const { options } = useTestContext();
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/evaluations');
  };

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
      <div className="w-full p-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl sm:p-12 sm:shadow-lg sm:rounded-2xl sm:bg-white">
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
            Avaliação Concluída!
          </Typography>
          <Typography className="mb-4 text-sm text-gray-600 sm:text-base">
            Parabéns por concluir a avaliação DISC! Os resultados serão processados em breve.
          </Typography>
          <Typography variant="small" className="text-sm text-gray-500 sm:text-base">
            Caso precise de mais informações ou tenha dúvidas, entre em contato com o suporte.
          </Typography>
          {options?.expired_at && (
            <Typography variant="small" className="my-5 text-sm text-gray-500 sm:text-base">
              <div>Você poderá refazer o teste em:</div>
              <Countdown date={new Date(options.expired_at)} renderer={renderer} />
            </Typography>
          )}
          <Button
            onClick={handleBackClick}
            color="gray"
            className="w-full mt-4 transition-all duration-300 hover:bg-brand-primary-100 sm:w-auto"
          >
            Voltar para as Avaliações
          </Button>
        </div>
      </div>
    </div>
  );
}
