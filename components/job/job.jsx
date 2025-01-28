export function Job({ job }) {
  return (
    <div className="w-full px-4 py-4 transition duration-500 transform bg-white rounded-md shadow-md cursor-pointer bg-opacity-80">
      <div className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-2 space-x-1 text-lg font-semibold text-bookmark-blue">
            <svg
              className="text-gray-700 w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            <span>{job.title}</span>
          </div>
          <span className="px-4 py-1 text-sm font-bold text-white uppercase bg-green-500 rounded-full shadow-xl">
            {' '}
            {job.hiring_policy}{' '}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{job.city}</span>
        </div>
        <div>
          <div className="mt-5">
            <button className="px-2 py-1 my-1 mr-2 text-sm font-semibold tracking-wider text-indigo-600 uppercase transition duration-500 transform border border-indigo-600 rounded cursor-pointer hover:bg-indigo-600 hover:text-white">
              Detalhes
            </button>
            <button className="px-2 py-1 my-1 mr-2 text-sm font-semibold tracking-wider text-indigo-600 uppercase transition duration-500 transform border border-indigo-600 rounded cursor-pointer hover:bg-indigo-600 hover:text-white">
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
