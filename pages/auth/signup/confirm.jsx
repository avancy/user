import SignupValidateCodeView from '@/components/views/auth/signup/confirm';
import { fetchApplicant } from '@/lib/services/server_side_props';
import { AuthLayout } from '@/components/layouts/auth';
import SignupLayout from '@/components/layouts/signup';

export default function Main() {
  return <SignupValidateCodeView />;
}

Main.getLayout = (page) => (
  <AuthLayout>
    <SignupLayout>{page}</SignupLayout>
  </AuthLayout>
);

export async function getServerSideProps({ req, query }) {
  const { redirect } = query;
  const redirectUrl = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';
  const applicant = await fetchApplicant(req);

  if (applicant?.error) {
    if (applicant.error === 'EmailNotVerifiedException') return { props: {} };
    return {
      redirect: {
        destination: `/auth/signin${redirectUrl}`,
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

  return {
    redirect: {
      destination: redirect ? decodeURIComponent(redirect) : '/',
      permanent: false,
    },
  };
}
