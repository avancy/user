import { jsonFetcher } from '@/lib/util';
import { MyDropzone } from '../../../dropzone-wrapper/my_dropzone';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import {
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
  BriefcaseIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { FormBuilder, InputType, InputWidth } from '../../../common/form_builder';
import * as yup from 'yup';
import { api } from '@/lib/api';
import { set } from 'react-hook-form';

function newWorkExperience() {
  return {
    id: undefined,
    job_title: '',
    company: '',
    location: '',
    workplace_policy: '',
    hiring_policy: '',
    start_date_month: '',
    start_date_year: '',
    end_date_month: '',
    end_date_year: '',
    description: '',
  };
}

function newEducation() {
  return {
    id: undefined,
    institution: '',
    degree: '',
    field_of_study: '',
    currently_studying_here: false,
    start_date_month: '',
    start_date_year: '',
    end_date_month: '',
    end_date_year: '',
    description: '',
  };
}

export function ProfessionalProfileResumeForm({ getUserUpdate }) {
  const [resume, setResume] = useState({});

  const fetchResume = async () => {
    try {
      const res = await api.get(`/resume`);
      setResume(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  return (
    <div className="p-8 bg-gray-50">
      <div className="w-full space-y-10 divide-y divide-gray-900/10">
        <WorkExperience resume={resume} getUserUpdate={getUserUpdate} />
        <Education resume={resume} getUserUpdate={getUserUpdate} />
      </div>
    </div>
  );
}

export function WorkExperience({ resume, getUserUpdate }) {
  const [workExperience, setWorkExperience] = useState([]);
  const [workExperienceEditMode, setWorkExperienceEditMode] = useState([]);
  const [workExperienceLoading, setWorkExperienceLoading] = useState([]);

  const removeWorkExperience = async (id, index) => {
    if (id && id != '') {
      try {
        getUserUpdate(true);
        await api.delete(`/resume/workexperience/${id}`);
      } catch (error) {
        console.error(error);
        return;
      } finally {
        getUserUpdate(false);
      }
    }

    setWorkExperience(workExperience.filter((_, i) => i !== index));
    setWorkExperienceEditMode(workExperienceEditMode.filter((_, i) => i !== index));
    setWorkExperienceLoading(workExperienceLoading.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (resume?.resume_experiences && Array.isArray(resume?.resume_experiences)) {
      setWorkExperience(resume?.resume_experiences);
      setWorkExperienceEditMode(
        Array.from({ length: resume?.resume_experiences.length }, () => false),
      );
      setWorkExperienceLoading(
        Array.from({ length: resume?.resume_experiences.length }, () => false),
      );
    } else {
      setWorkExperience([]);
      setWorkExperienceEditMode([]);
      setWorkExperienceLoading([]);
    }
  }, [resume]);

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, newWorkExperience()]);
    setWorkExperienceEditMode([...workExperienceEditMode, true]);
    setWorkExperienceLoading([...workExperienceLoading, false]);
  };

  const editWorkExperience = (index) => {
    setWorkExperienceEditMode(workExperienceEditMode.map((item, i) => (i === index ? true : item)));
  };

  const submitWorkExperience = async (index, data) => {
    try {
      getUserUpdate(true);
      let workExperienceData = data;

      workExperienceData.currently_working_here = data.currently_working_here === 'true';
      workExperienceData.start_date = new Date(data.start_date_year, data.start_date_month - 1, 1);
      workExperienceData.end_date = new Date(data.end_date_year, data.end_date_month - 1, 1);

      setWorkExperienceLoading(workExperienceLoading.map((v, i) => (i === index ? true : v)));
      let res;
      if (workExperienceData?.id && workExperienceData?.id != '') {
        res = await api.put(`/resume/workexperience`, workExperienceData);
      } else {
        res = await api.post(`/resume/workexperience`, workExperienceData);
      }
      setWorkExperienceLoading(workExperienceLoading.map((v, i) => (i === index ? false : v)));

      setWorkExperience(workExperience.map((item, i) => (i === index ? res.data : item)));
      setWorkExperienceEditMode(
        workExperienceEditMode.map((item, i) => (i === index ? false : item)),
      );
    } catch (error) {
      console.error(error);
    } finally {
      getUserUpdate(false);
    }
  };
  const cancelWorkExperienceEdit = (index) => {
    if (workExperience[index]?.id) {
      setWorkExperienceEditMode(
        workExperienceEditMode.map((item, i) => (i === index ? false : item)),
      );
    } else {
      setWorkExperience(workExperience.filter((_, i) => i !== index));
      setWorkExperienceEditMode(workExperienceEditMode.filter((_, i) => i !== index));
      setWorkExperienceLoading(workExperienceLoading.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Experiências Profissionais
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Empresas, projetos, estágios.</p>
      </div>

      {workExperience.map((item, index) => (
        <div
          key={index}
          className="relative bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2 "
        >
          <div className="absolute z-50 flex justify-end space-x-2 top-2 right-2">
            {item?.id && (
              <button
                type="button"
                onClick={() => editWorkExperience(index)}
                disabled={workExperienceLoading[index] || workExperienceEditMode[index]}
                className="p-2 text-white rounded-full disabled:opacity-40 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PencilSquareIcon className="w-5 h-5 text-blue-400" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              onClick={() => removeWorkExperience(item?.id, index)}
              className="p-2 text-white rounded-full hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <TrashIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
            </button>
          </div>

          <div className="px-4 py-2">
            {workExperienceEditMode[index] ? (
              <WorkExperienceForm
                workExperienceData={item}
                onCancel={() => cancelWorkExperienceEdit(index)}
                onSubmit={(data) =>
                  submitWorkExperience(index, {
                    id: item?.id,
                    applicant_id: item?.applicant_id,
                    ...data,
                  })
                }
              />
            ) : (
              <ViewWorkExperience workExperienceData={item}></ViewWorkExperience>
            )}
          </div>
        </div>
      ))}

      <div className="relative bg-white sm:rounded-xl md:col-span-2 md:col-start-2">
        <ButtonAdd
          label={'Adicionar nova experiência de trabalho'}
          onClick={() => addWorkExperience()}
        >
          <BriefcaseIcon className="w-12 h-12 mx-auto text-gray-400" aria-hidden="true" />
        </ButtonAdd>
      </div>
    </div>
  );
}

export function Education({ resume, getUserUpdate }) {
  const [education, setEducation] = useState([]);
  const [educationEditMode, setEducationEditMode] = useState([]);
  const [educationLoading, setEducationLoading] = useState([]);

  const removeEducation = async (id, index) => {
    if (id && id != '') {
      try {
        getUserUpdate(true);
        await api.delete(`/resume/education/${id}`);
      } catch (error) {
        console.error(error);
        return;
      } finally {
        getUserUpdate(false);
      }
    }

    setEducation(education.filter((_, i) => i !== index));
    setEducationEditMode(educationEditMode.filter((_, i) => i !== index));
    setEducationLoading(educationLoading.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (resume?.resume_educations && Array.isArray(resume?.resume_educations)) {
      setEducation(resume?.resume_educations);
      setEducationEditMode(Array.from({ length: resume?.resume_educations.length }, () => false));
      setEducationLoading(Array.from({ length: resume?.resume_educations.length }, () => false));
    } else {
      setEducation([]);
      setEducationEditMode([]);
      setEducationLoading([]);
    }
  }, [resume]);

  const addEducation = () => {
    setEducation([...education, newEducation()]);
    setEducationEditMode([...educationEditMode, true]);
    setEducationLoading([...educationLoading, false]);
  };

  const cancelEducationEdit = (index) => {
    if (education[index]?.id) {
      setEducationEditMode(educationEditMode.map((item, i) => (i === index ? false : item)));
    } else {
      setEducation(education.filter((_, i) => i !== index));
      setEducationEditMode(educationEditMode.filter((_, i) => i !== index));
      setEducationLoading(educationLoading.filter((_, i) => i !== index));
    }
  };

  const editEducation = (index) => {
    setEducationEditMode(educationEditMode.map((item, i) => (i === index ? true : item)));
  };

  const submitEducation = async (index, data) => {
    try {
      getUserUpdate(true);
      let educationData = data;

      educationData.currently_studying_here = data.currently_studying_here === 'true';
      educationData.start_date = new Date(data.start_date_year, data.start_date_month - 1, 1);
      educationData.end_date = new Date(data.end_date_year, data.end_date_month - 1, 1);

      setEducationLoading(educationLoading.map((v, i) => (i === index ? true : v)));
      let res;
      if (educationData?.id && educationData?.id != '') {
        res = await api.put(`/resume/education`, educationData);
      } else {
        res = await api.post(`/resume/education`, educationData);
      }
      setEducationLoading(educationLoading.map((v, i) => (i === index ? false : v)));

      setEducation(education.map((item, i) => (i === index ? res.data : item)));
      setEducationEditMode(educationEditMode.map((item, i) => (i === index ? false : item)));
    } catch (error) {
      console.error(error);
    } finally {
      getUserUpdate(false);
    }
  };

  return (
    <div className="grid grid-cols-1 pt-10 gap-x-8 gap-y-8 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Educação</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Graduação / Pós-Graduação, Cursos Técnicos
        </p>
      </div>

      {education.map((item, index) => (
        <div
          key={index}
          className="relative bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2 "
        >
          <div className="absolute z-50 flex justify-end space-x-2 top-2 right-2">
            {item?.id && (
              <button
                type="button"
                onClick={() => editEducation(index)}
                disabled={educationLoading[index] || educationEditMode[index]}
                className="p-2 text-white rounded-full disabled:opacity-40 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PencilSquareIcon className="w-5 h-5 text-blue-400" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              onClick={() => removeEducation(item?.id, index)}
              className="p-2 text-white rounded-full hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <TrashIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
            </button>
          </div>

          <div className="px-4 py-2">
            {educationEditMode[index] ? (
              <EducationForm
                educationData={item}
                onCancel={() => cancelEducationEdit(index)}
                onSubmit={(data) =>
                  submitEducation(index, {
                    id: item?.id,
                    applicant_id: item?.applicant_id,
                    ...data,
                  })
                }
              />
            ) : (
              <ViewEducation educationData={item} key={index} />
            )}
          </div>
        </div>
      ))}

      <div className="relative bg-white sm:rounded-xl md:col-span-2 md:col-start-2">
        <ButtonAdd label={'Adicionar novo Curso'} onClick={() => addEducation()}>
          <AcademicCapIcon className="w-12 h-12 mx-auto text-gray-400" aria-hidden="true" />
        </ButtonAdd>
      </div>
    </div>
  );
}

function WorkExperienceForm({ onCancel, onSubmit, loading, formLoading, workExperienceData }) {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(100), (_, index) => year - index);
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const [hiddenInputs, setHiddenInputs] = useState([]);

  useEffect(() => {
    if (workExperienceData?.currently_working_here) {
      setHiddenInputs(['end_date_month', 'end_date_year']);
    }
  }, [workExperienceData]);

  const form = {
    job_title: {
      type: InputType.TEXT,
      label: 'Cargo',
      tip: 'Ex.: Gerente de Projetos',
      width: InputWidth.FULL,
      value: workExperienceData?.job_title ?? '',
      mask: '',
      validation: yup.string().required('Campo Obrigatório'),
    },
    company: {
      type: InputType.TEXT,
      label: 'Empresa',
      tip: '',
      width: InputWidth.FULL,
      value: workExperienceData?.company ?? '',
      mask: '',
      validation: yup.string().required('Campo Obrigatório'),
    },
    location: {
      type: InputType.TEXT,
      label: 'Local',
      tip: 'Ex.: Sao Paulo - SP',
      width: InputWidth.FULL,
      value: workExperienceData?.location ?? '',
      mask: '',
      validation: yup.string(),
    },
    workplace_policy: {
      type: InputType.SELECT,
      label: 'Modo de Trabalho',
      tip: '',
      width: InputWidth.HALF,
      value: workExperienceData?.workplace_policy ?? '',
      validation: yup.string(),
      onChange: () => {},
      options: [
        { value: 'PRESENCIAL', label: 'Presencial' },
        { value: 'REMOTO', label: 'Remoto' },
        { value: 'HIBRIDO', label: 'Híbrido' },
      ],
    },
    hiring_policy: {
      type: InputType.SELECT,
      label: 'Contrato de Trabalho',
      tip: '',
      width: InputWidth.HALF,
      value: workExperienceData?.hiring_policy ?? '',
      validation: yup.string(),
      onChange: () => {},
      options: [
        { value: 'CLT', label: 'CLT' },
        { value: 'PJ', label: 'PJ' },
        { value: 'ESTAGIO', label: 'Estágio' },
        { value: 'TRAINEE', label: 'Trainee' },
        { value: 'OUTROS', label: 'Outros' },
      ],
    },
    currently_working_here: {
      type: InputType.CHECKBOX,
      label: 'Ainda trabalho aqui',
      tip: '',
      width: InputWidth.FULL,
      value: workExperienceData?.currently_working_here ?? false,
      validation: yup.string(),
      onChange: (value) => {
        value ? setHiddenInputs(['end_date_month', 'end_date_year']) : setHiddenInputs([]);
      },
    },
    start_date_month: {
      type: InputType.SELECT,
      label: 'Mes de Início',
      tip: '',
      width: InputWidth.ONE_FOURTH,
      value: workExperienceData?.start_date
        ? new Date(workExperienceData?.start_date).getMonth() + 1
        : '',
      validation: yup.string(),
      onChange: () => {},
      options: months.map((month, index) => ({
        value: index + 1,
        label: month,
      })),
    },
    start_date_year: {
      type: InputType.SELECT,
      label: 'Ano de Inicio',
      tip: '',
      width: InputWidth.ONE_FOURTH,
      value: workExperienceData?.start_date
        ? new Date(workExperienceData?.start_date).getFullYear()
        : '',
      validation: yup.string(),
      onChange: () => {},
      options: years.map((year) => ({ value: year, label: year })),
    },
    end_date_month: {
      type: InputType.SELECT,
      label: 'Mes de Término',
      tip: '',
      width: InputWidth.ONE_FOURTH,
      value: workExperienceData?.end_date
        ? new Date(workExperienceData?.end_date).getMonth() + 1
        : '',
      validation: yup.string(),
      onChange: () => {},
      options: months.map((month, index) => ({
        value: index + 1,
        label: month,
      })),
    },
    end_date_year: {
      type: InputType.SELECT,
      label: 'Ano de Término',
      tip: '',
      width: InputWidth.ONE_FOURTH,
      value: workExperienceData?.end_date
        ? new Date(workExperienceData?.end_date).getFullYear()
        : '',
      validation: yup.string(),
      onChange: () => {},
      options: years.map((year) => ({ value: year, label: year })),
    },
    description: {
      type: InputType.TEXTAREA,
      label: 'Descrição',
      tip: ' ',
      width: InputWidth.FULL,
      value: workExperienceData?.description ?? '',
      mask: '',
      validation: yup.string(),
      rows: 4,
    },
  };

  return (
    <div className="relative min-h-full px-4 py-4 ">
      <div className="min-h-full px-4 py-4 bg-white rounded-md sm:p-4">
        <FormBuilder
          form={form}
          onSubmit={(data) => onSubmit && typeof onSubmit === 'function' && onSubmit(data)}
          onCancel={onCancel}
          hiddenInputs={hiddenInputs}
        />
      </div>

      {(loading || formLoading) && (
        <div className="absolute top-0 z-50 flex flex-col items-center justify-center w-full h-full bg-white opacity-80">
          <LoadingText />
        </div>
      )}
    </div>
  );
}

function EducationForm({ onCancel, onSubmit, loading, formLoading, educationData }) {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(100), (_, index) => year - index);
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const [hiddenInputs, setHiddenInputs] = useState([]);

  useEffect(() => {
    if (educationData?.currently_studying_here) {
      setHiddenInputs(['end_date_month', 'end_date_year']);
    }
  }, [educationData]);

  const form = {
    institution: {
      type: InputType.TEXT,
      label: 'Instituição',
      tip: '',
      width: InputWidth.FULL,
      value: educationData?.institution ?? '',
      mask: '',
      validation: yup.string().required('Campo Obrigatório'),
    },
    degree: {
      type: InputType.TEXT,
      label: 'Grau',
      tip: 'Curso Técnico, Bacharelado, Mestrado, Doutorado, etc.',
      width: InputWidth.FULL,
      value: educationData?.degree ?? '',
      mask: '',
      validation: yup.string(),
    },
    field_of_study: {
      type: InputType.TEXT,
      label: 'Área de Estudo / Curso',
      tip: 'Ciência da Computação, Engenharia Elétrica, etc.',
      width: InputWidth.FULL,
      value: educationData?.field_of_study ?? '',
      mask: '',
      validation: yup.string(),
    },
    currently_studying_here: {
      type: InputType.CHECKBOX,
      label: 'Ainda estudo aqui',
      tip: '',
      width: InputWidth.FULL,
      value: educationData?.currently_studying_here ?? false,
      validation: yup.string(),
      onChange: (value) => {
        value ? setHiddenInputs(['end_date_month', 'end_date_year']) : setHiddenInputs([]);
      },
    },
    start_date_month: {
      type: InputType.SELECT,
      label: 'Mês de Início',
      tip: '',
      width: InputWidth.ONE_FOURTH,
      value: educationData?.start_date ? new Date(educationData?.start_date).getMonth() + 1 : '',
      validation: yup.string(),
      onChange: () => {},
      options: months.map((month, index) => ({
        value: index + 1,
        label: month,
      })),
    },
    start_date_year: {
      type: InputType.SELECT,
      label: 'Ano de Inicio',
      tip: '',
      width: InputWidth.ONE_FOURTH,
      value: educationData?.start_date ? new Date(educationData?.start_date).getFullYear() : '',
      validation: yup.string(),
      onChange: () => {},
      options: years.map((year) => ({ value: year, label: year })),
    },
    end_date_month: {
      type: InputType.SELECT,
      label: 'Mês de Término',
      tip: '',
      width: InputWidth.ONE_FOURTH,
      value: educationData?.end_date ? new Date(educationData?.end_date).getMonth() + 1 : '',
      validation: yup.string(),
      onChange: () => {},
      options: months.map((month, index) => ({
        value: index + 1,
        label: month,
      })),
    },
    end_date_year: {
      type: InputType.SELECT,
      label: 'Ano de Término',
      tip: '',
      width: InputWidth.ONE_FOURTH,
      value: educationData?.end_date ? new Date(educationData?.end_date).getFullYear() : '',
      validation: yup.string(),
      onChange: () => {},
      options: years.map((year) => ({ value: year, label: year })),
    },
    description: {
      type: InputType.TEXTAREA,
      label: 'Descrição',
      tip: ' ',
      width: InputWidth.FULL,
      value: educationData?.description ?? '',
      mask: '',
      validation: yup.string(),
      rows: 3,
    },
  };

  return (
    <div className="relative min-h-full px-4 py-4 ">
      <div className="min-h-full px-4 py-4 bg-white rounded-md sm:p-4">
        <FormBuilder
          form={form}
          onSubmit={(data) => onSubmit && typeof onSubmit === 'function' && onSubmit(data)}
          onCancel={onCancel}
          hiddenInputs={hiddenInputs}
        />
      </div>

      {(loading || formLoading) && (
        <div className="absolute top-0 z-50 flex flex-col items-center justify-center w-full h-full bg-white opacity-80">
          <LoadingText />
        </div>
      )}
    </div>
  );
}

function ButtonAdd({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={() => typeof onClick === 'function' && onClick()}
      className="relative block w-full p-4 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
      <span className="block mt-2 text-sm font-semibold text-gray-900">{label}</span>
    </button>
  );
}

function ViewWorkExperience({ workExperienceData }) {
  return (
    <div className="overflow-hidden bg-white sm:rounded-lg">
      <div className="border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Posição</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {workExperienceData?.job_title}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Empresa</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {workExperienceData?.company}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Local</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {workExperienceData?.location}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Modo de Contratação</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {workExperienceData?.hiring_policy}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Modo de Trabalho</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {workExperienceData?.workplace_policy}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Início</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {workExperienceData?.start_date}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Término</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {workExperienceData?.end_date}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Descrição</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {workExperienceData?.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ViewEducation({ educationData }) {
  return (
    <div className="overflow-hidden bg-white sm:rounded-lg">
      <div className="border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Instituição</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {educationData?.institution}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Grau</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {educationData?.degree}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Campo de Estudo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {educationData?.field_of_study}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Ainda estuda aqui?</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {educationData?.currently_studying_here ? 'Sim' : 'Não'}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Início</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {educationData?.start_date}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Término</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {educationData?.end_date}
            </dd>
          </div>
          <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
            <dt className="text-sm font-medium text-gray-900">Descrição</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {educationData?.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
