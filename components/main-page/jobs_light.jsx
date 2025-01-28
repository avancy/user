import Image from 'next/image';
import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid';
import { Container } from '@/components/common/container';
import backgroundImage from '@/images/background-faqs.jpg';

export function JobsLight({ jobs }) {
  return (
    <Container1>
      <JobsGrid jobs={jobs} />
    </Container1>
  );
}

function Container1({ children }) {
  return (
    <>
      <div className="w-full h-4 mt-10 bg-gradient-to-b from-gray-100 to-gray-200"></div>
      <div className="relative bg-gray-200">
        <div className="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">
          <div className="w-full h-full xl:grid xl:grid-cols-2">
            <div className="h-full xl:relative xl:col-start-2">
              <img
                className="object-cover w-full h-full opacity-25 xl:absolute xl:inset-0"
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                alt="People working on laptops"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-200 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative pt-12 pb-64 sm:pb-64 xl:col-start-1 xl:pb-24">
            <h2 className="text-3xl font-semibold">
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-100 bg-clip-text">
                Nossas Vagas
              </span>
            </h2>

            <div className="mt-12 gap-y-12 gap-x-6 ">{children}</div>
          </div>
        </div>
      </div>
      <div className="w-full h-4 bg-gradient-to-t from-gray-100 to-gray-900"></div>
    </>
  );
}

function JobsGrid({ jobs }) {
  return (
    <div className="overflow-hidden bg-gray-600 border border-gray-100 shadow-lg shadow-slate-500 sm:rounded-md bg-opacity-70">
      <ul role="list" className="divide-y divide-gray-100">
        {jobs.map((job) => (
          <li key={job.id}>
            <div className="block hover:bg-gray-600 hover:bg-opacity-70">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-xl font-medium text-blue-300 truncate hover:underline"
                  >
                    {job.title}
                  </a>
                  <div className="flex flex-shrink-0 ml-2">
                    <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-900 bg-green-200 rounded-full">
                      {job.hiring_policy}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-50">
                      <UsersIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-50"
                        aria-hidden="true"
                      />
                      {job?.department?.name}
                    </p>
                    <p className="flex items-center mt-2 text-sm text-gray-50 sm:mt-0 sm:ml-6">
                      <MapPinIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-50"
                        aria-hidden="true"
                      />
                      {job?.city?.name} - {job?.state?.name}
                    </p>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-50 sm:mt-0">
                    {/* <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-50" aria-hidden="true" /> */}
                    <p>
                      {/* Closing on <time dateTime={job.closeDate}>{job.closeDateFull}</time> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
