import { LinkIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/util/css';
import Evaluation from '.';

export function GroupEvaluation({ groupEvaluation, job, open, setOpen }) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 transform hover:scale-110 hover:-rotate-90 text-white-600 hover:text-blue-800"
          >
            <LinkIcon className="w-4 h-4" />
          </a>
          <h1
            className="text-2xl font-semibold text-gray-900 truncate cursor-pointer"
            onClick={setOpen}
          >
            {job.title}
          </h1>
        </div>

        {/* Seta para alternar estado no celular */}
        <div
          className={`cursor-pointer flex-grow md:hidden transition-transform duration-300 flex justify-end min-w-10`}
          onClick={setOpen}
        >
          <ChevronDownIcon
            className={`w-6 h-6 text-gray-600 transition-all duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Animação de transição */}
      <div
        className={classNames(
          'flex flex-col flex-1 w-full h-full gap-6 px-2 transition-all duration-300 ease-in-out overflow-x-auto items-center md:p-5 md:h-auto md:flex-row md:opacity-100 md:max-h-[9999px] md:pt-5',
          open ? 'opacity-100 max-h-[9999px] pt-5' : 'opacity-0 max-h-0 pt-0',
        )}
      >
        {groupEvaluation.map((evaluation) => (
          <Evaluation key={evaluation.id} evaluation={evaluation} job_id={job?.id} />
        ))}
      </div>
    </div>
  );
}

export default GroupEvaluation;
