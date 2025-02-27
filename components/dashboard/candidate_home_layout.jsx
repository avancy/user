import { ProfessionalProfile } from '../main-page/professional/profile';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { CandidateHeader } from './candidate_header';
import { Footer } from '../main-page/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { api } from '@/lib/api';
import Head from 'next/head';

export default function CandidateHomeLayout({ children, photoPath, applicant, ...rest }) {
  const [showFillResumeWarn, setShowFillResumeWarn] = useState(false);
  const [userUpdatedProfile, setUserUpdatedProfile] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!applicant) {
      return
    }

    const getFillment = async () => {
      try {
        const res = await api.get(`/fillment`);
        return res.data;
      } catch (err) {
        console.error('error getting fillment', err);
        return null;
      }
    };

    getFillment().then((fillment) => {
      if (fillment) {
        let { has_resume_pdf, phone } = fillment;

        let showFillWarn = !(has_resume_pdf && phone);
        setShowFillResumeWarn(showFillWarn);
      }
    });
  }, [userUpdatedProfile, applicant]);

  const signOut = async () => {
    try {
      await Auth.signOut();
      sessionStorage.clear();
      router.reload();
    } catch (error) {
      console.error('error signing out: ', error);
    }
  };

  return (
    <div {...rest}>
      <Head>
        <title>Área do Candidato</title>
        <meta name="description" content="Vagas e acompanhamento das candidaturas." />
      </Head>
      <div className="flex flex-col min-h-screen">
        <CandidateHeader
          user={applicant}
          signOut={signOut}
          openProfessionalProfile={setOpenProfile}
          photoPath={photoPath}
        />
        <ProfessionalProfile
          open={openProfile}
          setOpen={setOpenProfile}
          getUserUpdate={setUserUpdatedProfile}
        />
        <main className="relative flex flex-col flex-grow bg-center bg-no-repeat bg-cover">
          <img
            className="absolute hidden h-full transform -translate-x-1/2 -translate-y-1/2 sm:block -z-10 top-1/2 left-1/2"
            src="/images/logo_green.svg"
          />
          {showFillResumeWarn && (
            <div className="px-6 pt-5">
              <FillResumeTip openProfessionalProfile={setOpenProfile} />
            </div>
          )}
          <div className="flex flex-col flex-grow w-full h-full py-5">{children}</div>
        </main>
        <Footer isCandidatePage={true} />
      </div>
    </div>
  );
}

function FillResumeTip({ openProfessionalProfile }) {
  const router = useRouter();

  return (
    <div className="p-4 border-l-4 border-yellow-400 rounded-lg shadow-md bg-yellow-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <div className="text-sm text-yellow-700">
            Para poder candidatar-se, é necessário preencher o currículo e o número de telefone.{' '}
            <br />
            <div className="flex flex-col items-start justify-start">
              <button
                onClick={() => openProfessionalProfile(true)}
                className="font-medium text-yellow-700 underline hover:text-yellow-600 focus:outline-none focus:ring focus:border-indigo-300"
              >
                Clique aqui para preencher seu currículo.
              </button>
              <button
                onClick={() => router.push('/meus-dados')}
                className="font-medium text-yellow-700 underline hover:text-yellow-600 focus:outline-none focus:ring focus:border-indigo-300"
              >
                Clique aqui para cadastrar seu número de telefone.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
