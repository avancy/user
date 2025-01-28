import { ConfirmProposal } from '../proposal/confirm_proposal';
import { ProposalProvider } from '../../contexts/proposal';
import ProposalForm from '../proposal/proposal_form';
import JobCards from '../proposal/job_cards';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  checkInviteExpiration,
  checkInviteStatusAndFetchJobInfo,
  sortJobs,
} from '../../lib/functions/proposal';
import JobManager from '@/classes/job';
import Modal from '../common/modal';

export default function ApplicationsView({ applicant }) {
  const [applications, setApplications] = useState([]);
  const router = useRouter();
  const [jobInfo, setJobInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [jobInvites, setJobInvites] = useState([]);
  const [isLinkExpired, setIsLinkExpired] = useState(false);

  const publishedJobs =
    applications?.filter((application) => application.job.published && !application.job.archived) ||
    [];
  const archivedJobs = applications?.filter((application) => application.job.archived);

  useEffect(() => {
    checkInviteExpiration(router.query, setIsLinkExpired);
  }, [router.query]);

  useEffect(() => {
    checkInviteStatusAndFetchJobInfo(
      router.query,
      isLinkExpired,
      setJobInvites,
      setJobInfo,
      setShowModal,
    );
  }, [isLinkExpired, router.query]);

  useEffect(() => {
    jobInfo && showModal && Modal.show(<ProposalModal jobInfo={jobInfo} />);
  }, [jobInfo, showModal]);

  useEffect(() => {
    JobManager.application.get({ onSucess: setApplications });
  }, []);

  return (
    <ProposalProvider>
      <div className="px-6 xl:mx-32 xl:px-0 font-montserrat">
        <div className="flex flex-col items-center w-full gap-9">
          <h1 className='w-full text-4xl font-bold text-transparent bg-gradient-to-r from-brand-gradient-primary to-brand-gradient-secondary bg-clip-text'>SEJA BEM-VINDO(A)!</h1>

          <div className="w-full h-auto">
            <h2 className="text-lg font-medium tracking-wide uppercase">Candidaturas Ativas:</h2>
            <JobCards jobs={sortJobs(publishedJobs)} />
          </div>
          <div className="w-full h-auto">
            <h2 className="text-lg font-medium tracking-wide uppercase">Vagas Encerradas:</h2>
            <JobCards jobs={sortJobs(archivedJobs, 'archived')} />
          </div>
        </div>

        <ConfirmProposal applicant={applicant} />
        <ProposalForm />
      </div>
    </ProposalProvider>
  );
}
