var DataTypes = require('sequelize').DataTypes;
var _ApplicantCompany = require('./applicant_company');
var _ApplicantDesiredPosition = require('./applicant_desired_position');
var _ApplicantFeedback = require('./applicant_feedback');
var _ApplicantPartner = require('./applicant_partner');
var _Applicant = require('./applicant');
var _City = require('./city');
var _Company = require('./company');
var _CompanyCustomization = require('./company_customization');
var _CompanyDepartment = require('./company_department');
var _CompanyDeployment = require('./company_deployment');
var _CompanyIam = require('./company_iam');
var _CompanyPlan = require('./company_plan');
var _Conversation = require('./conversation');
var _Currency = require('./currency');
var _DeploymentEvent = require('./deployment_event');
var _Feedback = require('./feedback');
var _JobApplicationEvent = require('./job_application_event');
var _JobApplicationNote = require('./job_application_note');
var _JobApplication = require('./job_application');
var _JobFeedback = require('./job_feedback');
var _JobHardSkill = require('./job_hard_skill');
var _JobRecruiter = require('./job_recruiter');
var _JobRecruitersLike = require('./job_recruiters_like');
var _JobRecruitersStar = require('./job_recruiters_star');
var _JobSoftSkill = require('./job_soft_skill');
var _Job = require('./job');
var _Language = require('./language');
var _Message = require('./message');
var _PartnerCustomization = require('./partner_customization');
var _PartnerPlanSubscription = require('./partner_plan_subscription');
var _PartnerUser = require('./partner_user');
var _Partner = require('./partner');
var _Plan = require('./plan');
var _Recruiter = require('./recruiter');
var _ResumeCertification = require('./resume_certification');
var _ResumeCourse = require('./resume_course');
var _ResumeEducation = require('./resume_education');
var _ResumeLanguage = require('./resume_language');
var _ResumeSkill = require('./resume_skill');
var _ResumeWorkExperience = require('./resume_work_experience');
var _Role = require('./role');
var _StageApplicantEvaluatorsRemark = require('./stage_applicant_evaluators_remark');
var _StageRecruiter = require('./stage_recruiter');
var _Stage = require('./stage');
var _State = require('./state');
var _SysDepartment = require('./sys_department');
var _SysFeedback = require('./sys_feedback');
var _UploadedResume = require('./uploaded_resume');

