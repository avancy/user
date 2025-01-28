import { ArrowLeftCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { BlueSpinner } from '@/components/common/loadding/blue_spinner';
import SecondStepForm from '../forms/proposal/second_step';
import FourthStepForm from '../forms/proposal/fourth_step';
import { useProposalContext } from '../../contexts/proposal';
import FirstStepForm from '../forms/proposal/first_step';
import ThirdStepForm from '../forms/proposal/third_step';
import FifthStepForm from '../forms/proposal/fifth_step';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function ProposalForm() {
  const {
    isProposalMenuOpen,
    toggleProposalMenu,
    proposalStep,
    previousProposalStep,
    completedSteps,
    isAlertOpen,
    proposal,
  } = useProposalContext();

  const [isLoading, setIsLoading] = useState(false);
  const stepComponents = [
    undefined,
    {
      title: 'Dados pessoais',
      component: <FirstStepForm setIsLoading={setIsLoading} />,
    },
    {
      title: 'Documentação',
      component: <SecondStepForm setIsLoading={setIsLoading} />,
    },
    {
      title: 'Documentação',
      component: <ThirdStepForm setIsLoading={setIsLoading} />,
    },
    {
      title: 'Dependentes',
      component: <FourthStepForm setIsLoading={setIsLoading} />,
    },
    {
      title: 'Upload de Documentos',
      component: <FifthStepForm setIsLoading={setIsLoading} />,
      diff: true,
    },
  ];

  useEffect(() => {
    isProposalMenuOpen &&
      proposal?.id &&
      api.get(`/jobs/proposal/forms/${proposal?.id}`).then(({ data }) => {
        const foundForms = data.filter((form) => form.name.startsWith('form_'));
        const foundForm =
          foundForms.length > 0
            ? foundForms.reduce((prev, current) =>
                Number(current.name.replace('form_', '')) > Number(prev.name.replace('form_', ''))
                  ? current
                  : prev,
              )
            : null;
        if (foundForm) {
          const step = Number(foundForm.name.replace('form_', '')) + 1;
          previousProposalStep(step);
        }
      });
  }, [isProposalMenuOpen, proposal?.id]);

  return (
    <Transition.Root show={isProposalMenuOpen && proposalStep >= 1} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => !isAlertOpen && toggleProposalMenu()}
      >
        <div className="fixed inset-0 overflow-hidden bg-black/60">
          <div className="inset-0 overflow-hidden ">
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
                <Dialog.Panel className="relative flex flex-col justify-between w-screen h-screen max-w-5xl gap-6 px-5 pt-4 pb-20 ml-0 pointer-events-auto md:ml-16 lg:ml-16 md:px-10 lg:px-10 bg-gradient-to-tr from-white to-gray-100">
                  <div className="flex flex-col justify-between">
                    <div className="relative flex items-center justify-between pb-4 md:pb-0 lg:pb-0">
                      <div
                        className="absolute flex items-center justify-center w-8 h-8 rounded-lg md:hidden lg:hidden top-[6px] left-1"
                        onClick={toggleProposalMenu}
                      >
                        <ArrowLeftCircleIcon className="w-full h-full" />
                      </div>
                      <div className="flex flex-col text-2xl ml-10 md:ml-0 lg:ml-0 lg:text-[48px] md:text-[48px]">
                        {stepComponents[proposalStep]?.diff ? (
                          <>
                            <h2 className="font-grotesque text-3xl md:text-2xl md:text-left text-center font-bold text-[#4D41C2]">
                              {stepComponents[proposalStep]?.title || ''}
                            </h2>
                            <p className="pb-4 mt-3 text-sm text-justify">
                              Clique no icone ao centro dos cards para anexar seus documentos.
                              Lembre-se os status do arquivo são identificados por cores:{' '}
                              <span className="font-bold">
                                Amarelo - Pendente, Verde - Anexado.
                              </span>
                            </p>{' '}
                          </>
                        ) : (
                          <h2 className="font-grotesque font-bold text-[#4D41C2]">
                            Ficha Cadastral
                          </h2>
                        )}
                      </div>

                      {!stepComponents[proposalStep]?.diff && (
                        <h3 className="text-3xl font-medium text-gray-400 font-grotesque">
                          {stepComponents[proposalStep]?.title || ''}
                        </h3>
                      )}
                    </div>
                    <hr className="border-t border-gray-300 " />
                  </div>

                  <div className="overflow-y-auto h-[85%] relative">
                    {stepComponents[proposalStep]?.component || null}

                    <div
                      className={`absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full ${isLoading ? 'bg-white' : 'hidden'} `}
                    >
                      {isLoading && <BlueSpinner />}
                    </div>
                  </div>

                  <div
                    className={`flex items-center flex-col gap-5 md:gap-0 lg:gap-0 justify-between md:flex-row lg:flex-row`}
                  >
                    <div
                      className={`flex flex-1 items-center w-auto h-50 order-2 md:order-1 lg:order-1`}
                    >
                      <button
                        onClick={() => {
                          setIsLoading(true);
                          previousProposalStep(proposalStep - 1).finally(() => setIsLoading(false));
                        }}
                        className="flex items-center gap-1 text-gray-400 underline transition-all duration-300 hover:scale-95"
                      >
                        <ArrowLeftIcon className="w-4 h-4" />
                        {proposalStep == 1 ? 'Cancelar preenchimento' : 'Voltar Etapa'}
                      </button>
                    </div>
                    <div className={`flex flex-1 gap-[10px] order-3 lg:order-2 md:order-2`}>
                      {[1, 2, 3, 4, 5].map((step) => (
                        <div
                          key={step}
                          className={`${step <= proposalStep ? 'text-white bg-[#4D41C2]' : 'text-gray-500'} 
                            ${completedSteps?.includes(step) ? 'font-bold' : ''} flex items-center justify-center w-10 h-10 ${proposalStep === step ? 'opacity-80' : ''} rounded-full disabled:opacity-70  hover:scale-95 transition-all duration-300`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end flex-1 order-1 md:order-3 lg:order-3">
                      <button
                        form={`form-0${proposalStep}`}
                        className={`flex gap-5 bg-[#4D41C2] ${proposalStep === 5 ? 'justify-center' : 'justify-between'} hover:scale-95 transition-all duration-300 text-white w-full sm:max-w-[400px] md:w-56 lg:w-56 rounded-full h-12 py-3 px-8 items-center`}
                        disabled={isLoading}
                      >
                        <span className="text-center">
                          {proposalStep === 5 ? 'Finalizar envio de documento' : 'Continuar'}
                        </span>
                        {proposalStep !== 5 && <ArrowRightIcon className="w-4 h-4" />}
                      </button>
                    </div>
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
