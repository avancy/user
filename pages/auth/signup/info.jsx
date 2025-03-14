import { AuthLayout } from '@/components/layouts/auth';
import SignupLayout from '@/components/layouts/signup';
import SignupInfoView from '@/components/views/auth/signup/info';
import { fetchApplicant } from '@/lib/services/server_side_props';

export default function Main({ position_title, about, uploaded_resume, f_photo }) {
  return (
    <SignupInfoView
      position_title={position_title}
      about={about}
      uploaded_resume={uploaded_resume}
      photo_path={f_photo?.url}
    />
  );
}

Main.getLayout = ({ page }) => (
  <AuthLayout>
    <SignupLayout>{page}</SignupLayout>
  </AuthLayout>
);

export async function getServerSideProps({ req, query }) {
  const { redirect } = query;
  const redirectUrl = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';
  const applicant = await fetchApplicant(req);

  if (applicant?.error) {
    if (applicant.error === 'EmailNotVerifiedException') {
      return {
        redirect: {
          destination: `/auth/signup/confirm${redirectUrl}`,
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: `/auth/signin${redirectUrl}`,
        permanent: false,
      },
    };
  }

  const { position_title, about, uploaded_resume, f_photo } = applicant;
  if (position_title === '' || about === '' || !uploaded_resume || !uploaded_resume.url) {
    return {
      props: {
        position_title,
        about,
        uploaded_resume,
        f_photo,
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
