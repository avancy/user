import { FormBuilder, InputType, InputWidth, LabelStyle } from '@/components/common/form_builder';
import EmailConfirmationBanner from '@/public/svgs/banners/email_confirmation.svg';
import { Notify } from '@/components/common/notification';
import { AUTH_ERROR_MESSAGES } from '@/constrants/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import Image from 'next/image';
import Link from 'next/link';
import * as yup from 'yup';
import axios from 'axios';

export default function Signup() {
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className={`w-full ${step === 1 && 'lg:w-2/3'} flex items-center justify-center`}>
        <div className={`flex flex-col h-full py-3 gap-4 md:gap-6`}>
          {step === 1 ? (
            <div className="mt-4 text-4xl font-bold text-center font-montserrat">Cadastre-se</div>
          ) : (
            <div className="flex items-center justify-center text-3xl font-montserrat">
              {[1, 2, 3].map((num, index) => (
                <Fragment key={num}>
                  <button
                    onClick={() => num === 1 && setStep(1)}
                    disabled={num !== 1}
                    className={`rounded-full w-11 h-11 ${
                      step >= num ? 'bg-[#24EEA0] font-bold text-black' : 'text-gray-500'
                    } flex border-2 border-gray-500 justify-center items-center`}
                  >
                    {num}
                  </button>
                  {index < 2 && <div className="w-[60px] h-[2px] bg-gray-500"></div>}
                </Fragment>
              ))}
            </div>
          )}

          <div>
            {step === 1 && <StepOne setStep={setStep} setNewUser={setNewUser} />}
            {step === 2 && <StepTwo setStep={setStep} newUser={newUser} />}
            {step === 3 && <StepThree setStep={setStep} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const formatPhoneNumberForAWS = (phoneNumber) => {
  let cleaned = phoneNumber.replace(/\D/g, '');
  return `+${cleaned.length > 11 ? cleaned : '55' + cleaned}`;
};

function StepOne({ setStep, setNewUser }) {
  const [agreed, setAgreed] = useState(false);

  const onSubmit = async (data) => {
    if (!agreed) {
      Notify.error('Você precisa aceitar os Termos e a Política de Privacidade.');
      return;
    }

    try {
      await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email,
          phone_number: formatPhoneNumberForAWS(data.phone_number),
          'custom:first_name': data.first_name,
          'custom:last_name': data.last_name,
          'custom:company_id': '57e635df-94d1-4f2f-9237-5eb9ebbbdae6',
        },
        autoSignIn: {
          enabled: true,
        },
      });

      Notify.success(
        'Usuário cadastrado com sucesso. Verifique seu e-mail para confirmar o cadastro.',
      );

      setNewUser({ username: data.email, password: data.password });

      setStep(2); // Avança para o próximo passo
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
      onChange: (value) => {
        setAgreed(!!value);
      },
    },
  };

  return (
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
          <Link
            href={'/auth/signin'}
            className="text-transparent bg-gradient-to-r from-brand-primary-100 to-brand-secondary-500 bg-clip-text"
          >
            {' '}
            Acessar Minha Conta
          </Link>
        </p>
      </div>
    </div>
  );
}

