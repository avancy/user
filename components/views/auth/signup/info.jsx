import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import FileIcon from '@/images/icons/FileIcon';

const SchemaStepTheree = yup.object({
  about: yup.string().required('Esse campo não pode ficar em branco'),
  position_title: yup.string().required('Esse campo não pode ficar em branco'),
  resume: yup.mixed().required('O currículo é obrigatório'),
});

export default function SignupInfoView({ position_title, about, uploaded_resume }) {
  const [fileName, setFileName] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SchemaStepTheree),
    defaultValues: {
      position_title,
      about,
    },
  });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setValue('resume', file);
    setFileName(file.name);
  };

  const onSubmit = async ({ resume, position_title, about }) => {
    const formDataPdf = new FormData();
    formDataPdf.append('file', resume);
    console.log(resume);

    await axios.post('/api/applicant/profile-about', {
      position_title,
      about,
    });

    try {
      await axios.post('/api/applicant/profile-resume', formDataPdf, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.log(err);
    }

    router.push('/');
  };

  useEffect(() => {
    if (uploaded_resume?.url) {
      axios({
        url: uploaded_resume.url,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const file = new File([response.data], uploaded_resume.name, {
          contentType: 'application/pdf',
        });

        setValue('resume', file);
        setFileName(uploaded_resume.key);
      });
    }
  }, [uploaded_resume]);

  return (
    <div className="max-w-[787px]">
      <div className="flex flex-col items-center justify-center gap-3 font-montserrat">
        <h2 className="text-2xl font-bold text-center md:text-5xl">
          Só mais um passo antes de achar a vaga ideal.
        </h2>
        <h3 className="font-normal text-center md:text-lg md:text-left md:w-full">
          Preencha os dados do seu CV para que você possa candidatar-se às nossas vagas!
        </h3>
      </div>

      <form
        className="flex flex-col gap-2 px-4 mt-3 font-montserrat"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="text-base font-semibold" htmlFor="position_title">
            Posição Atual: <span className="text-red-600">*</span>
          </label>
          <input
            {...register('position_title')}
            onChange={(e) => setValue('position_title', e.target.value)}
            placeholder="Ex: Engenheiro Agrícola"
            className="block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
          />
          <p className="h-5 text-xs text-red-600">{errors.position_title?.message}</p>
        </div>

        <div>
          <label className="text-base font-semibold" htmlFor="about">
            Sobre Você:
          </label>
          <textarea
            {...register('about')}
            onChange={(e) => setValue('about', e.target.value)}
            placeholder="Digite aqui informações úteis que podem ajudar na sua contratação."
            className="block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm resize-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
            rows={5}
          />
          <p className="h-5 text-xs text-red-600">{errors.about?.message}</p>
        </div>

        <div>
          <label className="text-base font-semibold">
            Anexar Currículo em PDF <span className="text-red-600">*</span>
          </label>

          <Dropzone accept={'application/pdf'} multiple={false} onDrop={onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`relative flex hover:scale-105 duration-500 transition-all flex-col justify-between items-center w-full max-w-[320px] md:max-w-none lg:max-w-none h-auto p-4 border border-dashed shadow-lg rounded-[20px] mx-auto ${
                  isDragActive && 'bg-[#C2B54126] scale-105 duration-500 transition-all'
                }`}
              >
                <div className="flex flex-col items-center justify-center w-full gap-2">
                  <FileIcon />

                  {fileName ? (
                    <p className="max-w-full text-sm text-green-600 truncate">
                      Arquivo anexado: <strong>{fileName}</strong>
                    </p>
                  ) : (
                    <span className="font-helvetica cursor-pointer text-[#195579] underline">
                      Anexar arquivo
                    </span>
                  )}
                </div>

                <input {...getInputProps()} accept="application/pdf" />
              </div>
            )}
          </Dropzone>

          <p className="h-5 text-xs text-red-600">{errors.resume?.message}</p>
        </div>

        <button className="hover:scale-110 transition-all duration-500 mt-4 bg-[#24EEA0] h-12 rounded-full font-bold text-base mb-10">
          Finalizar Cadastro
        </button>
      </form>
    </div>
  );
}
