import { Notify } from '@/components/common/notification';
import { Auth } from 'aws-amplify';
import Image from 'next/image';
import { useState } from 'react';
import EmailConfirmationBanner from '@/public/svgs/banners/email_confirmation.svg';
import { useDataTransferContext } from '@/contexts/data_transfer';
import { useRouter } from 'next/router';

// {
//   first_name: 'teste',
//   last_name: 'teste',
//   phone_number: '66999999999',
//   email: 'rychardantony228@gmail.com',
//   password: 'Avancy@123',
//   terms: true
// }

export default function SignupValidateCodeView() {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [wrongCode, setWrongCode] = useState(false);
  const { data: newUser, cleanData } = useDataTransferContext();
  const router = useRouter();
  function handleConfirmationCode(e) {
    setConfirmationCode(e.target.value);
  }

  async function sendConfirmationCode() {
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(newUser.email, confirmationCode);
      await Auth.signIn(newUser.email, newUser.password);
      Notify.success('E-mail validado com sucesso.');
      cleanData();

      router.push('/auth/signup/info');
    } catch (error) {
      console.error(error);
      if (error && 'name' in error && error.name === 'CodeMismatchException') {
        setWrongCode(true);
        Notify.error('Código inválido.');
        return;
      }
      Notify.error('erro ao validar Email');
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
