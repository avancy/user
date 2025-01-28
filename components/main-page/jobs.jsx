import { MapPinIcon, UsersIcon } from '@heroicons/react/20/solid';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Listbox } from '@headlessui/react';

export function Jobs({ jobs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const suggestionsRef = useRef(null);

  const states = useMemo(() => {
    return [...new Set(jobs.map((job) => job.state.name))];
  }, [jobs]);

  const departments = useMemo(() => {
    return [...new Set(jobs.map((job) => job.department.name))];
  }, [jobs]);

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => a.title.localeCompare(b.title));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return sortedJobs.filter((job) => {
      const words = job.title.split(' ').map((word) => word.toLowerCase());
      const startsWithSearchTerm = words.some((word) => word.startsWith(searchTerm.toLowerCase()));
      const matchesState = selectedState ? job.state.name === selectedState : true;
      const matchesDepartment = selectedDepartment
        ? job.department.name === selectedDepartment
        : true;
      return startsWithSearchTerm && matchesState && matchesDepartment;
    });
  }, [sortedJobs, searchTerm, selectedState, selectedDepartment]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const currentJobs = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, filteredJobs]);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pageNumbers.push(1, '...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        pageNumbers.push('...', totalPages);
      }
    }

    return pageNumbers;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, currentPage, totalPages]);

  useEffect(() => {
    const jobTitles = jobs.map((job) => job.title);
    const uniqueJobTitles = Array.from(new Set(jobTitles.map((title) => title.toLowerCase())));
    setSuggestions(uniqueJobTitles);
  }, [jobs]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
    setShowSuggestions(true);

    // Filtrar sugestões para títulos cuja primeira letra começa com a letra digitada
    setFilteredSuggestions(
      suggestions.filter((suggestion) => {
        return suggestion.toLowerCase().startsWith(newSearchTerm);
      }),
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedDepartment('');
  };

  return (
    <Container1>
      <div className="flex flex-col p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Pesquise por vaga..."
                className="w-full px-4 py-2 border-none rounded-lg shadow-md appearance-none"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <div className="absolute top-2 right-3 ">
                <MagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </div>
              {showSuggestions && (
                <ul
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-2 max-h-[200px] overflow-y-auto  bg-white border rounded-md shadow-md"
                >
                  {filteredJobs.map((job, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(job)}
                    >
                      {job.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="w-full">
              <Listbox value={selectedState} onChange={setSelectedState}>
                <Listbox.Button className="relative w-full px-4 py-2 text-left text-gray-700 bg-white border-none rounded-lg shadow-md appearance-none">
                  {selectedState || 'Todos os estados'}
                  <span className="absolute flex items-center pr-2 pointer-events-none top-3 right-3">
                    <ChevronDownIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 w-full max-w-xl py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {states.map((state, index) => (
                    <Listbox.Option key={index} value={state}>
                      {({ active }) => (
                        <li
                          className={`${
                            active ? 'bg-gray-500' : 'bg-white text-black'
                          } px-4 py-2 cursor-pointer hover:bg-gray-200`}
                        >
                          {state}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="w-full">
              <Listbox value={selectedDepartment} onChange={setSelectedDepartment}>
                <Listbox.Button className="relative w-full px-4 py-2 text-left text-gray-700 bg-white border-none rounded-lg shadow-md appearance-none">
                  {selectedDepartment || 'Todos os departamentos'}
                  <span className="absolute flex items-center pr-2 pointer-events-none top-3 right-3">
                    <ChevronDownIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 w-full max-w-xl py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {departments.map((department, index) => (
                    <Listbox.Option key={index} value={department}>
                      {({ active }) => (
                        <li
                          className={`${
                            active ? 'bg-gray-500' : 'bg-white text-black'
                          } px-4 py-2 cursor-pointer hover:bg-gray-200`}
                        >
                          {department}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="w-full">
              <button
                onClick={clearFilters}
                disabled={!searchTerm && !selectedState && !selectedDepartment}
                className={`w-full ${
                  !searchTerm && !selectedState && !selectedDepartment
                    ? ' text-gray-500 cursor-not-allowed'
                    : 'text-primary'
                }`}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div>{filteredJobs.length} vagas encontradas</div>
          <select
            id="itemsPerPage"
            name="itemsPerPage"
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            value={itemsPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>

        <JobsGrid jobs={currentJobs} />
      </div>
      <div className="flex justify-center mt-4 md:justify-end">
        <button onClick={() => paginate(1)} disabled={currentPage === 1} className="px-2 py-1 mr-2">
          <ChevronDoubleLeftIcon className="w-4 h-4 text-primary" />
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 mr-2 "
        >
          <ChevronLeftIcon className="w-4 h-4 text-primary" />
        </button>
        {generatePageNumbers().map((number, index) => (
          <button
            key={index}
            className={`${
              number === currentPage ? 'underline text-primary' : ''
            } hover:bg-gray-200 px-2 py-1 mx-1 `}
            onClick={() => (typeof number === 'number' ? paginate(number) : null)}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2 py-1 ml-2 "
        >
          <ChevronRightIcon className="w-4 h-4 text-primary" />
        </button>

        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 ml-2"
        >
          <ChevronDoubleRightIcon className="w-4 h-4 text-primary" />
        </button>
      </div>
    </Container1>
  );
}

function Container1({ children }) {
  return (
    <div className="p-4 mt-10 ">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative pt-12 pb-6 sm:pb-6 xl:col-start-1 xl:pb-4">
          <div className="flex flex-col items-center justify-center">
            <h2
              id="jobs"
              className="relative text-2xl font-medium text-center text-black md:text-3xl lg:text-4xl bg-gradient-to-r bg-clip-text"
            >
              Veja nossas vagas
            </h2>
          </div>
          <div className="mt-12 gap-y-12 gap-x-6 ">{children}</div>
        </div>
      </div>
    </div>
  );
}

function JobsGrid({ jobs }) {
  return (
    <div className="overflow-hidden sm:rounded-md bg-opacity-70">
      <ul role="list" className="flex flex-col gap-10">
        {jobs.length === 0 ? (
          <li className="border-b-4 divide-gray-400 opacity-80">
            <div className="block px-4 py-4 sm:px-6">
              <p className="text-xl font-medium text-center opacity-75">
                Não há vagas disponíveis no momento.
              </p>
            </div>
          </li>
        ) : (
          jobs.map((job) => (
            <li
              key={job.id}
              className="transition-all rounded-lg bg-gradient-to-r from-primary to-transparent"
            >
              <div className="block">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <a
                      href={`${job?.url}`}
                      target="_blank"
                      className="text-xl font-medium text-white truncate hover:underline"
                    >
                      <span className="flex flex-row items-center">{job.title.toUpperCase()}</span>
                    </a>
                    <div className="flex flex-shrink-0 ml-2">
                      <p className="inline-flex px-2 text-xs font-semibold leading-5 text-white border-2 rounded-full shadow-md bg-primary ">
                        {job.hiring_policy}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-white">
                        <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 " aria-hidden="true" />
                        {job?.department?.name}
                      </p>
                      <p className="flex items-center mt-2 text-sm text-white sm:mt-0 sm:ml-6">
                        <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 " aria-hidden="true" />
                        {job?.city?.name} - {job?.state?.name}
                      </p>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-secundary sm:mt-0">
                      {/*
                <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-50" aria-hidden="true" /> */}
                      <p>
                        {/* Closing on <time dateTime={job.closeDate}>{job.closeDateFull}</time> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
