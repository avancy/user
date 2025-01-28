import { FormBuilder, InputType, InputWidth, LabelStyle } from '@/components/common/form_builder';
import { LoadingText } from '@/components/common/loadding/text';
import { BtnBase } from '@/components/common/buttons/base';
import { Notify } from '@/components/common/notification';
import { AUTH_ERROR_MESSAGES } from '@/constrants/auth';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import * as yup from 'yup';

export default function Forgot() {
  const [code, setCode] = useState(new Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);

  const router = useRouter();
  const { redirect } = router.query;

  const handleCancel = () =>
    router.push(`/auth/signin${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`);

  const handleSendCode = async ({ email }) => {
    setIsLoading(true);
    try {
      await Auth.forgotPassword(email);
      setEmail(email);
      Notify.success('Código de verificação enviado com sucesso para seu e-mail.');
      setStep(2);
    } catch (error) {
      console.error(error);
      Notify.error(AUTH_ERROR_MESSAGES[error.name]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCodeAndProceed = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Notify.error('Digite todos os 6 dígitos do código.');
      return;
    }
    setStep(3);
  };

  const handleSubmitNewPassword = async ({ password }) => {
    setIsLoading(true);
    try {
      const fullCode = code.join('');
      await Auth.forgotPasswordSubmit(email, fullCode, password);
      Notify.success('Senha alterada com sucesso.');
      handleCancel();
    } catch (error) {
      console.error(error);
      Notify.error(AUTH_ERROR_MESSAGES[error.name]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handlePasteCode = (e) => {
    const numbers = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    numbers.split('').forEach((num, i) => {
      newCode[i] = num;
    });
    setCode(newCode);
  };

  return (
    <div className="flex relative flex-col max-w-[480px] w-full mx-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-brand-primary-100">
          <LoadingText />
        </div>
      )}
      {step === 1 && (
        <>
          <h2 className="text-xl font-bold text-center md:text-3xl">Recuperação de Senha</h2>
          <FormBuilder
            formWidth="w-full"
            className="mt-7"
            form={{
              email: {
                type: InputType.TEXT,
                placeholder: 'Digite o email',
                labelStyle: LabelStyle.MEDIUM,
                width: InputWidth.FULL,
                validation: yup
                  .string()
                  .email('Insira um formato de e-mail válido')
                  .required('Campo Obrigatório'),
              },
            }}
            submitStyle="w-full bg-[#24EEA0] h-12 rounded-full font-bold text-lg hover:scale-110 transition-all duration-500"
            cancelStyle={
              'w-full h-12 rounded-full font-bold text-lg hover:scale-110 transition-all duration-500'
            }
            btnSubmitLabel="Enviar código"
            onSubmit={handleSendCode}
            onCancel={handleCancel}
          />
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-bold text-center md:text-3xl">
            Digite o código enviado ao seu e-mail
          </h2>
          <div className="flex justify-center gap-2 mt-5">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onPaste={handlePasteCode}
                className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring focus:ring-[#24EEA0]"
              />
            ))}
          </div>
          <BtnBase
            className="mt-5 w-full bg-[#24EEA0] h-12 rounded-full font-bold text-lg hover:scale-110 transition-all duration-500"
            onClick={handleVerifyCodeAndProceed}
          >
            Verificar Código
          </BtnBase>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-bold text-center md:text-3xl">Redefinir Senha</h2>
          <FormBuilder
            formWidth="w-full"
            className="mt-7"
            form={{
              password: {
                type: InputType.PASSWORD,
                placeholder: 'Digite sua nova senha',
                labelStyle: LabelStyle.MEDIUM,
                width: InputWidth.FULL,
                validation: yup.string().required('Campo Obrigatório'),
              },
              confirm_password: {
                type: InputType.PASSWORD,
                placeholder: 'Confirme sua nova senha',
                labelStyle: LabelStyle.MEDIUM,
                width: InputWidth.FULL,
                validation: yup
                  .string()
                  .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
                  .required('Campo Obrigatório'),
              },
            }}
            submitStyle="w-full bg-[#24EEA0] h-12 rounded-full font-bold text-lg hover:scale-110 transition-all duration-500"
            cancelStyle={
              'w-full h-12 rounded-full font-bold text-lg hover:scale-110 transition-all duration-500'
            }
            btnSubmitLabel="Alterar Senha"
            onSubmit={handleSubmitNewPassword}
          />
        </>
      )}
    </div>
  );
}
