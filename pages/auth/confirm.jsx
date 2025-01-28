import EmailConfirmationBanner from '@/public/svgs/banners/email_confirmation.svg';
import { FormAlertError } from '@/components/form_alert_error';
import { BtnBase } from '@/components/common/buttons/base';
import { Notify } from '@/components/common/notification';
import AuthHeader from '@/components/auth/header';
import { NumberField } from '@/components/fields';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function Confirm({ email, company_page_url, type }) {
  const router = useRouter();
  const [code, setCode] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setSendingCode] = useState(false);

  const redirectTo = type === 'partner' ? '/' : `${company_page_url}/`;

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      let res = await Auth.confirmSignUp(email, code);
      Notify.success('E-mail validado com sucesso.');
      router.push('/', {}, { shallow: true });
    } catch (error) {
      if (error && 'name' in error && error.name === 'CodeMismatchException') {
        Notify.error('Código inválido.');
      }
      console.error(error);
    }
    setIsLoading(false);
  };

  const sendCode = async (e) => {
    setSendingCode(true);
    e.preventDefault();
    try {
      await Auth.resendSignUp(email);
      Notify.success('Novo código enviado para seu e-email.');
    } catch (error) {
      console.error(error);
      setErrorMessage('Ocorreu um erro ao enviar o código.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
    setSendingCode(false);
  };

  return (
    <>
      <Layout redirectTo={redirectTo}>
        <form className="flex flex-col px-10 mt-6" onSubmit={onSubmit}>
          <NumberField
            label="Código de Validação"
            id="code"
            name="code"
            autoComplete="code"
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <div className="mt-4 space-y-2">
            <button
              type="submit"
              className="w-full hover:scale-110 transition-all duration-500 mt-4 bg-[#24EEA0] h-12 rounded-full font-bold text-lg disabled:opacity-40"
            >
              {!isLoading && (
                <span>
                  Validar e-mail com o código <span aria-hidden="true">&rarr;</span>
                </span>
              )}
              {isLoading && <span className="animate-pulse">Validando e-mail...</span>}
            </button>

            <BtnBase
              type="button"
              variant="outline"
              color="slate"
              className="w-full font-bold transition-all duration-500 hover:scale-110"
              onClick={sendCode}
            >
              {!isSendingCode && <span>Enviar novo código de verificação</span>}
              {isSendingCode && <span className="animate-pulse">Enviando novo código...</span>}
            </BtnBase>
          </div>
        </form>
        <div className="mt-8">
          {errorMessage !== '' && <FormAlertError message={errorMessage} />}
        </div>
      </Layout>
    </>
  );
}

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Validação de E-mail - Mavielo RH</title>
      </Head>

      <AuthHeader />

      <div className="flex flex-col w-1/2 mx-auto">
        <div className="flex flex-col items-center px-10 mt-8">
          <Image src={EmailConfirmationBanner} className="hidden w-80 lg:block" />

          <h2 className="text-lg font-semibold text-gray-900">
            Digite abaixo o código que você recebeu em seu e-mail.
          </h2>
        </div>

        {children}
      </div>
    </>
  );
}
