import { AuthLayout } from '@/components/layouts/auth';
import SignupLayout from '@/components/layouts/signup';
import SignupIndexView from '@/components/views/auth/signup/index';
import { fetchApplicant } from '@/lib/services/server_side_props';

export default function Main() {
  return <SignupIndexView />;
}

Main.getLayout = (page) => (
  <AuthLayout>
    <SignupLayout>{page}</SignupLayout>
  </AuthLayout>
);

export async function getServerSideProps({ req, query }) {
  const { redirect } = query;
  const redirectUrl = redirect ? encodeURIComponent(`?redirect=${redirect}`) : '';
  const applicant = await fetchApplicant(req);

  if (applicant?.error) {
    if (applicant.error === 'EmailNotVerifiedException') {
      return {
        redirect: {
          destination: `/auth/signup/validate_code${redirectUrl}`,
          permanent: false,
        },
      };
    }

    return { props: {} };
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

  return {
    redirect: {
      destination: redirect ? decodeURIComponent(redirect) : '/',
      permanent: false,
    },
  };
}
