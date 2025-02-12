import { Footer } from '@/components/main-page/footer';
import { useTestContext } from '@/contexts/evaluation';
import { useEffect, useState } from 'react';

export default function EvaluationForms() {
  const [isLoading, setIsLoading] = useState(true);
  const { nextStep, options } = useTestContext();
  const evaluation = options.evaluation;
  const questions = evaluation.questions;
  console.log(options);
  console.log(evaluation);
  console.log(questions);

  useEffect(() => {
    if (options.finished) {
      nextStep();
    } else {
      setIsLoading(false);
    }
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex flex-col justify-between flex-1">
        <div></div>
        <Footer isCandidatePage={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between flex-1">
      <div></div>
      <Footer isCandidatePage={true} />
    </div>
  );
}
