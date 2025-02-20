import EvaluationManager from '@/lib/interactions/backend/evaluations';
import { Notify } from '@/components/common/notification';
import { Footer } from '@/components/main-page/footer';
import { useTestContext } from '@/contexts/evaluation';
import ImageByIndex from '../utils/image_by_index';
import { useEffect, useState } from 'react';
import { QUESTIONS } from '../../constants';

export default function EvaluationForms() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { nextStep, options, setOptions, onSave } = useTestContext();

  console.log(options);

  const evaluation = options?.evaluation;
  const questions = evaluation?.questions;
  const qntQuestions = questions?.length;
  console.log(questions);
  console.log(qntQuestions);

  const currentQuestion = questions?.[currentQuestionIndex] || null;

  const handleNext = async (option_id = '') => {
    setIsLoading(true);

    await EvaluationManager.applicant.updateAnswer({
      id: evaluation.id,
      answer: {
        question_id: currentQuestion.id,
        option_id,
      },
      onSuccess: (data) => {
        setOptions((prev) => ({ ...prev, answers: data.answers }));
      },
    });

    console.log(currentQuestionIndex);
    console.log(qntQuestions);
    if (currentQuestionIndex + 1 >= qntQuestions) {
      await EvaluationManager.applicant.finish({
        id: evaluation.id,
        date: new Date().toISOString(),
        onSuccess: (data) => {
          setOptions(data);
          nextStep();
        },
      });
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setIsLoading(false);
  };

  const handleExpiration = () => {
    Notify.warning('Tempo esgotado para completar o teste');
    nextStep();
  };

  useEffect(() => {
    if (options.finished) {
      nextStep();
    } else {
      setIsLoading(false);
    }
  }, []);

  const Component = QUESTIONS?.[currentQuestion?.question_type] || null;

  if ((isLoading, Component === null)) {
    return (
      <div
        className="flex flex-col items-center justify-center flex-1"
        style={{ height: `calc(100vh - 160px)` }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <span>Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between flex-1 max-h-full">
      <div className="flex flex-1 max-h-full">
        {!questionsLoading ? (
          <ImageByIndex index={evaluation.image_index} />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span>Carregando...</span>
          </div>
        )}
        <Component
          max_date={options.expiration_termination}
          setQuestionsLoading={setQuestionsLoading}
          questionLoadding={questionsLoading}
          question={questions[currentQuestionIndex]}
          question_index={currentQuestionIndex}
          started_at={options.started_at}
          onExpiration={handleExpiration}
          onNext={handleNext}
        />
      </div>
      <Footer isCandidatePage={true} />
    </div>
  );
}
