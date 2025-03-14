import { Notify } from '@/components/common/notification';
import { useTestContext } from '@/contexts/evaluation';
import Progress from '@/components/common/progress';
import Keyword from '../utils/kayword';
import {
  DISC_FORMS_FILTERS,
  DISC_MAX_WORDS,
  DISC_MIN_WORDS,
} from '@/components/evaluation/execute/constants';
import EvaluationManager from '@/lib/interactions/backend/evaluations';
import { useEffect } from 'react';

export default function DiscForms() {
  const {
    options: applicantEvaluation,
    setOptions: setApplicantEvaluation,
    formStep,
    setFormStep,
    nextStep,
  } = useTestContext();

  const words = applicantEvaluation?.evaluation?.questions[0]?.disc.words;

  const backFormStep = () => {
    setFormStep(Math.max(formStep - 1, 0));
  };

  const handleSelect = (id) => {
    if ((words?.filter((word) => word.selected).length || 0) >= DISC_MAX_WORDS) {
      Notify.warning(`é indispensável selecionar no máximo ${DISC_MAX_WORDS} palavras`);
      return;
    }

    const newWords = words.map((word) =>
      word.id === id ? { ...word, selected: !word.selected } : word,
    );

    setApplicantEvaluation((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        questions: [
          {
            ...prev.evaluation.questions[0],
            disc: {
              ...prev.evaluation.questions[0].disc,
              words: newWords,
            },
          },
        ],
      },
    }));
  };

  const handleSaveDisc = async (words) => {
    const selectedIds = words.filter(({ selected }) => selected).map(({ id }) => id);

    await EvaluationManager.applicant.start({
      id: applicantEvaluation.evaluation.id,
      date: new Date().toISOString(),
    });

    await EvaluationManager.applicant.updateAnswer({
      id: applicantEvaluation.evaluation.id,
      answer: {
        question_id: applicantEvaluation.evaluation.questions[0].id,
        words: selectedIds,
      },
    });

    await EvaluationManager.applicant.finish({
      id: applicantEvaluation.evaluation.id,
      date: new Date().toISOString(),
      onSuccess: (data) => {
        setApplicantEvaluation(data);
      }
    });
  };

  const nextFormStep = async () => {
    if (formStep === DISC_FORMS_FILTERS.length - 1) {
      if (words.filter((word) => word.selected).length < DISC_MIN_WORDS) {
        Notify.warning(`é necessário selecionar ao menos ${DISC_MIN_WORDS} palavras`);
        return;
      }

      await handleSaveDisc(words);
      nextStep();
      return;
    }

    setFormStep(Math.min(formStep + 1, DISC_FORMS_FILTERS.length - 1));
  };

  useEffect(() => {
    if (applicantEvaluation.finished) {
      nextStep();
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 w-screen gap-10">
      <div className="flex flex-col-reverse items-center justify-center w-full gap-10 px-2 md:px-12 md:flex-row min-h-36">
        <div className="flex flex-col gap-3 max-w-[950px]">
          <h1 className="text-lg font-bold text-center lg:text-4xl lg:text-left font-montserrat">
            Selecione as palavras que melhor te definem
          </h1>
          <p className="font-sans text-sm text-center md:text-base">
            Escolha as palavras que melhor refletem sua maneira habitual de pensar e agir, além de
            ser honesto consigo mesmo para obter um resultado preciso e relevante. (Minimo de 20 e
            Máximo de 39)
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Progress.Cirular
            current={words?.filter((word) => word.selected).length || 0}
            total={DISC_MAX_WORDS}
            radius={40}
            className="absolute text-xl font-bold"
            thickness={4}
          />
          <div>Palavras</div>
        </div>
      </div>
      <div className="flex  flex-wrap gap-x-3 md:py-2 md:my-2 gap-y-2 max-h-full overflow-x-visible justify-center max-w-[1050px]">
        {words.slice(formStep * 20, formStep * 20 + 20).map((word, index) => (
          <Keyword
            {...word}
            classNames={`cursor-pointer hover:bg-brand-secondary-100 transition-all duration-300`}
            onClick={() => handleSelect(word.id)}
            select={word.selected}
            key={index}
          />
        ))}
      </div>
      <div className="relative flex flex-col items-center justify-center w-full gap-3 min-h-36">
        <div className="flex flex-wrap-reverse justify-center gap-x-5 gap-y-2">
          {formStep !== 0 && (
            <button
              className="font-bold font-helvetica max-w-full md:w-[437px] w-[250px] md:py-[21px] py-3 hover:scale-y-105 transition-all duration-300 rounded-full text-xl border border-black"
              onClick={backFormStep}
            >
              voltar
            </button>
          )}
          <button
            onClick={nextFormStep}
            className="font-bold border border-transparent font-helvetica max-w-full md:w-[437px] w-[250px] md:py-[21px] py-3 hover:opacity-100 opacity-80 hover:scale-y-105 transition-all duration-300 rounded-full text-xl bg-brand-secondary-500"
          >
            Avançar
          </button>
        </div>
        <div className="flex gap-2 my-4">
          {Array.from({ length: DISC_FORMS_FILTERS.length }, (_, index) => (
            <div
              className={`w-[6px] h-[6px] rounded-full ${index === formStep ? 'bg-brand-secondary-200' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
