import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { useProposalContext } from '../../contexts/proposal';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import IconCheck from '../common/icons/check';
import IconCancel from '../common/icons/cancel';
import IconContact from '../common/icons/contact';
import { api } from '@/lib/api';
import { Notify } from '@/components/common/notification';

export function ConfirmProposal({ applicant }) {
  const { isProposalMenuOpen, toggleProposalMenu, proposalStep, nextProposalStep, proposal } =
    useProposalContext();
  const { name, photo_path = f_photo?.url } = { ...applicant };
  const [loading, setLoading] = useState(false);

  return (
    <Transition.Root show={isProposalMenuOpen && proposalStep === 0} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleProposalMenu}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden bg-black/60">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pointer-events-none lg:pl-10 md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative z-20 flex flex-col w-screen h-screen max-w-6xl gap-10 p-10 bg-white pointer-events-auto">
                  {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white pointer-events-none opacity-60">
                      <Spinner className="w-10 h-10 animate-spin" />
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row lg:flex-row items-center gap-[19px]">
                    {photo_path ? (
                      <img
                        src={applicant?.f_photo?.url}
                        alt="Avatar"
                        className="w-[94px] h-[94px] text-sm rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="w-[94px] h-[94px] text-sm text-gray-500 " />
                    )}

                    <div>
                      <h2 className="text-3xl font-bold text-center font-grotesque md:text-left lg:text-left">
                        {name}
                      </h2>
                      <h3 className="text-center text-gray-400 md:text-left lg:text-left">
                        Candidatou-se à vaga de{' '}
                        <span className="font-bold text-black">{proposal?.job_title}</span> no dia{' '}
                        {new Date(proposal.application_date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-1 pr-5 -mr-5 overflow-y-auto">
                    <div className="flex flex-col">
                      {proposal?.message_sent ? (
                        <div dangerouslySetInnerHTML={{ __html: proposal.message_sent }} />
                      ) : (
                        <p className="max-w-[897px] text-justify">
                          É com grande satisfação que oferecemos a você a posição de{' '}
                          <span className="font-bold">{proposal?.job_title}</span> em nossa equipe
                          na <span className="font-bold">{proposal?.company_name}</span>. Após nossa
                          entrevista e análise de suas qualificações, acreditamos que você possui o
                          perfil ideal para desempenhar esta função com sucesso.
                        </p>
                      )}
                    </div>

                    <JobInfoList className="mt-[25px]" proposal={proposal} />

                    {proposal?.benefits?.length > 0 && (
                      <div className="p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <h2 className="pb-5 text-3xl font-extrabold font-grotesque">
                          Benefícios do cargo
                        </h2>
                        <ul className="flex flex-col gap-4 mt-4">
                          {proposal.benefits.map((benefit) => (
                            <li
                              key={benefit.id}
                              className="p-4 transition-shadow border border-gray-100 rounded-lg shadow-sm hover:shadow-md"
                            >
                              <h4 className="font-semibold text-brand-primary-300 text-md">
                                {benefit.name}
                              </h4>
                              <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="text-xl font-light font-grotesque mt-9">
                      Você recebeu uma oferta de trabalho da{' '}
                      <span className="font-bold">{proposal?.company_name}</span>. Por favor,
                      escolha uma das opções abaixo:
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 md:flex-row lg:flex-row mt-7">
                      <ProposalCards
                        title={'Aceitar Proposta'}
                        buttonText={'Aceitar'}
                        nextProposalStep={nextProposalStep}
                        proposal_id={proposal?.id}
                        setLoading={setLoading}
                      >
                        Ao aceitar, será liberado o acesso para que você envie sua documentação
                        necessária para a contratação.
                      </ProposalCards>

                      <ProposalCards
                        title={'Recusar Proposta'}
                        buttonText={'Recusar Proposta'}
                        proposal_id={proposal?.id}
                        setLoading={setLoading}
                      >
                        Ao recusar, o processo seletivo continuará com os demais candidatos, e você
                        não poderá mais participar deste processo específico.
                      </ProposalCards>

                      <ProposalCards
                        title={'Falar com o Recrutador'}
                        buttonText={'Entrar em contato'}
                        proposal_id={proposal?.id}
                        setLoading={setLoading}
                        tefone_number={proposal?.telephone}
                      >
                        Caso tenha dúvidas ou queira fazer uma contraproposta, você pode falar com o
                        recrutador antes de tomar sua decisão. O recrutador poderá editar a proposta
                        conforme necessário.
                      </ProposalCards>
                    </div>
                  </div>

                  <button
                    className="text-2xl font-bold text-white bg-red-600 w-[52px] top-16 rounded-[10px] h-[52px] left-12 lg:-left-8 md:-left-8 absolute hover:scale-105 transition-all"
                    onClick={toggleProposalMenu}
                  >
                    X
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function JobInfoList({ proposal, className }) {
  const isExpired = new Date(proposal?.start_date) < new Date();

  return (
    <div
      className={`${className} max-w-full border shadow-lg rounded-lg pl-[28px] pt-[9px] pr-[91px] pb-[15px]`}
    >
      <h2 className="pb-5 text-3xl font-extrabold font-grotesque">{proposal?.job_title}</h2>

      <div>
        <ul className="flex flex-wrap items-center justify-start gap-5">
          <li className="flex items-center gap-1">
            <div className="flex w-4 h-4 bg-[#CBC6FF] justify-center items-center rounded-[4px]">
              <CalendarIcon className="w-2 h-[10px]" />
            </div>
            <div>
              <p className="text-xs">
                <span className="text-base font-bold text-black font-grotesque">
                  Data de início:{' '}
                </span>
                {new Date(proposal?.start_date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </p>
            </div>
          </li>

          <li className="flex items-center gap-1">
            <div className="flex w-4 h-4 bg-[#CBC6FF] justify-center items-center rounded-[4px]">
              <ClockIcon className="w-2 h-[10px]" />
            </div>
            <div>
              <p className="text-xs">
                <span className="text-base font-bold text-black font-grotesque">
                  Carga horária:{' '}
                </span>
                {proposal?.workload}
              </p>
            </div>
          </li>

          <li className="flex items-center gap-1">
            <div className="flex w-4 h-4 bg-[#CBC6FF] justify-center items-center rounded-[4px]">
              <MapPinIcon className="w-2 h-[10px]" />
            </div>
            <div>
              <p className="text-xs">
                <span className="text-base font-bold text-black font-grotesque">
                  Local de Trabalho:{' '}
                </span>
                {proposal?.workplace}
              </p>
            </div>
          </li>

          <li className="flex items-center gap-1">
            <div className="flex w-4 h-4 bg-[#CBC6FF] justify-center items-center rounded-[4px]">
              <CurrencyDollarIcon className="w-2 h-[10px]" />
            </div>
            <div>
              <p className="text-xs">
                <span className="text-base font-bold text-black font-grotesque">Salário: </span>
                R${' '}
                {proposal?.wage?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </li>

          <li className="flex items-center gap-1">
            <div className="flex w-4 h-4 bg-[#CBC6FF] justify-center items-center rounded-[4px]">
              <ExclamationCircleIcon className="w-2 h-[10px]" />
            </div>
            <div>
              <p className="text-xs">
                <span className="text-base font-bold text-black font-grotesque">
                  {isExpired ? 'Data que expirou' : 'Validade da Proposta'}:{' '}
                </span>
                {isExpired
                  ? new Date(proposal?.expiration_date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : `${Math.ceil(
                      (new Date(proposal?.expiration_date) - new Date()) / (1000 * 60 * 60 * 24),
                    )} dias`}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ProposalCards({
  title,
  buttonText,
  children,
  nextProposalStep,
  proposal_id,
  setLoading,
  tefone_number = '',
}) {
  const getInTouch = () => {
    window.open(
      `https://wa.me/${tefone_number}?text=Ol%C3%A1%2C%20estou%20interessado%20na%20vaga%20de%20${title}`,
      '_blank',
    );
  };

  return (
    <div
      className={`lg:w-[237px] md:w-[237px] w-[80%] min-w-[260px] lg:h-[263px] md:h-[263px] rounded-xl ${title === 'Aceitar Proposta' && 'bg-green-600 text-white'} 
      ${title === 'Recusar Proposta' && 'bg-red-600 text-white'} 
      ${title === 'Falar com o Recrutador' && 'border rounded-lg'} 
      px-[18px] flex flex-col justify-between pb-4`}
    >
      <div className="flex flex-col items-center justify-center pt-7">
        <div className="flex items-center justify-center h-10">
          {title === 'Aceitar Proposta' && <IconCheck />}
          {title === 'Recusar Proposta' && <IconCancel />}
          {title === 'Falar com o Recrutador' && <IconContact />}
        </div>

        <h3 className="mt-2 mb-1 text-3xl font-extrabold text-center lg:mb-0 md:mb-0 md:text-xl lg:text-xl font-grotesque">
          {title}
        </h3>
      </div>

      <div>
        <p
          className={`${title === 'Falar com o Recrutador' ? 'text-black' : 'text-white'} text-center text-xs`}
        >
          {children}
        </p>
      </div>

      <button
        className={`${title === 'Aceitar Proposta' ? 'bg-[#4D41C2] mt-3 text-white rounded-full py-2 w-full max-w-[201px]' : 'underline'} 
              ${title === 'Recusar Proposta' && 'text-white'} 
               flex justify-center items-center mx-auto hover:scale-95 transition-all duration-300`}
        onClick={() =>
          title === 'Falar com o Recrutador'
            ? getInTouch()
            : handleProposalStatus(title, nextProposalStep, proposal_id, setLoading)
        }
      >
        {buttonText}
      </button>
    </div>
  );
}
function handleProposalStatus(title, nextProposalStep, proposal_id, setLoading) {
  setLoading(true);
  try {
    if (title === 'Aceitar Proposta') {
      api
        .patch(`/jobs/proposal/${proposal_id}/status/accepted`)
        .then(() => {
          nextProposalStep();
        })
        .catch((error) => {
          console.error(error);
          Notify.error('Erro ao aceitar proposta.');
        });
    } else if (title === 'Recusar Proposta') {
      api.patch(`/jobs/proposal/${proposal_id}/status/rejected`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}
