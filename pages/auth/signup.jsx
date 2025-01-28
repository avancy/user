import { fetchApplicant } from '@/lib/services/server_side_props';
import { AuthLayout } from '@/components/auth/layout';
import Signup from '@/components/views/auth/signup';
import Head from 'next/head';

export default function Main() {
  return (
    <>
      <Head>
        <title>Registro - Mavielo RH</title>
      </Head>
      <Signup />
    </>
  );
}

Main.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export async function getServerSideProps({ req, query }) {
  const { redirect } = query;
  const applicant = await fetchApplicant(req);

  if (applicant) {
    return {
      redirect: {
        destination: redirect ? decodeURIComponent(redirect) : '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
