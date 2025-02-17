import { classNames } from '@/util/css';
import { useProposalContext } from '../../contexts/proposal';
import { useRouter } from 'next/router';

export default function JobCard({ job, job_proposal, stage, required_disc = false, isDisqualified }) {
  const { toggleProposalMenu, updateProposal } = useProposalContext();
  const router = useRouter();

  const handleProposal = () => {
    toggleProposalMenu();
    updateProposal({
      ...job_proposal,
      job_title: job.title,
      application_date: job.created_at,
      company_name: job.company_name,
    });
  };

  const handleDetail = () => {
    router.push(job.url);
  };

  return (
    <div
      key={job?.id}
      className={classNames(
        'ring-1 ring-gray-200 flex-1 p-6 xl:pt-[22px] rounded-[14px] bg-white shadow-sm shadow-gray-600/30',
        'h-[320px] md:h-[284px] flex flex-col justify-between',
        job?.archived || isDisqualified ? 'opacity-40 pointer-events-none' : '',
      )}
    >
      <div>
        <div className="flex flex-col items-center justify-between gap-y-[10px]">
          <div className="flex w-full gap-2">
            <span className="bg-[#E0E7FF] rounded-full flex justify-center items-center px-3 text-[#312EA2]">
              {job?.hiring_policy}
            </span>
            <span className="bg-[#FFF1E0]rounded-full flex justify-center items-center px-3 text-[#836901]">
              {job?.workplace_policy}
            </span>
          </div>
          <h3
            id={job?.id}
            className={'font-semibold w-full md:h-[40px] flex items-center truncate text-xl'}
          >
            <abbr title={job?.title} className="no-underline">
              {job?.title}
            </abbr>
          </h3>

          <div className="w-full flex flex-col">
            <span className="w-full font-semibold">
              {job?.company_name}
            </span>

            <span className="w-full">
              {job?.city?.name} - {job?.city?.state?.name}
            </span>
          </div>
        </div>
      </div>
      {required_disc ? (
        <div
          className={classNames(
            'w-full p-2 my-3 text-center text-white transition-all duration-300 rounded-full bg-primary',
          )}
        >
          Execução do teste DISC requerida
        </div>
      ) : (
        <button
          onClick={
            job_proposal
              ? job_proposal?.status === 'documents_submitted'
                ? undefined
                : job_proposal?.expiration_date && false // new Date(job_proposal?.expiration_date) < new Date()
                  ? () => Notify.info('Proposta expirada. Entre em contato com o recrutador.')
                  : handleProposal
              : handleDetail
          }
          disabled={job?.archived || isDisqualified}
          className={classNames(
            'w-full p-2 my-3 font-bold transition-all duration-300 rounded-full',
            job_proposal?.expiration_date && false // new Date(job_proposal?.expiration_date) < new Date()
              ? 'bg-red-600'
              : 'bg-brand-secondary-500 hover:scale-95 disabled:bg-transparent disabled:border-gray-400 disabled:border-2',
          )}
        >
          {job_proposal ? (
            job_proposal?.expiration_date &&
            false /* new Date(job_proposal?.expiration_date) < new Date() */ ? (
              <>Proposta expirada</>
            ) : job_proposal?.status === 'documents_submitted' ? (
              <>Em Análise</>
            ) : (
              <>Proposta de Trabalho</>
            )
          ) : (
            <>Acessar</>
          )}
        </button>
      )}
      
      <div className='flex w-full justify-end py-2'>
        <p>Etapa: <span className='font-bold'>{stage}</span></p>
      </div>
    </div>
  );
}
