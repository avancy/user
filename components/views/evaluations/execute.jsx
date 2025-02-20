import { INTERNSHIPS } from '@/components/evaluation/execute/constants';
import { useTestContext, EvaluationProvider } from '@/contexts/evaluation';

export default function ExecEvaluation({ applicant, applicant_evaluation }) {
  const type = applicant_evaluation.evaluation.evaluation_type;
  const handleClose = () => {};
  const handleSave = () => {};

  const Root = () => {
    const { step } = useTestContext();
    const Component = INTERNSHIPS[step];
    return <Component type={type} applicant={applicant} redirectTo={'/evaluations'} />;
  };

  return (
    <EvaluationProvider values={applicant_evaluation} onClose={handleClose} onSave={handleSave}>
      <Root />
    </EvaluationProvider>
  );
}
