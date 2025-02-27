import { DocumentIcon, DocumentTextIcon, UserIcon } from '@heroicons/react/20/solid';
import { ProfessionalProfileResumeForm } from './resume_form';
import { ProfessionalProfileResumePDF } from './ProfessionalProfileResumePDF';
import { ProfessionalProfileAbout } from './about';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Tabs } from '../../../tabs';

const tabs = [
  { name: 'Sobre você', icon: UserIcon },
  { name: 'Currículo Preenchido', icon: DocumentTextIcon },
];

export function ProfessionalProfile({ open, setOpen, getUserUpdate }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-4xl pointer-events-auto">
                  <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-2xl font-medium text-center text-gray-900 lg:text-lg md:text-lg sm:text-lg sm:text-left md:text-left lg:text-left">
                            Dados Profissionais
                          </Dialog.Title>
                          <p className="text-xs text-gray-500">
                            Descreva seu cargo atual e perfil de apresentação. Não esqueça de anexar
                            seu currículo para estar apto à aplicar-se às vagas.
                          </p>
                        </div>
                        <div className="flex items-center h-7">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <Tabs
                      tabs={tabs}
                      onSelect={(index) => {
                        setSelectedTab(index);
                      }}
                    >
                      <ProfessionalProfileAbout
                        setOpen={(b) => setOpen(b)}
                        getUserUpdate={getUserUpdate}
                      />
                      <ProfessionalProfileResumeForm getUserUpdate={getUserUpdate} />
                    </Tabs>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
