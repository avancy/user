import CandidateHomeLayout from '@/components/dashboard/candidate_home_layout';
import TalentBankManager from '@/lib/interactions/backend/talentbanks';
import { fetchApplicant } from '@/lib/services/server_side_props';
import TalentBanksView from '@/components/views/talentbanks';

export default function Main(props) {
  return <TalentBanksView {...props} />;
}

Main.getLayout = ({ page, page_props }) => (
  <CandidateHomeLayout {...page_props}>{page}</CandidateHomeLayout>
);

export async function getServerSideProps({ req }) {
  const applicant = await fetchApplicant(req);
  const redirectUrl = `?redirect=${encodeURIComponent(req.url)}`;

  if (applicant == null) {
    return {
      redirect: {
        destination: `/auth/signin${redirectUrl}`,
        permanent: false,
      },
    };
  }
  if (applicant?.error) {
    if (applicant.error === 'UserNotFoundException')
      return {
        redirect: {
          destination: `/auth/signin${redirectUrl}`,
          permanent: false,
        },
      };
    return {
      redirect: {
        destination: `/auth/signup/confirm${redirectUrl}`,
        permanent: false,
      },
    };
  }

  const { position_title, about, uploaded_resume } = applicant;
  if (position_title === '' || about === '' || !uploaded_resume || !uploaded_resume.url) {
    return {
      redirect: {
        destination: `/auth/signup/info${redirectUrl}`,
        permanent: false,
      },
    };
  }

  let talent_banks = [];

  await TalentBankManager.getAll({
    applicant_id: applicant.id,
    onSuccess: (list) => (talent_banks = list),
  });

  return { props: { applicant, talent_banks: talent_banks } };
}
