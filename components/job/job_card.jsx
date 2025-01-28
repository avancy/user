import { classNames } from '@/util/css';

export function Jobs({ jobs }) {
  return (
    <div className="px-4 mx-auto max-w-7xl">
      <div className="grid max-w-md grid-cols-1 gap-8 mx-auto isolate lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={classNames(
              'ring-1 ring-gray-400 rounded-3xl p-4 xl:p-6 bg-white shadow-md shadow-gray-600',
              'max-w-md flex flex-col justify-between',
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={job.id}
                  className={classNames(
                    'text-gray-600 font-semibold leading-8 truncate ',
                    'text-lg md:text-xl lg:text-lg',
                  )}
                >
                  {job.title}
                </h3>
                <p className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-900">
                  {job.hiring_policy}
                </p>
              </div>

              <p className="text-xs text-gray-400">
                {job?.city?.name} - {job?.state?.name}
              </p>
            </div>

            <a
              href={`/jobs/${job.slug}`}
              aria-describedby={job.id}
              className={classNames(
                'bg-primary text-white shadow-sm hover:opacity-60',
                'block rounded-md py-2 px-3 text-center text-sm leading-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mt-8',
              )}
            >
              Ver detalhes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
