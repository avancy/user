import AuthHeader from '@/components/auth/header';
import { INTERNSHIPS_TYPES, TESTS } from '../constants';

export default function Finished({ type, ...rest }) {
  const Component = TESTS[type][INTERNSHIPS_TYPES.FINISHED];
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <AuthHeader />
      <Component {...rest} />
    </div>
  );
}
