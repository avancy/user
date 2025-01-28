import { City, Company, CompanyCustomization, CompanyDepartment, Job, State, Partner } from '@/db';
import { serialize } from 'superjson';
const { Op } = require('sequelize');

export async function getOpeningJobs(company_id) {
  let jobs = [];
  try {
    let company = await Company.findOne({ where: { id: company_id }, raw: true });
    if (company) {
      if (company.belongs_to_partner) {
        let partner_id = company.partner_id;
        let companies_ids = await Company.findAll({
          where: { partner_id: partner_id },
          attributes: ['id'],
          raw: true,
        });
        jobs = await Job.findAll({
          where: {
            company_id: {
              [Op.in]: companies_ids.map((c) => c.id),
            },
            visible: true,
            published: true,
            deleted_at: null,
          },
          include: [
            { model: City, as: 'city', attributes: ['id', 'name'] },
            { model: State, as: 'state', attributes: ['id', 'name'] },
            { model: CompanyDepartment, as: 'department', attributes: ['id', 'name'] },
            {
              model: Company,
              as: 'company',
              attributes: ['id', 'name'],
              include: [
                {
                  model: CompanyCustomization,
                  as: 'company_customizations',
                  attributes: ['base_domain', 'domain_prefix'],
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      } else {
        jobs = await Job.findAll({
          where: { company_id: company_id, visible: true, published: true, deleted_at: null },
          include: [
            { model: City, as: 'city', attributes: ['id', 'name'] },
            { model: State, as: 'state', attributes: ['id', 'name'] },
            { model: CompanyDepartment, as: 'department', attributes: ['id', 'name'] },
            {
              model: Company,
              as: 'company',
              attributes: ['id', 'name'],
              include: [
                {
                  model: CompanyCustomization,
                  as: 'company_customizations',
                  attributes: ['base_domain', 'domain_prefix'],
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
      }
    }
  } catch (err) {
    console.error(err);
  }

  jobs = jobs.map((job) => ({
    ...job,
    url:
      (process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${job.company.company_customizations.domain_prefix}.${job.company.company_customizations.base_domain}`) +
      `/jobs/${job.slug}`,
  }));

  const { json, meta } = serialize(jobs);
  return json;
}

export async function getOpeningJobsCompany(company_id) {
  let jobs = [];
  try {
    jobs = await Job.findAll({
      where: { company_id: company_id, visible: true, published: true, deleted_at: null },
      include: [
        { model: City, as: 'city', attributes: ['id', 'name'] },
        { model: State, as: 'state', attributes: ['id', 'name'] },
        { model: CompanyDepartment, as: 'department', attributes: ['id', 'name'] },
      ],
      raw: true,
      nest: true,
    });
  } catch (err) {
    console.error(err);
  }
  const { json, meta } = serialize(jobs);
  return json;
}

export async function getCompanyIdGivenDomainName(host) {
  if (host.length > 0) {
    let company;
    if (process.env.NODE_ENV === 'development') {
      company = await Company.findOne({
        where: { id: '57e635df-94d1-4f2f-9237-5eb9ebbbdae6' },
        raw: true,
      });
    } else {
      let regex = /^(.*)\.(.*\..*)$/;
      let res = host.match(regex);
      if (res && Array.isArray(res) && res.length > 2) {
        let domain_prefix = res[1];
        let base_domain = res[2];
        company = await Company.findOne({
          include: [
            {
              model: CompanyCustomization,
              where: { domain_prefix, base_domain },
              required: true,
              attributes: ['company_id'],
            },
          ],
          attributes: ['id', 'name', 'type'],
          raw: true,
        });
      }
    }
    if (company) {
      return { company_id: company.id, company_name: company.name, company_type: company.type };
    }
  }
  return null;
}
// função migrada para go-api
// export async function getCompanyCustomizationData(company_id) {
//   let companyCustomization = await CompanyCustomization.findOne({
//     where: { company_id: company_id },
//     raw: true,
//   });
//   let company = await Company.findOne({ where: { id: company_id }, raw: true });
//   const { json, meta } = serialize({ ...company, ...companyCustomization });
//   return json;
// }

export async function increasePageView(company_id) {
  let companyCustomization = await CompanyCustomization.findOne({
    where: { company_id: company_id },
  });
  companyCustomization.stat_page_views = companyCustomization.stat_page_views + 1;
  await companyCustomization.save();
}

export async function getJob(company_id, slug) {
  let job = await Job.findOne({
    where: { company_id: company_id, slug: slug, visible: true, published: true },
    include: [
      { model: City, as: 'city', attributes: ['id', 'name'] },
      { model: State, as: 'state', attributes: ['id', 'name'] },
      { model: CompanyDepartment, as: 'department', attributes: ['id', 'name'] },
    ],
    raw: true,
  });

  const { json, meta } = serialize(job);
  return json;
}

export async function increaseJobView(job_id) {
  let job = await Job.findOne({ where: { id: job_id } });
  job.stat_job_views = job.stat_job_views + 1;
  await job.save();
}
