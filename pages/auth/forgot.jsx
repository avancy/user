import { fetchApplicant } from '@/lib/services/server_side_props';
import { AuthLayout } from '@/components/layouts/auth';
import Forgot from '@/components/views/auth/forgot';
import Head from 'next/head';

export default function Main() {
  return (
    <>
      <Head>
        <title>Validação de E-mail - Mavielo RH</title>
      </Head>
      <Forgot />
    </>
  );
}

Main.getLayout = ({ page }) => <AuthLayout>{page}</AuthLayout>;

export async function getServerSideProps({ req, query }) {
  const { redirect } = query;
  const redirectUrl = redirect ? encodeURIComponent(`?redirect=${redirect}`) : '';
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
