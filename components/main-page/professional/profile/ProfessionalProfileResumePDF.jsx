import { jsonFetcher } from '@/lib/util';
import { MyDropzone } from '../../../dropzone-wrapper/my_dropzone';
import useSWR from 'swr';
import { useEffect } from 'react';
import { ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export function ProfessionalProfileResumePDF({ getUserUpdate }) {
  const {
    data: resume,
    error,
    mutate,
    isLoading,
  } = useSWR('/api/applicant/profile-resume', jsonFetcher);
  useEffect(() => {
    getUserUpdate((prevState) => {
      const newState = !prevState;
      return newState;
    });
  }, [resume]);

  return (
    <>
      <div className="px-4 space-y-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
        <div>
          <label
            htmlFor="current-position"
            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
          >
            Seu Currículo atual
          </label>
        </div>
        <div className="sm:col-span-2">
          <div className="block w-full sm:text-sm">
            <div className="block text-sm font-medium sm:mt-px sm:pt-2 ">
              {resume && !isLoading && Object.keys(resume).length === 0 && (
                <span className="text-gray-500">Nenhum currículo cadastrado.</span>
              )}
              {isLoading && resume === undefined && (
                <span className="text-gray-500 animate-pulse">Carregando...</span>
              )}
              {resume && !isLoading && Object.keys(resume).length > 0 && (
                <div className="inline-flex items-center">
                  <a
                    href={resume.url}
                    target="_blank"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-blue-700 border border-transparent rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-auto mr-2 text-blue-700" />
                    Abrir em nova aba
                  </a>

                  {/* <button
                    type="button"
                    className="p-2 text-white rounded-full hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <TrashIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
        <div>
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
          >
            Upload de novo currículo
          </label>
        </div>
        <div className="sm:col-span-2">
          <MyDropzone
            url={`/api/applicant/profile-resume`}
            accept={'application/pdf'}
            label1="Clique ou Arraste seu(s) arquivo(s)"
            label2="Apenas arquivo PDF"
            maxFiles={1}
            onComplete={(res) => {
              typeof onUpdate === 'function' && onUpdate();
              getUserUpdate((prevState) => {
                const newState = !prevState;
                return newState;
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