function StepTwo({ setStep, newUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [wrongCode, setWrongCode] = useState(false);

  function handleConfirmationCode(e) {
    setConfirmationCode(e.target.value);
  }

  async function sendConfirmationCode() {
    setIsLoading(true);

    try {
      let res = await Auth.confirmSignUp(newUser.username, confirmationCode);
      Notify.success('E-mail validado com sucesso.');

      setStep(3);
    } catch (error) {
      console.error(error);
      if (error && 'name' in error && error.name === 'CodeMismatchException') {
        setWrongCode(true);
        Notify.error('Código inválido.');
        return;
      }
      Notify.error('erro ao validar Email');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start h-full font-montserrat">
      <Image src={EmailConfirmationBanner} className="hidden w-80 lg:block" />

      <p className="text-center">Enviamos um e-mail com o código de confirmação da sua conta!</p>

      <div className="flex flex-col gap-1 p-4 justify-evenly">
        <label htmlFor="confirmation_code" className="text-base font-bold">
          Digite aqui seu código de confirmação:
        </label>

        <input
          id="confirmation_code"
          className={`rounded-md ${wrongCode && 'border-red-500'}`}
          value={confirmationCode}
          onChange={(e) => handleConfirmationCode(e)}
        />

        <div className="">
          <p className={`text-center ${wrongCode ? 'block text-red-500' : 'hidden'}`}>
            Código incorreto, tente novamente!
          </p>
          <button
            onClick={sendConfirmationCode}
            disabled={confirmationCode.length < 6}
            className={`w-full ${confirmationCode.length >= 6 && 'hover:scale-110 transition-all duration-500'} mt-4 bg-[#24EEA0] h-12 rounded-full font-bold text-lg disabled:opacity-40`}
          >
            {isLoading ? (
              <span className="animate-pulse">Validando e-mail...</span>
            ) : (
              <span>Confirmar E-mail</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const SchemaStepTheree = yup.object({
  current_role: yup.string().required('Esse campo não pode ficar em branco'),
  resume: yup
    .mixed()
    .required('O currículo é obrigatório')
    .test(
      'fileType',
      'Somente arquivos PDF são permitidos',
      (value) => value && value.type === 'application/pdf',
    ),
});

function StepThree() {
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SchemaStepTheree),
  });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setResumeFile(file);
    setValue('resume', file);
    setFileName(file.name);
  };

  const onSubmit = async (data) => {
    const formDataPdf = new FormData();
    formDataPdf.append('resume.pdf', resumeFile);

    await axios.post('/api/applicant/profile-about', {
      position_title: data.current_role,
      about: data.about_you,
    });

    await axios.post('/api/applicant/profile-resume', formDataPdf, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    router.push('/');
  };

  return (
    <div className="max-w-[787px]">
      <div className="flex flex-col items-center justify-center gap-3 font-montserrat">
        <h2 className="text-2xl font-bold text-center md:text-5xl">
          Só mais um passo antes de achar a vaga ideal.
        </h2>
        <h3 className="font-normal text-center md:text-lg md:text-left md:w-full">
          Preencha os dados do seu CV para que você possa candidatar-se às nossas vagas!
        </h3>
      </div>

      <form
        className="flex flex-col gap-2 px-4 mt-3 font-montserrat"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="text-base font-semibold" htmlFor="current_role">
            Posição Atual: <span className="text-red-600">*</span>
          </label>
          <input
            {...register('current_role')}
            onChange={(e) => setValue('current_role', e.target.value)}
            placeholder="Ex: Engenheiro Agrícola"
            className="block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
          />
          <p className="text-xs text-red-600">{errors.current_role?.message}</p>
        </div>

        <div>
          <label className="text-base font-semibold" htmlFor="about_you">
            Sobre Você:
          </label>
          <textarea
            {...register('about_you')}
            onChange={(e) => setValue('about_you', e.target.value)}
            placeholder="Digite aqui informações úteis que podem ajudar na sua contratação."
            className="block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm resize-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
            rows={5}
          />
        </div>

        <div>
          <label className="text-base font-semibold">
            Anexar Currículo em PDF <span className="text-red-600">*</span>
          </label>

          <Dropzone accept={'application/pdf'} multiple={false} onDrop={onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`relative flex hover:scale-105 duration-500 transition-all flex-col justify-between items-center w-full max-w-[320px] md:max-w-none lg:max-w-none h-auto p-4 border border-dashed shadow-lg rounded-[20px] mx-auto ${
                  isDragActive && 'bg-[#C2B54126] scale-105 duration-500 transition-all'
                }`}
              >
                <div className="flex flex-col items-center justify-center w-full gap-2">
                  <Image src={FileIcon} alt="Ícone de Upload de Arquivo" />

                  {fileName ? (
                    <p className="max-w-full text-sm text-green-600 truncate">
                      Arquivo anexado: <strong>{fileName}</strong>
                    </p>
                  ) : (
                    <span className="font-helvetica cursor-pointer text-[#195579] underline">
                      Anexar arquivo
                    </span>
                  )}
                </div>

                <input {...getInputProps()} accept="application/pdf" />
              </div>
            )}
          </Dropzone>

          <p className="text-xs text-red-600">{errors.resume?.message}</p>
        </div>

        <button className="hover:scale-110 transition-all duration-500 mt-4 bg-[#24EEA0] h-12 rounded-full font-bold text-base mb-10">
          Finalizar Cadastro
        </button>
      </form>
    </div>
  );
}
