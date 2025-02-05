import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import FileIcon from '@/images/icons/FileIcon';
import { Notify } from '@/components/common/notification';

const SchemaStepThree = yup.object({
  about: yup.string().required('Esse campo não pode ficar em branco'),
  position_title: yup.string().required('Esse campo não pode ficar em branco'),
  resume: yup.mixed().required('O currículo é obrigatório'),
});

export default function SignupInfoView({ position_title, about, uploaded_resume }) {
  const [fileName, setFileName] = useState('');
  const [mobileFile, setMobileFile] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SchemaStepThree),
    defaultValues: {
      position_title,
      about,
    },
  });

  useEffect(() => {
    register('resume', { required: 'O currículo é obrigatório' });
  }, [register]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setValue('resume', file, { shouldValidate: true });
    setFileName(file.name);
  };

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMobileFile(file);
    setValue('resume', file.name, { shouldValidate: true });
    setFileName(file.name);
  };

  const onSubmit = async ({ resume, position_title, about }) => {
    console.log('Arquivo enviado:', resume);
    if (!resume && !mobileFile) {
      Notify.error('Erro: Nenhum arquivo anexado!');
      return;
    }

    const formDataPdf = new FormData();
    if (mobileFile) {
      formDataPdf.append('file', mobileFile);
    } else {
      formDataPdf.append('file', resume);
    }

    await axios.post('/api/applicant/profile-about', { position_title, about });

    try {
      await axios.post('/api/applicant/profile-resume', formDataPdf, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      router.push('/');
    } catch (err) {
      Notify.error('Erro ao enviar o curriculo');
      console.error('Error details:', err.response?.data || err.message);
      Notify.error('Erro ao enviar currículo: ' + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    if (uploaded_resume?.url) {
      axios({
        url: uploaded_resume.url,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const file = new File([response.data], uploaded_resume.name, {
          type: 'application/pdf',
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

      <form className="flex flex-col gap-2 px-4 mt-3 font-montserrat" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-base font-semibold" htmlFor="position_title">
            Posição Atual: <span className="text-red-600">*</span>
          </label>
          <input
            {...register('position_title')}
            placeholder="Ex: Engenheiro Agrícola"
            className="block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p className="h-5 text-xs text-red-600">{errors.position_title?.message}</p>
        </div>

        <div>
          <label className="text-base font-semibold" htmlFor="about">
            Sobre Você:
          </label>
          <textarea
            {...register('about')}
            placeholder="Digite aqui informações úteis que podem ajudar na sua contratação."
            className="block w-full mt-1 text-base border-gray-300 rounded-md shadow-sm resize-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={5}
          />
          <p className="h-5 text-xs text-red-600">{errors.about?.message}</p>
        </div>

        <div>
          <label className="text-base font-semibold">
            Anexar Currículo em PDF <span className="text-red-600">*</span>
          </label>

          {/* Dropzone para Desktop */}
          <Dropzone accept={{ 'application/pdf': [] }} multiple={false} onDrop={onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`relative flex flex-col items-center w-full p-4 border border-dashed shadow-lg rounded-[20px] mx-auto ${
                  isDragActive ? 'bg-[#C2B54126] scale-105' : ''
                }`}
              >
                <FileIcon />
                {fileName ? (
                  <p className="max-w-full text-sm text-green-600 truncate">
                    Arquivo anexado: <strong>{fileName}</strong>
                  </p>
                ) : (
                  <span className="font-helvetica cursor-pointer text-[#195579] underline">
                    Toque ou arraste um arquivo aqui
                  </span>
                )}
                <input {...getInputProps()} accept="application/pdf" />
              </div>
            )}
          </Dropzone>

          {/* Input normal para Mobile */}
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            id="fileUpload"
            onChange={onFileSelect}
          />
          <label
            htmlFor="fileUpload"
            className="mt-2 block w-full text-center text-sm font-semibold cursor-pointer text-[#195579] underline"
          >
            Ou clique aqui para selecionar um arquivo
          </label>

          <p className="h-5 text-xs text-red-600">{errors.resume?.message}</p>
        </div>

        <button className="hover:scale-110 transition-all duration-500 mt-4 bg-[#24EEA0] h-12 rounded-full font-bold text-base mb-10">
          Finalizar Cadastro
        </button>
      </form>
    </div>
  );
}
