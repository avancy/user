import { EVALUATION_STATUS_COLORS } from '@/constrants/evaluation';
import Link from 'next/link';
import clsx from 'clsx';

export default function EvaluationCard({ id, name, description, status, ...rest }) {
  console.log(rest);
  const statusColor = EVALUATION_STATUS_COLORS[status] || EVALUATION_STATUS_COLORS.pending;

  return (
    <div className="flex flex-col min-w-[250px] md:w-[315px] h-[200px] md:h-[191px] rounded-xl shadow-md font-montserrat">
      {/* Barra de status */}
      <div className={clsx('h-4 rounded-t-xl bg-gradient-to-r', statusColor)} />

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 px-4 py-2">
        <h2 className="text-2xl font-semibold truncate">
          <abbr title={name} className="no-underline">
            {name}
          </abbr>
        </h2>
        <p className="overflow-hidden text-sm text-ellipsis line-clamp-3" title={description}>
          {description}
        </p>
      </div>

      {/* Botão de ação */}
      <Link
        href={`/evaluations/execute/${id}`}
        className={clsx(
          'mx-auto mb-3 flex h-10 w-[90%] items-center justify-center rounded-full font-bold text-base transition-all duration-300',
          status !== 'in_production'
            ? 'bg-brand-gradient-secondary cursor-pointer hover:scale-105'
            : 'cursor-not-allowed opacity-70',
        )}
      >
        {status !== 'in_production' ? 'Iniciar Teste' : 'Em produção'}
      </Link>
    </div>
  );
}
