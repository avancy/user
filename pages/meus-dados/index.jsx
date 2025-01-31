import { FormBuilder, InputType, InputWidth } from '@/components/common/form_builder';
import CandidateHomeLayout from '@/components/dashboard/candidate_home_layout';
import { Notify } from '@/components/common/notification';
import { formatPhoneNumber } from '@/components/masks';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { api } from '@/lib/api';
import * as yup from 'yup';
import {
  fetchApplicant,
  fetchCompanyCustomization,
  fetchCompanyIdByHost,
  getHost,
} from '@/lib/services/server_side_props';

function FormUser({ user, photoPath }) {
  const inputRef = useRef(null);
  const [avatarPicImg, setAvatarPicImg] = useState(null);
  const router = useRouter();

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

  const [isSaving, setIsSaving] = useState(false);

  const handleChangeClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      Notify.error('Por favor, selecione uma imagem válida.');
      return;
    }

    setAvatarPicImg(file);
  };

  const handleSave = async (e) => {
    setIsSaving(true);

    const cleanedInput = e?.phoneNumber.replace(/[\s()-]/g, '');
    const formattedPhoneNumber = `+55${cleanedInput}`;

    const formData = new FormData();
    formData.append('first_name', e?.firstName ?? '');
    formData.append('last_name', e?.lastName ?? '');
    formData.append('phone_number', formattedPhoneNumber ?? '');
    formData.append('file', avatarPicImg ?? null);

    try {
      const response = await api.put('/update_user_attribute', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    <div className="font-montserrat">
      <main>
        <div className="divide-y divide-white/5">
          <div className="flex flex-col items-center justify-center w-11/12 mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-3xl font-bold font-montserrat">Meus Dados</h1>
            </div>

            <div className="w-full max-w-2xl mt-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative flex items-center gap-x-8">
                  <div className="relative group">
                    <input
                      ref={inputRef}
                      onChange={handleAvatarChange}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      className="hidden"
                    />
                    {avatarPicImg ? (
                      <img
                        src={URL.createObjectURL(avatarPicImg)}
                        alt="Avatar"
                        className="flex-none object-cover rounded-lg w-44 h-44"
                      />
                    ) : (
                      <img
                        src={`${photoPath ? photoPath : 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1695652429~exp=1695653029~hmac=66ece5ea16c8571b1e89676eec2d964bc8aa2c4054aa2a543c92ec2c54f098b9'}`}
                        alt="Avatar"
                        className="flex-none object-cover bg-gray-800 rounded-lg w-44 h-44"
                      />
                    )}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-100 cursor-pointer group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                      onClick={handleChangeClick}
                    >
                      <span className="px-4 py-2 text-sm font-semibold text-center text-white rounded-4xl bg-primary/40">
                        Escolher imagem
                      </span>
                      <span className="px-4 py-2 text-sm font-semibold text-center text-white rounded-4xl">
                        JPG, PNG.
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-semibold text-center">Foto de perfil</p>

                <div className="w-full max-w-2xl mt-6">
                  <FormBuilder
                    form={form}
                    cancel={false}
                    className=""
                    submitStyle={
                      'hover:scale-105 transition-all duration-500 w-full bg-[#24EEA0] h-12 rounded-full font-montserrat font-bold text-lg disabled:opacity-40'
                    }
                    btnSubmitLabel={'Salvar Alterações'}
                    onSubmit={handleSave}
                  />

                  <FormUserPassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FormUserPassword() {
  const form = {
    current_password: {
      type: InputType.PASSWORD,
      label: 'Senha atual',
      labelStyle: 'font-semibold',
      width: InputWidth.FULL,
      validation: yup.string().required('Campo Obrigatório'),
    },
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
    formData.append('new_password', e.new_password ?? '');
    formData.append('current_password', e.current_password ?? '');

    api
      .put('/update_password', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status != 200) throw 'Status inexperado';
        Notify.success('Senha atualizada com sucesso');
      })
      .catch((e) => {
        console.error('Não foi possivel atualizar a senha: ', e.message);
        Notify.error('Erro ao tentar atualizar senha');
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-11/12 mx-auto mt-10">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-3xl font-bold">Alterar senha</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Atualize a senha associada a sua conta.
          </p>
        </div>

        <div className="w-full max-w-2xl mt-6">
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
      {/* <FormUserPassword /> */}
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
