import { fetchApplicant } from '@/lib/services/server_side_props';
import { AuthLayout } from '@/components/auth/layout';
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
