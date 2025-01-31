import { FormBuilder, InputType, InputWidth, LabelStyle } from '../../common/form_builder';
import { useDataTransferContext } from '@/contexts/data_transfer';
import { FormAlertError } from '@/components/form_alert_error';
import { BtnBase } from '@/components/common/buttons/base';
import { LinkedInIcon } from '@/images/icons/LinkedinIcon';
import { Notify } from '@/components/common/notification';
import { LoadSpinner } from '../../common/modal/types';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import axios from 'axios';
import { AUTH_ERROR_MESSAGES } from '@/constrants/auth';

const formLogin = {
  email: {
    type: InputType.TEXT,
    placeholder: 'Digite seu email',
    labelStyle: LabelStyle.MEDIUM,
    width: InputWidth.FULL,
    validation: yup
      .string()
      .email('Insira um formato de e-mail válido')
      .required('Campo Obrigatório'),
  },
  password: {
    type: InputType.PASSWORD,
    placeholder: 'Digite sua senha',
    labelStyle: LabelStyle.MEDIUM,
    width: InputWidth.FULL,
    validation: yup
      .string()
      .required('Campo Obrigatório')
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  },
};

export default function Login() {
  const [changePasswordRequired, setChangePasswordRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { redirect } = router.query;
  const redirectUrl = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';

  const { transferData } = useDataTransferContext();


  const handleSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const user = await Auth.signIn(email, password);
      if (!changePasswordRequired && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setChangePasswordRequired(true);
      }

      if (!user?.signInUserSession?.idToken?.payload?.email_verified) {
        Notify.warning('O Email ainda não foi confirmado. Redirecionando...');
        transferData({
          redirect: `/auth/signup/validate_code${redirectUrl}`,
          data: {
            email,
            password,
          },
        });
        return;
      }

      const [profileAboutResponse, profileResumeResponse] = await Promise.all([
        axios.get('/api/applicant/profile-about'),
        axios.get('/api/applicant/profile-resume'),
      ]);

      const { position_title: positionTitle, about } = profileAboutResponse.data || {};
      const resumeData = profileResumeResponse.data;

      if (!positionTitle || !about || !resumeData || !resumeData.url) {
        Notify.warning('O seu perfil não está completo. Redirecionando...');
        transferData({
          redirect: `/auth/signup/info${redirectUrl}`,
          data: { email, password },
        });
        return;
      }

      router.push(redirect || '/');

      Notify.success('Login efetuado com sucesso.');
    } catch (error) {
      console.error(error);
      const errorName = error.name;
      if (['UserNotConfirmedException', 'UserNotFoundException'].includes(errorName)) {
        Notify.warning('O Email ainda não foi confirmado. Redirecionando...');
        transferData({
          redirect: `/auth/signup/validate_code${redirectUrl}`,
          data: {
            email,
            password,
          },
        });
        return;
      }
      const errorMessage = AUTH_ERROR_MESSAGES[errorName];
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(''), 5000);
    }
    setIsLoading(false);
  };

  const handleForgot = () => router.push(`/auth/forgot${redirectUrl}`);

  return (
    <>
      <div className="font-montserrat mx-auto relative flex flex-col justify-center items-center md:w-[480px] px-4">
        <div className="flex flex-col items-center text-center ">
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-center md:text-5xl">Bem-Vindo(a)!</h2>
            <p className="mt-2 text-sm text-gray-700">Faça login para acessar nossa plataforma</p>
          </div>
        </div>

        {isLoading && <LoadSpinner />}
        <FormBuilder
          formWidth="w-full"
          className="gap-0 mt-7"
          noMargin={true}
          form={formLogin}
          cancel={false}
          submitStyle={`${'hover:scale-110 transition-all duration-500'} w-full bg-[#24EEA0] h-12 rounded-full font-montserrat font-bold text-lg disabled:opacity-40`}
          btnSubmitLabel="Entrar"
          onSubmit={handleSubmit}
        />
        <p className="mt-2 text-sm text-gray-700">
          Esqueci a senha,{' '}
          <span
            className="font-medium cursor-pointer text-primary hover:underline"
            onClick={handleForgot}
          >
            quero recuperar
          </span>
        </p>
        <div className="flex flex-col justify-center w-full mt-2 gap-y-4">
          <BtnBase
            type="button"
            variant="outline"
            disabled
            color="slate"
            className="w-full gap-2 py-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <LinkedInIcon className="w-4" />
                <span className="font-bold">Entrar com o LinkedIn</span>
              </div>
              <span className="mt-1 text-xs text-red-600">Em breve*</span>
            </div>
          </BtnBase>
        </div>
        <div className="flex items-center justify-center pt-4 text-base font-helvetica">
          <p>
            Já tem uma conta?{' '}
            <Link
              href={'/auth/signup'}
              className="text-transparent bg-gradient-to-r from-brand-primary-100 to-brand-secondary-500 bg-clip-text"
            >
              {' '}
              Cadastre-se
            </Link>
          </p>
        </div>
        <div className="mt-8">
          {errorMessage !== '' && <FormAlertError message={errorMessage} />}
        </div>
      </div>
    </>
  );
}
