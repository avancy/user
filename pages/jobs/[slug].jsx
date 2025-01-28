import { BriefcaseIcon, CalendarIcon, CheckIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { WhiteSpinner } from '@/components/common/loadding/white_spinner';
import CandidateHome from '@/components/dashboard/candidate_home';
import { BtnShare } from '@/components/common/buttons/share';
import { ModalQuestion } from '@/components/models/question';
import { Notify } from '@/components/common/notification';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import moment from 'moment';
import {
  fetchApplicant,
  fetchCompanyCustomization,
  fetchCompanyIdByHost,
  getHost,
  getJobDetails,
  isAppliedToJob,
} from '@/lib/services/server_side_props';

export default function Job({ job, is_applied, applicant, primary_color, secondary_color }) {
  return (
    <div>
      <CandidateHome
        style={{
          '--color-primary': primary_color,
          '--color-secondary': secondary_color,
        }}
        applicant={applicant}
      >
        <JobDescription job={job} is_applied={is_applied} />
      </CandidateHome>
    </div>
  );
}

function JobDescription({ job, is_applied }) {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { route } = useAuthenticator((context) => [context.route]);
  const [jobsIdsApplied, setJobsIdsApplied] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const [ableToApply, setAbleToApply] = useState(true);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (job && Array.isArray(jobsIdsApplied)) {
      setIsApplied(jobsIdsApplied.includes(job.id));
    }
  }, [job, jobsIdsApplied]);

  const getFillment = async () => {
    try {
      const res = await api.get(`/fillment`);
      return res.data;
    } catch (err) {
      return null;
    }
  };

  const isAbleToApply = async () => {
    try {
      let fillment = await getFillment();

      if (fillment) {
        let { has_resume_pdf, phone } = fillment;

        let isAble = has_resume_pdf && phone;
        return isAble;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const readJobsIdsApplied = async () => {
    setLoading(true);
    try {
      let res = await api.get(`/jobs/ids/applied`);
      setJobsIdsApplied(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      readJobsIdsApplied();

      isAbleToApply()
        .then((able) => setAbleToApply(able))
        .catch((_) => setAbleToApply(false));
    }
  }, [user]);

  const applyToJob = async (formData) => {
    setApplying(true);
    try {
      let isAble = await isAbleToApply();
      if (!isAble) {
        Notify.error('Por favor, complete seu currículo antes de se candidatar a uma vaga.');
        setAbleToApply(false);
        setApplying(false);
        return;
      }
      await api.post(`/jobs/apply/${job.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Notify.success('Aplicação realizada com sucesso!');
      setIsApplied(true);
      readJobsIdsApplied();
    } catch (err) {
      Notify.error('Erro ao aplicar-se a vaga!');
    }
    setApplying(false);
  };

  const handleApplyButtonClick = () => {
    if (job.survey_json && job.survey_json.length > 0) {
      setOpenModal(true);
    } else {
      applyToJob({});
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="px-12 pb-20">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {job.title}
            </h2>
            <div className="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <BriefcaseIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {job?.workplace_policy || ''}
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <MapPinIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {job.city} - {job.state}
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {moment(job.posted_at).format('DD/MM/YYYY')}
              </div>
            </div>
          </div>
          <div className="flex mt-5 lg:ml-4 lg:mt-0">
            {route === 'authenticated' && (
              <span className="sm:ml-3">
                {isApplied && (
                  <button
                    type="button"
                    disabled={true}
                    className="inline-flex items-center px-8 py-2 text-sm font-semibold text-white border shadow-lg cursor-not-allowed bg-primary border-primary/70 rounded-3xl hover:bg-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60 disabled:opacity-40"
                  >
                    <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Você já está aplicado
                  </button>
                )}
                {!isApplied && (
                  <button
                    type="button"
                    onClick={handleApplyButtonClick}
                    disabled={applying || !ableToApply}
                    className="inline-flex items-center px-8 py-2 text-sm font-semibold text-white border shadow-lg border-primary/90 bg-primary disabled:opacity-50 rounded-3xl hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
                  >
                    {applying && (
                      <>
                        <WhiteSpinner />{' '}
                      </>
                    )}
                    Candidatar-me
                  </button>
                )}
              </span>
            )}

            {openModal && (
              <ModalQuestion onSubmit={applyToJob} onClose={handleModalClose} job={job} />
            )}
          </div>
        </div>
        <div className="pt-8">
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
          <div className="flex flex-col py-4 my-8 ">
            <h3 className="mb-2 font-semibold">Compartilhar a vaga:</h3>
            <BtnShare />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, params } = context;

  if (company_id) {
    const { slug } = params;
    const applicant = await fetchApplicant(req);

    if (!applicant) {
      return {
        redirect: {
          destination: `/jobs/${slug}`,
        },
      };
    }

    const job = await getJobDetails(slug);
    if (!job) {
      return {
        notFound: true,
      };
    }

    let is_applied = await isAppliedToJob(job?.id, applicant?.id);

    return {
      props: {
        job,
        logo: f_logo,
        is_applied: !!is_applied,
        applicant,
        primary_color,
        secondary_color,
      },
    };
  }
  return { notFound: true };
}
