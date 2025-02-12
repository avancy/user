import { EVALUATION_STATUS_COLORS } from '@/constrants/evaluation';
import Link from 'next/link';
import clsx from 'clsx';

export default function EvaluationCard({
  id,
  name,
  description,
  status,
  criteria,
  general_instructions,
  time_per_question,
  image_index,
  validity_period_days,
  created_at,
  updated_at,
}) {
  const statusColor = EVALUATION_STATUS_COLORS[status] || EVALUATION_STATUS_COLORS.pending;

  return (
    <div className="relative min-w-[250px] md:w-[315px] h-[200px] md:h-[191px] rounded-xl shadow-md font-montserrat">
      <div
        className={clsx(
          `absolute inset-x-0 top-0 h-4 bg-gray-400 rounded-t-xl bg-gradient-to-r`,
          statusColor,
        )}
      />

      <div className="absolute top-5 left-0 right-0 flex md:w-[267px] flex-col items-center">
        <div className="w-full pl-4">
          <h2 className="text-2xl font-semibold truncate">
            <abbr title={name} className="no-underline">
              {name}
            </abbr>
          </h2>
          <h3 className="text-sm ">
            <abbr title={description} className="no-underline">
              {description}
            </abbr>
          </h3>
          {/* {status !== 'in_production' && <span className="text-sm">13/04/2025</span>} */}
        </div>
      </div>

      <Link
        href={`/evaluations/execute/${id}`}
        className={clsx(
          'absolute bottom-5 md:w-[267px] left-2  right-2 md:left-0 md:right-0 h-10 bg-brand-gradient-secondary rounded-full flex justify-center items-center mx-auto font-bold text-base',
          status !== 'in_production'
            ? 'cursor-pointer hover:scale-105 duration-300 transition-all opacity-100'
            : 'cursor-not-allowed opacity-70',
        )}
      >
        {status !== 'in_production' ? 'Iniciar Teste' : 'Em produção'}
      </Link>
    </div>
  );
}