function initModels(sequelize) {
  var ApplicantCompany = _ApplicantCompany(sequelize, DataTypes);
  var ApplicantDesiredPosition = _ApplicantDesiredPosition(sequelize, DataTypes);
  var ApplicantFeedback = _ApplicantFeedback(sequelize, DataTypes);
  var ApplicantPartner = _ApplicantPartner(sequelize, DataTypes);
  var Applicant = _Applicant(sequelize, DataTypes);
  var City = _City(sequelize, DataTypes);
  var Company = _Company(sequelize, DataTypes);
  var CompanyCustomization = _CompanyCustomization(sequelize, DataTypes);
  var CompanyDepartment = _CompanyDepartment(sequelize, DataTypes);
  var CompanyDeployment = _CompanyDeployment(sequelize, DataTypes);
  var CompanyIam = _CompanyIam(sequelize, DataTypes);
  var CompanyPlan = _CompanyPlan(sequelize, DataTypes);
  var Conversation = _Conversation(sequelize, DataTypes);
  var Currency = _Currency(sequelize, DataTypes);
  var DeploymentEvent = _DeploymentEvent(sequelize, DataTypes);
  var Feedback = _Feedback(sequelize, DataTypes);
  var JobApplicationEvent = _JobApplicationEvent(sequelize, DataTypes);
  var JobApplicationNote = _JobApplicationNote(sequelize, DataTypes);
  var JobApplication = _JobApplication(sequelize, DataTypes);
  var JobFeedback = _JobFeedback(sequelize, DataTypes);
  var JobHardSkill = _JobHardSkill(sequelize, DataTypes);
  var JobRecruiter = _JobRecruiter(sequelize, DataTypes);
  var JobRecruitersLike = _JobRecruitersLike(sequelize, DataTypes);
  var JobRecruitersStar = _JobRecruitersStar(sequelize, DataTypes);
  var JobSoftSkill = _JobSoftSkill(sequelize, DataTypes);
  var Job = _Job(sequelize, DataTypes);
  var Language = _Language(sequelize, DataTypes);
  var Message = _Message(sequelize, DataTypes);
  var PartnerCustomization = _PartnerCustomization(sequelize, DataTypes);
  var PartnerPlanSubscription = _PartnerPlanSubscription(sequelize, DataTypes);
  var PartnerUser = _PartnerUser(sequelize, DataTypes);
  var Partner = _Partner(sequelize, DataTypes);
  var Plan = _Plan(sequelize, DataTypes);
  var Recruiter = _Recruiter(sequelize, DataTypes);
  var ResumeCertification = _ResumeCertification(sequelize, DataTypes);
  var ResumeCourse = _ResumeCourse(sequelize, DataTypes);
  var ResumeEducation = _ResumeEducation(sequelize, DataTypes);
  var ResumeLanguage = _ResumeLanguage(sequelize, DataTypes);
  var ResumeSkill = _ResumeSkill(sequelize, DataTypes);
  var ResumeWorkExperience = _ResumeWorkExperience(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var StageApplicantEvaluatorsRemark = _StageApplicantEvaluatorsRemark(sequelize, DataTypes);
  var StageRecruiter = _StageRecruiter(sequelize, DataTypes);
  var Stage = _Stage(sequelize, DataTypes);
  var State = _State(sequelize, DataTypes);
  var SysDepartment = _SysDepartment(sequelize, DataTypes);
  var SysFeedback = _SysFeedback(sequelize, DataTypes);
  var UploadedResume = _UploadedResume(sequelize, DataTypes);

  Applicant.belongsToMany(Company, {
    as: 'company_id_companies',
    through: ApplicantCompany,
    foreignKey: 'applicant_id',
    otherKey: 'company_id',
  });
  Applicant.belongsToMany(Language, {
    as: 'language_id_languages',
    through: ResumeLanguage,
    foreignKey: 'applicant_id',
    otherKey: 'language_id',
  });
  Applicant.belongsToMany(Partner, {
    as: 'partner_id_partners',
    through: ApplicantPartner,
    foreignKey: 'applicant_id',
    otherKey: 'partner_id',
  });
  Company.belongsToMany(Applicant, {
    as: 'applicant_id_applicants',
    through: ApplicantCompany,
    foreignKey: 'company_id',
    otherKey: 'applicant_id',
  });
  JobApplication.belongsToMany(Recruiter, {
    as: 'recruiter_id_recruiters_job_recruiters_likes',
    through: JobRecruitersLike,
    foreignKey: 'job_application_id',
    otherKey: 'recruiter_id',
  });
  JobApplication.belongsToMany(Recruiter, {
    as: 'recruiter_id_recruiters_job_recruiters_stars',
    through: JobRecruitersStar,
    foreignKey: 'job_application_id',
    otherKey: 'recruiter_id',
  });
  Job.belongsToMany(Recruiter, {
    as: 'recruiter_id_recruiters',
    through: JobRecruiter,
    foreignKey: 'job_id',
    otherKey: 'recruiter_id',
  });
  Language.belongsToMany(Applicant, {
    as: 'applicant_id_applicants_resume_languages',
    through: ResumeLanguage,
    foreignKey: 'language_id',
    otherKey: 'applicant_id',
  });
  Partner.belongsToMany(Applicant, {
    as: 'applicant_id_applicants_applicant_partners',
    through: ApplicantPartner,
    foreignKey: 'partner_id',
    otherKey: 'applicant_id',
  });
  Recruiter.belongsToMany(JobApplication, {
    as: 'job_application_id_job_applications',
    through: JobRecruitersLike,
    foreignKey: 'recruiter_id',
    otherKey: 'job_application_id',
  });
  Recruiter.belongsToMany(JobApplication, {
    as: 'job_application_id_job_applications_job_recruiters_stars',
    through: JobRecruitersStar,
    foreignKey: 'recruiter_id',
    otherKey: 'job_application_id',
  });
  Recruiter.belongsToMany(Job, {
    as: 'job_id_jobs',
    through: JobRecruiter,
    foreignKey: 'recruiter_id',
    otherKey: 'job_id',
  });
  Recruiter.belongsToMany(Stage, {
    as: 'stage_id_stages',
    through: StageRecruiter,
    foreignKey: 'recruiter_id',
    otherKey: 'stage_id',
  });
  Stage.belongsToMany(Recruiter, {
    as: 'recruiter_id_recruiters_stage_recruiters',
    through: StageRecruiter,
    foreignKey: 'stage_id',
    otherKey: 'recruiter_id',
  });
  ApplicantCompany.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ApplicantCompany, { as: 'applicant_companies', foreignKey: 'applicant_id' });
  ApplicantFeedback.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ApplicantFeedback, { as: 'applicant_feedbacks', foreignKey: 'applicant_id' });
  ApplicantPartner.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ApplicantPartner, { as: 'applicant_partners', foreignKey: 'applicant_id' });
  Conversation.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(Conversation, { as: 'conversations', foreignKey: 'applicant_id' });
  JobApplicationEvent.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(JobApplicationEvent, {
    as: 'job_application_events',
    foreignKey: 'applicant_id',
  });
  JobApplication.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(JobApplication, { as: 'job_applications', foreignKey: 'applicant_id' });
  JobFeedback.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(JobFeedback, { as: 'job_feedbacks', foreignKey: 'applicant_id' });
  ResumeCertification.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ResumeCertification, {
    as: 'resume_certifications',
    foreignKey: 'applicant_id',
  });
  ResumeCourse.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ResumeCourse, { as: 'resume_courses', foreignKey: 'applicant_id' });
  ResumeEducation.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ResumeEducation, { as: 'resume_educations', foreignKey: 'applicant_id' });
  ResumeLanguage.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ResumeLanguage, { as: 'resume_languages', foreignKey: 'applicant_id' });
  ResumeSkill.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ResumeSkill, { as: 'resume_skills', foreignKey: 'applicant_id' });
  ResumeWorkExperience.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(ResumeWorkExperience, {
    as: 'resume_work_experiences',
    foreignKey: 'applicant_id',
  });
  UploadedResume.belongsTo(Applicant, { as: 'applicant', foreignKey: 'applicant_id' });
  Applicant.hasMany(UploadedResume, { as: 'uploaded_resumes', foreignKey: 'applicant_id' });
  Applicant.belongsTo(City, { as: 'city', foreignKey: 'city_id' });
  City.hasMany(Applicant, { as: 'applicants', foreignKey: 'city_id' });
  Company.belongsTo(City, { as: 'city', foreignKey: 'city_id' });
  City.hasMany(Company, { as: 'companies', foreignKey: 'city_id' });
  Job.belongsTo(City, { as: 'city', foreignKey: 'city_id' });
  City.hasMany(Job, { as: 'jobs', foreignKey: 'city_id' });
  Partner.belongsTo(City, { as: 'city', foreignKey: 'city_id' });
  City.hasMany(Partner, { as: 'partners', foreignKey: 'city_id' });
  ApplicantCompany.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(ApplicantCompany, { as: 'applicant_companies', foreignKey: 'company_id' });
  ApplicantFeedback.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(ApplicantFeedback, { as: 'applicant_feedbacks', foreignKey: 'company_id' });
  CompanyCustomization.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(CompanyCustomization, { as: 'company_customizations', foreignKey: 'company_id' });
  CompanyDepartment.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(CompanyDepartment, { as: 'company_departments', foreignKey: 'company_id' });
  CompanyDeployment.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(CompanyDeployment, { as: 'company_deployments', foreignKey: 'company_id' });
  CompanyIam.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(CompanyIam, { as: 'company_iams', foreignKey: 'company_id' });
  CompanyPlan.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(CompanyPlan, { as: 'company_plans', foreignKey: 'company_id' });
  Conversation.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(Conversation, { as: 'conversations', foreignKey: 'company_id' });
  DeploymentEvent.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(DeploymentEvent, { as: 'deployment_events', foreignKey: 'company_id' });
  Feedback.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(Feedback, { as: 'feedbacks', foreignKey: 'company_id' });
  JobFeedback.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(JobFeedback, { as: 'job_feedbacks', foreignKey: 'company_id' });
  Job.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(Job, { as: 'jobs', foreignKey: 'company_id' });
  Recruiter.belongsTo(Company, { as: 'company', foreignKey: 'company_id' });
  Company.hasMany(Recruiter, { as: 'recruiters', foreignKey: 'company_id' });
  Job.belongsTo(CompanyDepartment, { as: 'department', foreignKey: 'department_id' });
  CompanyDepartment.hasMany(Job, { as: 'jobs', foreignKey: 'department_id' });
  DeploymentEvent.belongsTo(CompanyDeployment, { as: 'deployment', foreignKey: 'deployment_id' });
  CompanyDeployment.hasMany(DeploymentEvent, {
    as: 'deployment_events',
    foreignKey: 'deployment_id',
  });
  Message.belongsTo(Conversation, { as: 'conversation', foreignKey: 'conversation_id' });
  Conversation.hasMany(Message, { as: 'messages', foreignKey: 'conversation_id' });
  ApplicantFeedback.belongsTo(JobApplication, {
    as: 'job_application',
    foreignKey: 'job_application_id',
  });
  JobApplication.hasMany(ApplicantFeedback, {
    as: 'applicant_feedbacks',
    foreignKey: 'job_application_id',
  });
  JobApplicationEvent.belongsTo(JobApplication, {
    as: 'job_application',
    foreignKey: 'job_application_id',
  });
  JobApplication.hasMany(JobApplicationEvent, {
    as: 'job_application_events',
    foreignKey: 'job_application_id',
  });
  JobApplicationNote.belongsTo(JobApplication, {
    as: 'job_application',
    foreignKey: 'job_application_id',
  });
  JobApplication.hasMany(JobApplicationNote, {
    as: 'job_application_notes',
    foreignKey: 'job_application_id',
  });
  JobRecruitersLike.belongsTo(JobApplication, {
    as: 'job_application',
    foreignKey: 'job_application_id',
  });
  JobApplication.hasMany(JobRecruitersLike, {
    as: 'job_recruiters_likes',
    foreignKey: 'job_application_id',
  });
  JobRecruitersStar.belongsTo(JobApplication, {
    as: 'job_application',
    foreignKey: 'job_application_id',
  });
  JobApplication.hasMany(JobRecruitersStar, {
    as: 'job_recruiters_stars',
    foreignKey: 'job_application_id',
  });
  StageApplicantEvaluatorsRemark.belongsTo(JobApplication, {
    as: 'job_application',
    foreignKey: 'job_application_id',
  });
  JobApplication.hasMany(StageApplicantEvaluatorsRemark, {
    as: 'stage_applicant_evaluators_remarks',
    foreignKey: 'job_application_id',
  });
  ApplicantFeedback.belongsTo(Job, { as: 'job', foreignKey: 'job_id' });
  Job.hasMany(ApplicantFeedback, { as: 'applicant_feedbacks', foreignKey: 'job_id' });
  JobApplication.belongsTo(Job, { as: 'job', foreignKey: 'job_id' });
  Job.hasMany(JobApplication, { as: 'job_applications', foreignKey: 'job_id' });
  JobFeedback.belongsTo(Job, { as: 'job', foreignKey: 'job_id' });
  Job.hasMany(JobFeedback, { as: 'job_feedbacks', foreignKey: 'job_id' });
  JobHardSkill.belongsTo(Job, { as: 'job', foreignKey: 'job_id' });
  Job.hasMany(JobHardSkill, { as: 'job_hard_skills', foreignKey: 'job_id' });
  JobRecruiter.belongsTo(Job, { as: 'job', foreignKey: 'job_id' });
  Job.hasMany(JobRecruiter, { as: 'job_recruiters', foreignKey: 'job_id' });
  JobSoftSkill.belongsTo(Job, { as: 'job', foreignKey: 'job_id' });
  Job.hasMany(JobSoftSkill, { as: 'job_soft_skills', foreignKey: 'job_id' });
  Stage.belongsTo(Job, { as: 'job', foreignKey: 'job_id' });
  Job.hasMany(Stage, { as: 'stages', foreignKey: 'job_id' });
  ResumeLanguage.belongsTo(Language, { as: 'language', foreignKey: 'language_id' });
  Language.hasMany(ResumeLanguage, { as: 'resume_languages', foreignKey: 'language_id' });
  ApplicantPartner.belongsTo(Partner, { as: 'partner', foreignKey: 'partner_id' });
  Partner.hasMany(ApplicantPartner, { as: 'applicant_partners', foreignKey: 'partner_id' });
  Company.belongsTo(Partner, { as: 'partner', foreignKey: 'partner_id' });
  Partner.hasMany(Company, { as: 'companies', foreignKey: 'partner_id' });
  PartnerCustomization.belongsTo(Partner, { as: 'partner', foreignKey: 'partner_id' });
  Partner.hasMany(PartnerCustomization, { as: 'partner_customizations', foreignKey: 'partner_id' });
  PartnerPlanSubscription.belongsTo(Partner, { as: 'partner', foreignKey: 'partner_id' });
  Partner.hasMany(PartnerPlanSubscription, {
    as: 'partner_plan_subscriptions',
    foreignKey: 'partner_id',
  });
  ApplicantFeedback.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(ApplicantFeedback, { as: 'applicant_feedbacks', foreignKey: 'recruiter_id' });
  Conversation.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(Conversation, { as: 'conversations', foreignKey: 'recruiter_id' });
  JobApplicationEvent.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(JobApplicationEvent, {
    as: 'job_application_events',
    foreignKey: 'recruiter_id',
  });
  JobApplicationNote.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(JobApplicationNote, {
    as: 'job_application_notes',
    foreignKey: 'recruiter_id',
  });
  JobFeedback.belongsTo(Recruiter, {
    as: 'action_triggered_by_recruiter',
    foreignKey: 'action_triggered_by_recruiter_id',
  });
  Recruiter.hasMany(JobFeedback, {
    as: 'job_feedbacks',
    foreignKey: 'action_triggered_by_recruiter_id',
  });
  JobRecruiter.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(JobRecruiter, { as: 'job_recruiters', foreignKey: 'recruiter_id' });
  JobRecruitersLike.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(JobRecruitersLike, { as: 'job_recruiters_likes', foreignKey: 'recruiter_id' });
  JobRecruitersStar.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(JobRecruitersStar, { as: 'job_recruiters_stars', foreignKey: 'recruiter_id' });
  Job.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(Job, { as: 'jobs', foreignKey: 'recruiter_id' });
  StageApplicantEvaluatorsRemark.belongsTo(Recruiter, {
    as: 'applicant',
    foreignKey: 'applicant_id',
  });
  Recruiter.hasMany(StageApplicantEvaluatorsRemark, {
    as: 'stage_applicant_evaluators_remarks',
    foreignKey: 'applicant_id',
  });
  StageRecruiter.belongsTo(Recruiter, { as: 'recruiter', foreignKey: 'recruiter_id' });
  Recruiter.hasMany(StageRecruiter, { as: 'stage_recruiters', foreignKey: 'recruiter_id' });
  JobApplicationEvent.belongsTo(Stage, { as: 'stage', foreignKey: 'stage_id' });
  Stage.hasMany(JobApplicationEvent, { as: 'job_application_events', foreignKey: 'stage_id' });
  JobApplication.belongsTo(Stage, { as: 'stage', foreignKey: 'stage_id' });
  Stage.hasMany(JobApplication, { as: 'job_applications', foreignKey: 'stage_id' });
  JobFeedback.belongsTo(Stage, { as: 'stage', foreignKey: 'stage_id' });
  Stage.hasMany(JobFeedback, { as: 'job_feedbacks', foreignKey: 'stage_id' });
  StageApplicantEvaluatorsRemark.belongsTo(Stage, { as: 'stage', foreignKey: 'stage_id' });
  Stage.hasMany(StageApplicantEvaluatorsRemark, {
    as: 'stage_applicant_evaluators_remarks',
    foreignKey: 'stage_id',
  });
  StageRecruiter.belongsTo(Stage, { as: 'stage', foreignKey: 'stage_id' });
  Stage.hasMany(StageRecruiter, { as: 'stage_recruiters', foreignKey: 'stage_id' });
  Applicant.belongsTo(State, { as: 'state', foreignKey: 'state_id' });
  State.hasMany(Applicant, { as: 'applicants', foreignKey: 'state_id' });
  City.belongsTo(State, { as: 'state', foreignKey: 'state_id' });
  State.hasMany(City, { as: 'cities', foreignKey: 'state_id' });
  Company.belongsTo(State, { as: 'state', foreignKey: 'state_id' });
  State.hasMany(Company, { as: 'companies', foreignKey: 'state_id' });
  Job.belongsTo(State, { as: 'state', foreignKey: 'state_id' });
  State.hasMany(Job, { as: 'jobs', foreignKey: 'state_id' });
  Partner.belongsTo(State, { as: 'state', foreignKey: 'state_id' });
  State.hasMany(Partner, { as: 'partners', foreignKey: 'state_id' });

  return {
    ApplicantCompany,
    ApplicantDesiredPosition,
    ApplicantFeedback,
    ApplicantPartner,
    Applicant,
    City,
    Company,
    CompanyCustomization,
    CompanyDepartment,
    CompanyDeployment,
    CompanyIam,
    CompanyPlan,
    Conversation,
    Currency,
    DeploymentEvent,
    Feedback,
    JobApplicationEvent,
    JobApplicationNote,
    JobApplication,
    JobFeedback,
    JobHardSkill,
    JobRecruiter,
    JobRecruitersLike,
    JobRecruitersStar,
    JobSoftSkill,
    Job,
    Language,
    Message,
    PartnerCustomization,
    PartnerPlanSubscription,
    PartnerUser,
    Partner,
    Plan,
    Recruiter,
    ResumeCertification,
    ResumeCourse,
    ResumeEducation,
    ResumeLanguage,
    ResumeSkill,
    ResumeWorkExperience,
    Role,
    StageApplicantEvaluatorsRemark,
    StageRecruiter,
    Stage,
    State,
    SysDepartment,
    SysFeedback,
    UploadedResume,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
