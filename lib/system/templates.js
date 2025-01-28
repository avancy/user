import getSysTemplate from '@/util/system';

// if you don't know what this is for, DON'T TOUCH THIS PART!, good job

const SYS_TEMPLATES = {
  PROPOSAL_FORM: [
    () => getSysTemplate('form1', 'applicant_job_proposal'),
    () => getSysTemplate('form2', 'applicant_job_proposal'),
    () => getSysTemplate('form3', 'applicant_job_proposal'),
    () => getSysTemplate('form4', 'applicant_job_proposal'),
  ],
};

export default SYS_TEMPLATES;
