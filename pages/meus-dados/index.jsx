'use client';

import { FormBuilder, InputType, InputWidth } from '@/components/common/form_builder';
import CandidateHomeLayout from '@/components/dashboard/candidate_home_layout';
import { fetchApplicant } from '@/lib/services/server_side_props';
import { Notify } from '@/components/common/notification';
import { formatPhoneNumber } from '@/components/masks';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { api } from '@/lib/api';
import * as yup from 'yup';
import Cropper from 'react-easy-crop';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';

function FormUser({ user, photoPath }) {
  const inputRef = useRef(null);
  const [avatarPicImg, setAvatarPicImg] = useState(null);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const form = {
    firstName: {
      type: InputType.TEXT,
      label: 'Primeiro nome',
      labelStyle: 'font-semibold',
      width: InputWidth.FULL,
      value: user?.attributes['custom:first_name'] || '',
      validation: yup.string().required('Campo Obrigatório'),
      autoCompleteType: 'given-name',
      placeholderText: 'Digite seu nome',
    },
    lastName: {
      type: InputType.TEXT,
      label: 'Último nome',
      labelStyle: 'font-semibold',
      width: InputWidth.FULL,
      value: user?.attributes['custom:last_name'] || '',
      validation: yup.string().required('Campo Obrigatório'),
      autoCompleteType: 'family-name',
      placeholderText: 'Digite seu sobrenome',
    },
    phoneNumber: {
      type: InputType.TEXT,
      label: 'Telefone',
      labelStyle: 'font-semibold',
      width: InputWidth.FULL,
      value: formatPhoneNumber(user?.attributes.phone_number) || '',
      validation: yup
        .string()
        .required('Campo Obrigatório')
        .matches(
          /^(\(?\d{2}\)?\s?)(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
          'Por favor, digite um número de telefone válido.',
        ),
      autoCompleteType: 'tel',
      placeholderText: 'Formato: (66) 99999-9999',
    },
    email: {
      type: InputType.TEXT,
      label: 'E-mail',
      labelStyle: 'font-semibold',
      width: InputWidth.FULL,
      value: user?.attributes.email || '',
      disabled: true,
    },
  };

  const handleSave = async (e) => {
    setIsSaving(true);

    const cleanedInput = e?.phoneNumber.replace(/[\s()-]/g, '');
    const formattedPhoneNumber = `+55${cleanedInput}`;

    const formData = new FormData();
    formData.append('first_name', e?.firstName ?? '');
    formData.append('last_name', e?.lastName ?? '');
    formData.append('phone_number', formattedPhoneNumber ?? '');
    if (avatarPicImg) formData.append('file', avatarPicImg);

    try {
      await api.put('/update_user_attribute', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Notify.success('Dados atualizados com sucesso.');
      router.reload();
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Notify.error('Erro ao enviar dados');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-full overflow-x-hidden font-montserrat">
      <main>
        <div className="divide-y divide-white/5">
          <div className="flex flex-col items-center justify-center w-11/12 mx-auto">
            <h1 className="text-3xl font-bold">Meus Dados</h1>
            <div className="w-full max-w-2xl mt-6">
              <div className="flex flex-col items-center">
                <div className="flex md:flex-row flex-col w-screen max-w-[1300px] p-3 gap-5 mt-6">
                  <div className="flex-1">
                    <FormImage
                      ref={inputRef}
                      photoPath={photoPath}
                      setAvatarPicImg={setAvatarPicImg}
                    />
                    <FormBuilder
                      form={form}
                      cancel={false}
                      submitStyle="hover:scale-105 transition-all w-full bg-[#24EEA0] h-12 rounded-full font-bold text-lg disabled:opacity-40"
                      btnSubmitLabel="Salvar Alterações"
                      onSubmit={handleSave}
                    />
                  </div>
                  <div className="flex-1 md:mt-[76px]">
                    <FormUserPassword />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const FormImage = forwardRef(({ photoPath, setAvatarPicImg }, ref) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropAreaPixels, setCropAreaPixels] = useState(null);
  const fileInputRef = useRef(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImageSrc(reader.result);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCropAreaPixels(croppedAreaPixels);
  }, []);

  const applyCrop = async () => {
    if (!imageSrc || !cropAreaPixels) return;

    const image = document.createElement('img');
    image.src = imageSrc;

    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = cropAreaPixels.width;
    canvas.height = cropAreaPixels.height;
    ctx.drawImage(
      image,
      cropAreaPixels.x,
      cropAreaPixels.y,
      cropAreaPixels.width,
      cropAreaPixels.height,
      0,
      0,
      cropAreaPixels.width,
      cropAreaPixels.height,
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
        setAvatarPicImg(file); // Set the cropped image file
        setCroppedImage(URL.createObjectURL(blob));
      }
    }, 'image/jpeg');

    setImageSrc(null);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={fileInputRef}
        onChange={onFileChange}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />
      {imageSrc ? (
        <div className="relative w-72 h-72">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <button
            onClick={applyCrop}
            className="absolute px-4 py-2 text-white transform -translate-x-1/2 bg-blue-500 rounded-md bottom-2 left-1/2"
          >
            Confirmar
          </button>
        </div>
      ) : (
        <div className="relative mb-2 group" onClick={() => fileInputRef.current.click()}>
          {croppedImage || photoPath ? (
            <Image
              src={
                croppedImage ||
                photoPath ||
                'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740' ||
                '/placeholder.svg' ||
                '/placeholder.svg'
              }
              alt="Avatar"
              width={176}
              height={176}
              className="rounded-lg"
            />
          ) : (
            <UserCircleIcon className="w-[176px] h-[176px] text-sm rounded-lg text-gray-500 " />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100">
            <span className="px-4 py-2 text-sm font-semibold text-white bg-primary/40">
              Escolher imagem
            </span>
          </div>
        </div>
      )}
      <p className="font-semibold text-center">Foto de perfil</p>
    </div>
  );
});

FormImage.displayName = 'FormImage';

function FormUserPassword() {
  const form = {
    new_password: {
      type: InputType.PASSWORD,
      label: 'Nova senha',
      labelStyle: 'font-semibold',
      width: InputWidth.FULL,
      validation: yup
        .string()
        .required('Campo Obrigatório')
        .min(8, 'A nova senha deve ter pelo menos 8 caracteres'),
    },
    confirm_password: {
      type: InputType.PASSWORD,
      label: 'Confirmar nova senha',
      labelStyle: 'font-semibold',
      width: InputWidth.FULL,
      validation: yup
        .string()
        .oneOf([yup.ref('new_password'), null], 'As senhas devem ser iguais')
        .required('Campo Obrigatório'),
    },
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append('password', e.new_password ?? '');

    api
      .put('/update_password', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (!String(res.status).startsWith('2')) throw 'Status inexperado';
        Notify.success('Senha atualizada com sucesso');
      })
      .catch((e) => {
        console.error('Não foi possivel atualizar a senha: ', e.message);
        Notify.error('Erro ao tentar atualizar senha');
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mt-10">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-3xl font-bold">Alterar senha</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Atualize a senha associada a sua conta.
          </p>
        </div>

        <div className="w-full mt-6">
          <FormBuilder
            form={form}
            cancel={false}
            className=""
            submitStyle={
              'hover:scale-105 transition-all duration-500 w-full bg-[#24EEA0] h-12 rounded-full font-bold text-lg disabled:opacity-40'
            }
            btnSubmitLabel={'Alterar Senha'}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default function ConfingNewAccount({ applicant }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        if (user && user?.challengeName === undefined) {
          const userInfo = await Auth.currentUserInfo();
          setUser(userInfo);
          return;
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CandidateHomeLayout applicant={applicant}>
      {user && <FormUser user={user} photoPath={applicant?.f_photo?.url} />}
    </CandidateHomeLayout>
  );
}

export async function getServerSideProps({ req }) {
  const applicant = await fetchApplicant(req);
  const redirectUrl = `?redirect=${encodeURIComponent(req.url)}`;
  if (applicant == null) {
    return {
      redirect: {
        destination: `/auth/signin${redirectUrl}`,
        permanent: false,
      },
    };
  }

  if (applicant?.error) {
    if (applicant.error === 'UserNotFoundException')
      return {
        redirect: {
          destination: `/auth/signin${redirectUrl}`,
          permanent: false,
        },
      };
    return {
      redirect: {
        destination: `/auth/signup/confirm${redirectUrl}`,
        permanent: false,
      },
    };
  }

  const { position_title, about, uploaded_resume } = applicant;
  if (position_title === '' || about === '' || !uploaded_resume || !uploaded_resume.url) {
    return {
      redirect: {
        destination: `/auth/signup/info${redirectUrl}`,
        permanent: false,
      },
    };
  }

  return { props: { applicant } };
}
