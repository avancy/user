import CandidateHomeLayout from './home_layout';

export default function CandidateHome({
  children,
  photoPath,
  company_page_url,
  type,
  applicant,
  ...rest
}) {
  return (
    <>
      <CandidateHomeLayout {...rest} applicant={applicant}>
        {children}
      </CandidateHomeLayout>
    </>
  );
}
