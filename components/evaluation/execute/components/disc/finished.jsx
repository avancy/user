import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Card, Typography, Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function DiscFinished() {
  const router = useRouter();
  const handleBackClick = () => {
    router.push('/evaluations');
  };

  return (
    <div className="flex items-center justify-center flex-1 h-full sm:bg-gray-50/50">
      <div className="w-full p-12 sm:shadow-lg sm:max-w-md sm:rounded-2xl sm:bg-white">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="p-4 mb-6 bg-green-100 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <CheckCircleIcon className="text-green-500 w-36 h-36" />
          </motion.div>
          <Typography variant="h4" className="mb-2">
            Avaliação Concluída!
          </Typography>
          <Typography className="mb-4 text-gray-600">
            Parabéns por concluir a avaliação DISC! Os resultados serão processados em breve.
          </Typography>
          <Typography variant="small" className="text-gray-500">
            Caso precise de mais informações ou tenha dúvidas, entre em contato com o suporte.
          </Typography>
          <Button
            onClick={handleBackClick}
            color="gray"
            className="mt-4 transition-all duration-300 hover:bg-brand-primary-100"
          >
            Voltar para as Avaliações
          </Button>
        </div>
      </div>
    </div>
  );
}
