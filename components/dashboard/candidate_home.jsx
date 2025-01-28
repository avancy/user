import CandidateHomeLayout from './candidate_home_layout';

export default function CandidateHome({ children, photoPath, company_page_url, type, ...rest }) {
  return (
    <>
      <CandidateHomeLayout
        photoPath={photoPath}
        {...rest}
        company_page_url={company_page_url}
        type={type}
      >
        {children}
      </CandidateHomeLayout>
    </>
  );
}
