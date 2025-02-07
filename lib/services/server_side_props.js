import { api_public, api_webhook } from '@/lib/api';
import { withSSRContext } from 'aws-amplify';

async function fetchCompanyIdByHost(host) {
  return api_public
    .get(`/company/host/${host}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching company id:', error);
      return null;
    });
}

async function fetchApplicant(req) {
  const user = await getUser(req);

  if (user?.error) return user;

  try {
    const res = await api_webhook.get(`/applicant/${user.username}`);
    if (!res.data) {
      return { error: 'UserNotFoundException' };
    }

    return res.data;
  } catch (error) {
    console.error('Error fetching applicant:', error);
    return { error: 'error fetching applicant' };
  }
}

export async function getUser(req) {
  const { Auth } = withSSRContext({ req });

  try {
    const user = await Auth.currentAuthenticatedUser();

    if (!user) {
      return { error: 'UserNotFoundException' };
    }

    const session = await Auth.currentSession();

    if (!session?.idToken?.payload?.email_verified) {
      return { error: 'EmailNotVerifiedException' };
    }

    return user;
  } catch (err) {
    if (err?.name === 'UserNotConfirmedException' || err?.name === 'NotAuthorizedException') {
      return { error: 'EmailNotVerifiedException' };
    }

    return { error: err.name };
  }
}

async function fetchCompanyCustomization(companyId) {
  return api_public
    .get(`/company/customization/${companyId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching company customization:', error);
      throw error;
    });
}

async function fetchChildCompaniesLogo(companyId) {
  return api_public
    .get(`/company/child_companies_logo/${companyId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching child companies logo:', error);
      return null;
    });
}

async function getJobDetails(slug) {
  return api_public
    .get(`/jobs/slug/${slug}`)
    .then((job) => {
      const jobData = job.data;

      if (!jobData) {
        return null;
      }

      increaseJobView(jobData.id);
      return jobData;
    })
    .catch((error) => {
      console.error('Error getting job details:', error);
      throw error;
    });
}

async function increasePageView(company_id) {
  try {
    const response = await api_public.patch(`/page/view/${company_id}`);

    return response.data;
  } catch (error) {
    console.error('Error increasing page view:', error);
    throw error;
  }
}

async function increaseJobView(job_id) {
  try {
    const response = await api_public.patch(`/jobs/view/${job_id}`);

    return response.data;
  } catch (error) {
    console.error('Error increasing job view:', error);
    throw error;
  }
}

async function getCompanyJobs(company_id) {
  try {
    const response = await api_public.get(`/jobs/visible/${company_id}`);
    const jobs = response?.data;

    if (!jobs) {
      return { notFound: true };
    }
    await increasePageView(company_id);
    return jobs;
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw error;
  }
}

async function getOpeningJobs(company_id) {
  return api_public
    .get(`jobs/visible/${company_id}`)
    .then((res) => {
      let jobs = res.data;
      if (process.env.NODE_ENV === 'development') {
        jobs = jobs.map((job) => ({
          ...job,
          url: `http://localhost:${process.env.PORT}/jobs/${job.slug}`,
        }));
      }
      if (!jobs) {
        return { notFound: true };
      }
      return increasePageView(company_id).then(() => jobs);
    })
    .catch((error) => {
      console.error('Error getting jobs:', error);
      return null;
    });
}

async function isSubscribedToCompany(applicant_id, company_id) {
  try {
    const response = await api_webhook.get(`applicant/company/${applicant_id}/${company_id}`);
    const isSubscribed = response?.data;
    return isSubscribed;
  } catch (error) {
    console.error('Error getting subscribe status:', error);
    throw error;
  }
}

async function isAppliedToJob(job_id, applicant_id) {
  return api_webhook
    .get(`/jobs/applied/${job_id}/${applicant_id}`)
    .then((response) => {
      const isApplied = response?.data;
      return isApplied;
    })
    .catch((error) => {
      console.error('Error getting subscribe status:', error);
      return null;
    });
}

function getHost(req) {
  if (process.env.NODE_ENV === 'development') {
    return 'agrovagas.mavielorh.com.br';
  }
  if (req) {
    return (req.headers['x-forwarded-host'] || req.headers['host'] || '').toLowerCase();
  }

  return '';
}

export {
  fetchCompanyCustomization,
  fetchChildCompaniesLogo,
  fetchCompanyIdByHost,
  fetchApplicant,
  getCompanyJobs,
  getOpeningJobs,
  getJobDetails,
  getHost,
  isSubscribedToCompany,
  isAppliedToJob,
};
