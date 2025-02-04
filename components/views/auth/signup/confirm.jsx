import EmailConfirmationBanner from '@/public/svgs/banners/email_confirmation.svg';
import { useDataTransferContext } from '@/contexts/data_transfer';
import { LoadSpinner } from '@/components/common/modal/types';
import { BtnBase } from '@/components/common/buttons/base';
import { Notify } from '@/components/common/notification';
import { AUTH_ERROR_MESSAGES } from '@/constrants/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import Image from 'next/image';

export default function SignupValidateCodeView() {
  const { data: newUser, cleanData } = useDataTransferContext();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [code, setCode] = useState(new Array(6).fill(''));
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState('');

  const router = useRouter();
  const { redirect } = router.query;
  const redirectUrl = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';

  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setConfirmationCode(newCode.join(''));

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
    setConfirmationCode(newCode.join(''));
    setCode(newCode);
  };

  const sendConfirmationCode = async (resendEmail) => {
    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();

      if (user.attributes.email_verified == 'true') {
        Notify.success('E-mail já está verificado.');
        return;
      }
      await Auth.verifyCurrentUserAttribute('email');
      setCanResend(false);
      setTimeRemaining(20);

      Notify.success('Código de confirmação enviado!');
    } catch (err) {
      await Auth.resendSignUp(resendEmail);
      setCanResend(false);
      setTimeRemaining(20);

      Notify.success('Código de confirmação enviado!');
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAndSignIn = async () => {
    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();

      if (user.attributes.email_verified == 'true') {
        Notify.success('E-mail já está verificado.');
        cleanData();
        router.push(`/auth/signup/info${redirectUrl}`);
      } else {
        await Auth.verifyCurrentUserAttributeSubmit('email', confirmationCode);
        Notify.success('E-mail validado com sucesso.');
        cleanData();
        router.push(`/auth/signup/info${redirectUrl}`);
      }
    } catch (error) {
      console.error(error);
      if (error?.name === 'CodeMismatchException') {
        Notify.error('Código inválido.');
      } else if (error?.name === 'ExpiredCodeException') {
        Notify.error('O código expirou. Por favor, solicite um novo.');
      } else {
        await Auth.confirmSignUp(email, confirmationCode);
        Notify.success('Conta confirmada com sucesso.');
        cleanData();
        router.push(`/auth/signup/info${redirectUrl}`);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (newUser?.email) {
      setEmail(newUser.email);
    } else {
      async function fetchAuthenticatedUserEmail() {
        try {
          const currentUser = await Auth.currentAuthenticatedUser();
          setEmail(currentUser.attributes.email);
        } catch (error) {
          router.push(`/auth/signin${redirectUrl}`);
          Notify.error('Erro ao obter usuário autenticado, por favor, faça login novamente.');
        }
      }
      fetchAuthenticatedUserEmail();
    }
  }, [newUser]);

  useEffect(() => {
    if (!canResend) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [canResend]);

  return (
    <div className="flex flex-col items-center justify-start h-full font-montserrat">
      {isLoading && <LoadSpinner />}
      <Image src={EmailConfirmationBanner} className="hidden w-80 lg:block" />

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
        onClick={confirmAndSignIn}
      >
        Verificar Código
      </BtnBase>

      <div className="mt-4">
        {canResend ? (
          <button onClick={() => sendConfirmationCode(email)} className="text-[#24EEA0] font-bold">
            Reenviar código
          </button>
        ) : (
          <p className="text-sm text-gray-500">
            Aguarde {timeRemaining} {timeRemaining === 1 ? 'segundo' : 'segundos'} para reenviar o
            código.
          </p>
        )}
      </div>
    </div>
  );
}
