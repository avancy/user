import { Notify } from '@/components/common/notification';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTestContext } from '@/contexts/evaluation';
import { Footer } from '@/components/main-page/footer';
import { Alert } from '@/components/common/alert';
import { useEffect, useState } from 'react';
import DiscImage from '../utils/image';
import Link from 'next/link';
import ImageByIndex from '../utils/image_by_index';
import EvaluationManager from '@/lib/interactions/backend/evaluations';

export default function EvaluationDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [accept, setAccept] = useState(false);

  const { nextStep, options, setOptions } = useTestContext();
  const evaluation = options.evaluation;
  const imageIndex = evaluation.image_index;

  const handleStart = () => {
    accept
      ? Alert.choice(
          'Atenção!',
          'Ao continuar, você iniciara o teste, vc está pronto para isto?',
          'Continuar',
          'Cancelar',
        ).then((result) => {
          if (result) {
            setIsLoading(true);
            EvaluationManager.applicant.start({
              id: evaluation.id,
              date: new Date().toISOString(),
              onSuccess: (data) => {
                console.log(data);
                setOptions(data);
                nextStep();
              },
              onFinally: () => setIsLoading(false),
            });
          }
        })
      : Notify.warning('é necessário aceitar os termos para continuar');
  };

  const renderTime = () => {
    if (evaluation.time_per_question) {
      const minutes = Math.floor(evaluation.time_per_question / 60);
      const seconds = evaluation.time_per_question % 60;
      return `${minutes} minuto${minutes > 1 ? 's' : ''} e ${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }
    return 'Não informado';
  };

  const renderValidityPeriod = () => {
    if (evaluation.validity_period_days) {
      return `${evaluation.validity_period_days} dias`;
    }
    return 'Não informado';
  };

  useEffect(() => {
    if (options.started) {
      nextStep();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-between flex-1">
        <div className="flex mx-auto justify-end pt-5 max-w-[1400px] w-full">
          <Link href="/evaluations" className="flex items-center gap-1">
            <XMarkIcon className="w-6 h-6 transition-all duration-300 cursor-pointer hover:rotate-[180deg] hover:text-white hover:bg-brand-primary-100 rounded-full hover:scale-105 hover:font-bold" />
          </Link>
        </div>
        <div className="flex h-full w-full md:flex-row flex-col-reverse gap-1 items-center max-w-[1400px] mx-auto font-sans font-[400] pb-5">
          <div className="flex flex-col text-center lg:text-left justify-between flex-1 h-full max-h-full gap-5 md:px-20 px-4 overflow-y-auto md:min-w-[500px]">
            <h1 className="text-2xl font-bold md:text-4xl font-montserrat">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="flex mx-auto justify-end pt-5 max-w-[1400px] w-full">
        <Link href="/evaluations" className="flex items-center gap-1">
          <XMarkIcon className="w-6 h-6 transition-all duration-300 cursor-pointer hover:rotate-[180deg] hover:text-white hover:bg-brand-primary-100 rounded-full hover:scale-105 hover:font-bold" />
        </Link>
      </div>
      <div className="flex h-full w-full md:flex-row flex-col-reverse gap-1 items-center max-w-[1400px] mx-auto font-sans font-[400] pb-5">
        <div className="flex flex-col text-center lg:text-left justify-between flex-1 h-full max-h-full gap-5 md:px-20 px-4 overflow-y-auto md:min-w-[500px]">
          <h1 className="text-2xl font-bold md:text-4xl font-montserrat">{evaluation.name}</h1>
          <p className="w-full text-xs text-justify md:text-sm md:text-left">
            {evaluation.description}
          </p>
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <p>
              <span className="italic font-semibold underline">
                Antes de começar, veja algumas orientações importantes:
              </span>
            </p>
            <ol className="flex flex-col gap-5 text-xs text-justify md:text-sm">
              <li>
                <span className="font-extrabold">1. Tempo do teste:</span> O teste é simples e
                possui um tempo máximo de {renderTime()} para ser concluído.
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
                o teste ficará salvo por {renderValidityPeriod()}. Durante esse período, ele não
                poderá ser refeito, garantindo a consistência dos resultados.
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
              Clique em "Iniciar" para dar início ao seu teste. Boa sorte, e aproveite esta
              oportunidade para se conhecer melhor!
            </span>
          </p>
          <button
            onClick={handleStart}
            className={`font-bold bg-brand-secondary-500 font-helvetica py-[21px] mb-2 transition-all duration-300 rounded-full text-xl ${
              accept
                ? 'hover:bg-brand-secondary-400 hover:scale-105'
                : 'cursor-not-allowed opacity-70'
            }`}
          >
            Iniciar Teste
          </button>
        </div>
        <div className="flex-1 hidden h-full xl:flex">
          <ImageByIndex index={imageIndex} className={'h-[75vh] flex-1'} />
        </div>
      </div>
      <Footer isCandidatePage={true} />
    </div>
  );
}
