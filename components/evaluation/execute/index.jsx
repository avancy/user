import { EvaluationProvider, useTestContext } from '../../../contexts/evaluation';
import { INTERNSHIPS, EVALUATIONS_TYPES } from './constants';

export default function EvaluationExecute({
  redirectTo = '/evaluations',
  type = EVALUATIONS_TYPES.DISC,
  onClose = () => {},
  onSave = () => {},
  applicant,
  values,
}) {
  const Root = () => {
    const { step } = useTestContext();
    const Component = INTERNSHIPS[step];
    return <Component type={type} applicant={applicant} redirectTo={redirectTo} />;
  };

  return (
    <EvaluationProvider values={values} onClose={onClose} onSave={onSave}>
      <Root />
    </EvaluationProvider>
  );
}
