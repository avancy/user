import { FormBuilder, InputType, InputWidth, LabelStyle } from '@/components/common/form_builder';
import { useDataTransferContext } from '@/contexts/data_transfer';
import { Notify } from '@/components/common/notification';
import { AUTH_ERROR_MESSAGES } from '@/constrants/auth';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';

const formatPhoneNumberForAWS = (phoneNumber) => {
  let cleanedNumber = phoneNumber.replace(/\D/g, '');
  if (cleanedNumber.length >= 10) {
    cleanedNumber = `55${cleanedNumber}`;
  }
  return cleanedNumber.length >= 12 && cleanedNumber.length <= 15 ? `+${cleanedNumber}` : '';
};

export default function SignupIndexView() {
  const [agreed, setAgreed] = useState(false);
  const { transferData } = useDataTransferContext();

  const router = useRouter();
  const { redirect } = router.query;
  const redirectUrl = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';

  const onSubmit = async ({ email, password, phone_number, first_name, last_name }) => {
    if (!agreed) {
      Notify.error('Você precisa aceitar os Termos e a Política de Privacidade.');
      return;
    }

    try {
      const formatedPhoneNumber = formatPhoneNumberForAWS(phone_number);
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          phone_number: formatedPhoneNumber,
          'custom:first_name': first_name,
          'custom:last_name': last_name,
          'custom:company_id': '57e635df-94d1-4f2f-9237-5eb9ebbbdae6',
        },
        autoSignIn: {
          enabled: true,
        },
      });

      Notify.success('Usuário cadastrado com sucesso. Iniciando processo de validação do e-mail.');

      transferData({
        redirect: `/auth/signup/confirm${redirectUrl}`,
        data: { email, password, phone_number, first_name, last_name },
      });
    } catch (error) {
      console.error(error);
      Notify.error(AUTH_ERROR_MESSAGES[error.name]);
    }
  };

  const form = {
    first_name: {
      type: InputType.TEXT,
      placeholder: 'Primeiro Nome',
      labelStyle: LabelStyle.DEFAULT,
      width: InputWidth.FULL,
      validation: yup.string().required('Campo Obrigatório'),
    },
    last_name: {
      type: InputType.TEXT,
      placeholder: 'Sobrenome',
      labelStyle: LabelStyle.DEFAULT,
      width: InputWidth.FULL,
      validation: yup.string().required('Campo Obrigatório'),
    },
    phone_number: {
      type: InputType.TEXT,
      placeholder: 'Telefone',
      labelStyle: LabelStyle.DEFAULT,
      width: InputWidth.FULL,
      validation: yup
        .string()
        .required('Campo Obrigatório')
        .matches(
          /^(\(?\d{2}\)?\s?)(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
          'Por favor, digite um número de telefone válido.',
        ),
      autoCompleteType: 'tel',
    },
    email: {
      type: InputType.TEXT,
      placeholder: 'E-mail',
      labelStyle: LabelStyle.DEFAULT,
      width: InputWidth.FULL,
      validation: yup
        .string()
        .email('Insira um formato de e-mail válido')
        .required('Campo Obrigatório'),
    },
    password: {
      type: InputType.PASSWORD,
      placeholder: 'Senha',
      labelStyle: LabelStyle.DEFAULT,
      width: InputWidth.FULL,
      validation: yup
        .string()
        .required('Campo Obrigatório')
        .min(8, 'A senha deve ter no mínimo 8 caracteres'),
    },
    terms: {
      type: InputType.CHECKBOX,
      label: (
        <>
          Aceitar{' '}
          <a
            href="https://mavielorh.com.br/politica-privacidade/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300"
          >
            Política de Privacidade
          </a>{' '}
          e{' '}
          <a
            href="https://mavielorh.com.br/politica-privacidade/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300"
          >
            Termos de Uso
          </a>{' '}
          da Mavielo RH
        </>
      ),
      className: 'text-base font-helvetica',
      width: InputWidth.FULL,
      onChange: (value) => setAgreed(!!value),
    },
  };

  const handleSignin = () =>
    router.push(`/auth/signin${redirectUrl}`, undefined, { shallow: true });

  return (
    <>
      <div className="mt-4 text-4xl font-bold text-center font-montserrat md:mt-12">
        Cadastre-se
      </div>
      <div className="font-montserrat flex flex-col justify-center items-center md:w-[480px] md:px-4">
        <div>
          <h3 className="mt-2 text-sm text-gray-700">
            Insira seus dados abaixo para criar uma nova conta
          </h3>
        </div>

        <FormBuilder
          formWidth="w-full"
          className="gap-0 mt-7"
          noMargin={true}
          form={form}
          cancel={false}
          submitStyle={`${agreed && 'hover:scale-110 transition-all duration-500'} w-full bg-[#24EEA0] h-12 rounded-full font-montserrat font-bold text-lg disabled:opacity-40`}
          btnSubmitLabel="Criar Minha Conta"
          onSubmit={onSubmit}
          disabled={!agreed}
        />

        <div className="flex items-center justify-center pt-4 text-base font-helvetica">
          <p>
            Já tem uma conta?{' '}
            <button
              onClick={handleSignin}
              className="text-transparent bg-gradient-to-r from-brand-primary-100 to-brand-secondary-500 bg-clip-text"
            >
              {' '}
              Acessar Minha Conta
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
