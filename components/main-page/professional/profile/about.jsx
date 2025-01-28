import { jsonFetcher } from '@/lib/util';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Notify } from '../../../common/notification';
import { Spinner } from '../../../common/loadding/spinner';

export function ProfessionalProfileAbout({ setOpen, getUserUpdate }) {
  const { data, error, mutate } = useSWR('/api/applicant/profile-about', jsonFetcher);
  const [positionTitle, setPositionTitle] = useState('');
  const [about, setAbout] = useState('');
  const [hasChanged, setHasChanged] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setPositionTitle(data.position_title);
      setAbout(data.about);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (data.position_title !== positionTitle || data.about !== about) {
        setHasChanged(true);
      } else {
        setHasChanged(false);
      }
    }
  }, [positionTitle, about, data]);

  const submit = async (e) => {
    getUserUpdate(true);
    setSaving(true);
    e.preventDefault();
    fetch('/api/applicant/profile-about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ position_title: positionTitle, about }),
    })
      .then((response) => response.json())
      .then((data) => {
        Notify.success('Dados atualizados.');
        mutate({ position_title: positionTitle, about });
        setHasChanged(false);
      })
      .catch((error) => {
        console.error(error);
        Notify.error('Erro ao atualizar dados.');
      })
      .finally(() => {
        setSaving(false);
        getUserUpdate(false);
      });
  };

  const cancel = () => {
    setOpen(false);
    setPositionTitle(data?.position_title);
    setAbout(data?.about);
    setHasChanged(false);
  };

  return (
    <>
      <form className="flex flex-col justify-between min-h-full" onSubmit={submit}>
        <div className="">
          <div className="px-4 space-y-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
            <div>
              <label
                htmlFor="current-position"
                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
              >
                Posição Atual
              </label>
            </div>
            <div className="sm:col-span-2">
              <input
                type="text"
                name="current-position"
                value={positionTitle}
                disabled={saving}
                onChange={(e) => setPositionTitle(e.target.value)}
                id="current-position"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="px-4 space-y-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
              >
                Sobre você
              </label>
            </div>
            <div className="sm:col-span-2">
              <textarea
                disabled={saving}
                id="about"
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={8}
                maxLength={500}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={cancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!hasChanged}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm disabled:opacity-50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {saving && <Spinner />}
              Salvar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
