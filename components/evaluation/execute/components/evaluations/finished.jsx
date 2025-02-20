import { motion } from 'framer-motion';
import React from 'react';
import clsx from 'clsx';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Footer } from '@/components/main-page/footer';

export function Button({ variant = 'default', className, ...props }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition focus:outline-none',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
          'border border-blue-600 text-blue-600 hover:bg-blue-50': variant === 'outline',
        },
        className,
      )}
      {...props}
    />
  );
}

export default function EvaluationFinished() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 md:p-6">
        <motion.div
          className="max-w-md p-8 bg-white shadow-lg rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="p-4 mx-auto mb-4 bg-green-100 rounded-full w-min"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <CheckCircleIcon className="text-green-500 w-36 h-36" />
          </motion.div>
          <h1 className="text-2xl font-semibold text-gray-800">Avaliação Finalizada! 🎉</h1>
          <p className="mt-2 text-gray-600">
            Parabéns! Você concluiu sua avaliação com sucesso. Agora, nossos recrutadores irão
            analisar suas respostas com atenção.
          </p>
          <p className="mt-2 text-gray-600">
            Enquanto isso, relaxe e fique tranquilo! Caso precise de mais informações, entraremos em
            contato com você em breve.
          </p>
          <p className="mt-2 text-gray-600">
            Obrigado por participar! Sua jornada rumo a novas oportunidades já começou. 🚀
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <Button onClick={() => (window.location.href = '/')} className="w-full">
              Voltar à Página Inicial
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/blog')}
              className="w-full"
            >
              Ver Dicas de Carreira
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer isCandidatePage={true} />
    </div>
  );
}
