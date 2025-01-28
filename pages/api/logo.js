import { fetchCompanyIdByHost, getHost } from '@/lib/services/server_side_props';

export default async function handler(req, res) {
  if (req) {
    let host = getHost(req);

    try {
      const { company_customization } = await fetchCompanyIdByHost(host);

      if (company_customization?.f_logo?.url) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(company_customization.f_logo.url);
        return;
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  }

  res.status(404).send('/images/avancy-gray.svg');
  return;
}
