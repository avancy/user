import AuthHeader from '@/components/auth/header';
import { INTERNSHIPS_TYPES, EVALUATIONS } from '../constants';

export default function Forms({ type, ...rest }) {
  const Component = EVALUATIONS[type][INTERNSHIPS_TYPES.FORMS];
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <AuthHeader />
      <Component {...rest} />
    </div>
  );
}
