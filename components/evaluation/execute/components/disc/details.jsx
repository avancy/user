import { Notify } from '@/components/common/notification';
import { useTestContext } from '@/contexts/evaluation';
import { Alert } from '@/components/common/alert';
import { useState } from 'react';
import DiscImage from '../utils/image';
import { Footer } from '@/components/main-page/footer';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function DiscDetails() {
  const [accept, setAccept] = useState(false);
  const { nextStep } = useTestContext();

  const handleNextStep = () => {
    accept
      ? Alert.choice(
          'Atenção!',
          'Ao continuar, você iniciara o teste, vc está pronto para isto?',
          'Continuar',
          'Cancelar',
        ).then((result) => {
          if (result) nextStep();
        })
      : Notify.warning('é necessário aceitar os termos para continuar');
  };

  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="flex mx-auto justify-end pt-5 max-w-[1400px] w-full">
        <Link href="/evaluations" className="flex items-center gap-1">
          <XMarkIcon className="w-6 h-6 transition-all duration-300 cursor-pointer hover:rotate-[180deg] hover:text-white hover:bg-brand-primary-100 rounded-full hover:scale-105 hover:font-bold" />
        </Link>
      </div>
      <div className="flex h-full w-full md:flex-row flex-col-reverse gap-1 items-center max-w-[1400px] mx-auto font-sans font-[400] pb-5">
        <div className="flex flex-col text-center lg:text-left justify-between flex-1 h-full max-h-full gap-5 md:px-20 px-4 overflow-y-auto md:min-w-[500px]">
          <h1 className="text-2xl font-light md:text-4xl font-montserrat">
            Bem-vindo ao <span className="font-bold">Teste DISC!</span>
          </h1>
          <p className="w-full text-xs text-justify md:text-sm md:text-left">
            Este é o primeiro passo para compreender melhor seu perfil comportamental e explorar
            suas forças e oportunidades de desenvolvimento. Este teste é uma ferramenta poderosa
            para oferecer insights que irão ajudar você em sua vida pessoal e profissional.
          </p>
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <p>
              <span className="italic font-semibold underline">
                Antes de começar, veja algumas orientações importantes:
              </span>
            </p>
            <ol className="flex flex-col gap-5 text-xs text-justify md:text-sm">
              <li>
                <span className="font-extrabold">1.Tempo do teste:</span> O teste é simples e deve
                levar cerca de 10 minutos para ser concluído.
              </li>
              <li>
                <span className="font-extrabold">2. Foco e concentração:</span> Escolha um momento
                tranquilo para se dedicar inteiramente ao teste, idealmente no começo da manhã,
                quando sua mente está descansada e você está com mais disposição.
              </li>
              <li>
                <span className="font-extrabold">3. Não interrompa:</span> Uma vez iniciado, o teste
                deve ser finalizado sem interrupções, pois isso ajuda a capturar suas respostas mais
                naturais.
              </li>
              <li>
                <span className="font-extrabold">4. Validade e reavaliação:</span> Após a conclusão,
                o teste ficará salvo por 90 dias. Durante esse período, ele não poderá ser refeito,
                garantindo a consistência dos resultados.
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-2 text-xs md:text-sm">
            <h2 className="text-xl font-bold font-montserrat">Dicas para responder:</h2>
            <ul className="flex flex-col gap-2 text-xs text-justify">
              <li>
                &ndash; Escolha as palavras que melhor refletem sua maneira habitual de pensar e
                agir.
              </li>
              <li>
                &ndash; Seja honesto consigo mesmo para obter um resultado preciso e relevante.
              </li>
            </ul>
          </div>
          <p className="flex items-center gap-2 text-xs cursor-pointer md:text-sm justify-centers">
            <input
              type="checkbox"
              name="accept"
              id="accept"
              className="cursor-pointer"
              value={accept}
              onChange={(e) => setAccept(e.target.checked)}
            />
            <label htmlFor="accept" className="cursor-pointer">
              Aqui confirmo que li as orientações acima
            </label>
          </p>
          <p className="text-xs md:text-sm">
            <span className="italic font-light">
              Clique em "Iniciar" para dar início ao seu teste DISC. Boa sorte, e aproveite esta
              oportunidade para se conhecer melhor!
            </span>
          </p>
          <button
            onClick={handleNextStep}
            className={`font-bold bg-brand-secondary-500 font-helvetica py-[21px] mb-2 transition-all duration-300 rounded-full text-xl ${
              accept
                ? 'hover:bg-brand-secondary-400 hover:scale-105'
                : 'cursor-not-allowed opacity-70'
            }`}
          >
            Iniciar Teste
          </button>
        </div>
        <DiscImage />
      </div>
      <Footer isCandidatePage={true} />
    </div>
  );
}
