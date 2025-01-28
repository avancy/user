import { fetchApplicant } from '@/lib/services/server_side_props';
import { AuthLayout } from '@/components/auth/layout';
import Login from '@/components/views/auth/signin';
import Head from 'next/head';

export default function Main() {
  return (
    <>
      <Head>
        <title>Login - Mavielo RH</title>
      </Head>
      <Login />
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
