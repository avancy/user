import { Amplify } from 'aws-amplify';
import '../styles/globals.css';
import config from '../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import { Notify } from '@/components/common/notification';
import Modal from '@/components/common/modal';
import { Alert } from '@/components/common/alert';

if (process.env.NODE_ENV === 'development') {
  Amplify.configure({
    ...config,
    ssr: true,
    Auth: {
      region: config.aws_cognito_region,
      userPoolId: config.aws_user_pools_id,
      userPoolWebClientId: config.aws_user_pools_web_client_id,
      mandatorySignIn: false,
      cookieStorage: {
        domain: 'localhost',
        secure: false,
        path: '/',
        expires: 2,
        sameSite: 'lax',
      },
    },
  });
} else {
  Amplify.configure({
    ...config,
    ssr: true,
    Auth: {
      region: config.aws_cognito_region,
      userPoolId: config.aws_user_pools_id,
      userPoolWebClientId: config.aws_user_pools_web_client_id,
      mandatorySignIn: false,
      cookieStorage: {
        domain: '.mavielorh.com.br',
        secure: true,
        path: '/',
        expires: 2,
        sameSite: 'strict',
      },
    },
  });
}

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Authenticator.Provider>
        <Notify />
        <Modal />
        <Alert />
        {getLayout(<Component {...pageProps} />)}
      </Authenticator.Provider>
    </>
  );
}

export default MyApp;
