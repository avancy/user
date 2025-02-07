import {
  EVALUATION_STATUS_COLORS,
  EVALUATION_STAGE_IMAGES,
  EVALUATION_STATUS,
} from '@/constrants/evaluation';
import Image from 'next/image';
import Link from 'next/link';

export function Evaluation({ evaluation, job_id }) {
  const imageSrc = EVALUATION_STAGE_IMAGES[evaluation.image_index] || null;
  const statusText = EVALUATION_STATUS[evaluation.status] || EVALUATION_STATUS.pending;
  const statusColor =
    EVALUATION_STATUS_COLORS[evaluation.status] || EVALUATION_STATUS_COLORS.pending;

  return (
    <div className="relative flex flex-col gap-2 p-6 border rounded-lg shadow-md md:w-[300px] h-[191px] w-full bg-white">
      {/* Top Accent */}
      <div
        className={`absolute ${statusColor} inset-x-0 top-0 h-2 bg-gray-400 rounded-t-lg bg-gradient-to-r`}
      ></div>

      {/* Status Badge */}
      <div
        className={`absolute top-4 z-10 right-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor}`}
      >
        {statusText}
      </div>

      {/* Image Section */}
      {/* <div className="relative w-full h-[160px] rounded-t-lg overflow-hidden bg-gray-200">
        {imageSrc ? (
          <Image
            src={imageSrc}
            height={160}
            width={300}
            alt={`Imagem para ${evaluation.name}`}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100">
            <span className="px-10 text-sm font-medium text-center">Sem Imagem</span>
          </div>
        )}
      </div> */}

      {/* Header */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold truncate">{evaluation.name}</h2>
        <h3 className="text-sm text-gray-600 truncate">{evaluation.stage.description}</h3>
      </div>

      {/* Separator */}
      {/* <hr className="my-4 border-gray-200" /> */}

      {/* Details */}
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">Tempo para execução: </span>
          {`${Math.floor((evaluation.questions?.length * evaluation.time_per_question) / 60)}m e ${(evaluation.questions?.length * evaluation.time_per_question) % 60}s`}
        </p>
        {/* <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">Etapa:</span> {evaluation.stage.name}
        </p> */}
      </div>

      <button className="w-full rounded-full bg-brand-gradient-secondary h-10 flex justify-center items-center font-montserrat font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
        <Link
          className="w-full"
          href={`/evaluations/execute?evaluation_id=${encodeURIComponent(evaluation.id)}&stage_id=${encodeURIComponent(evaluation.stage_id)}&job_id=${encodeURIComponent(job_id)}`}
        >
          Iniciar Teste
        </Link>
      </button>
    </div>
  );
}

export default Evaluation;
