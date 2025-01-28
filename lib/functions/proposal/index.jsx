import { Notify } from '@/components/common/notification';
import ModalProposal from '@/components/models/proposal';
import { decodeJwt } from '@/util/jwt_decoder';
import Modal from '@/components/common/modal';
import JobManager from '@/classes/job';
import { api } from '@/lib/api';

const { Auth } = require('aws-amplify');

const getUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (user && user.challengeName === undefined) {
      const userInfo = await Auth.currentUserInfo();
      return userInfo;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const checkInviteExpiration = async (query, setIsLinkExpired) => {
  const searchParams = new URLSearchParams(query);
  const token = searchParams.get('token');

  if (token) {
    const job_id = decodeJwt(token)?.job_id;

    JobManager.invite.getStatus({
      job_id,
      onSucess: (status) => {
        setIsLinkExpired(status === 'expired');
        if (status === 'expired') {
          Notify.error('O convite está expirado');
        }
      },
    });
  }
};

const checkInviteStatusAndFetchJobInfo = async (
  query,
  isLinkExpired,
  setJobInvites,
  setJobInfo,
  setShowModal,
) => {
  const searchParams = new URLSearchParams(query);
  const token = searchParams.get('token');

  if (!isLinkExpired && token) {
    const job_id = decodeJwt(token)?.job_id;
    const candidate_id = decodeJwt(token)?.applicant_id;
    const job_slug = searchParams.get('job_slug');

    try {
      const response = await api.get(`/jobs/invites/${candidate_id}`);
      setJobInvites(response.data);

      const invite = response.data?.find((invite) => invite.job_id === job_id);
      if (invite?.status === 'pending') {
        await JobManager.get({ job_slug, onSucess: setJobInfo });
        setShowModal(true);
      }
    } catch (e) {
      console.error(e);
      Notify.error('Erro ao buscar informações do convite ou vaga.');
    }
  }
};

const showModalIfJobInfoExists = (jobInfo, showModal) => {
  if (jobInfo && showModal) {
    Modal.show(<ModalProposal jobInfo={jobInfo} />);
  }
};

const sortJobs = (jobs = [], visibility = 'published') => {
  if (jobs?.length === 0) return [];

  if (visibility !== 'published') {
    return jobs.sort((a, b) => {
      if (a.job.title < b.job.title) return -1;
      if (a.job.title > b.job.title) return 1;
      return 0;
    });
  }

  const proposalJobs = jobs.filter((application) => application?.job_proposal);
  const otherJobs = jobs.filter((application) => !application?.job_proposal);

  const sortedOtherJobs = otherJobs.sort((a, b) => {
    if (a.job.title < b.job.title) return -1;
    if (a.job.title > b.job.title) return 1;
    return 0;
  });

  return [...proposalJobs, ...sortedOtherJobs];
};

const getUploadUrlProposal = async (proposal_id, file_name, form_name) => {
  return await api
    .get(
      `/jobs/proposal/form/${proposal_id}/upload-url?form_name=${form_name}&file_name=${file_name}`,
    )
    .then(({ data }) => data);
};

const setStatusProposal = async (proposal_id, status) => {
  return await api.patch(`/jobs/proposal/${proposal_id}/status/${status}`);
};

export {
  getUser,
  checkInviteExpiration,
  checkInviteStatusAndFetchJobInfo,
  showModalIfJobInfoExists,
  getUploadUrlProposal,
  setStatusProposal,
  sortJobs,
};
