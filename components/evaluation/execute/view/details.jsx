import { INTERNSHIPS_TYPES, TESTS } from '../constants';
import { CandidateHeader } from '@/components/dashboard/candidate_header';

export default function Details({ type, applicant, ...rest }) {
  const Component = TESTS[type][INTERNSHIPS_TYPES.DETAILS];
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <CandidateHeader user={applicant} />
      <Component {...rest} />
    </div>
  );
}
