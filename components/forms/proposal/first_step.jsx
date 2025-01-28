import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as masks from '@/components/masks';
import { Notify } from '@/components/common/notification';
import { useProposalContext } from '../../../contexts/proposal';
import { api } from '@/lib/api';
import { useEffect } from 'react';

const schema = yup.object().shape({
  name: yup.string().required('Esse campo não pode ficar em branco'),
  cep: yup
    .string()
    .matches(/^\d{5}-?\d{3}$/, 'Esse campo precisa ser um CEP válido')
    .required('Esse campo não pode ficar em branco'),
  address: yup.string().required('Esse campo não pode ficar em branco'),
  neighborhood: yup.string().required('Esse campo não pode ficar em branco'),
  city: yup.string().required('Esse campo não pode ficar em branco'),
  state: yup.string().required('Esse campo não pode ficar em branco'),
  home_phone: yup.string(),
  cell_phone: yup.string().required('Esse campo não pode ficar em branco'),
  message: yup.string(),
  email: yup.string().required('Esse campo não pode ficar em branco').email('E-mail inválido'),
  birth_date: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Esse campo precisa ter uma data válida')
    .required('Esse campo não pode ficar em branco'),
  nationality: yup.string().required('Esse campo não pode ficar em branco'),
  birth_state: yup.string().required('Esse campo não pode ficar em branco'),
  marital_status: yup.string().required('Esse campo não pode ficar em branco'),
});

export default function FirstStepForm({ setIsLoading = () => {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { saveApplicantInfo, nextProposalStep, getApplicantInfo, proposalStep, proposal } =
    useProposalContext();

  useEffect(() => {
    const data = getApplicantInfo(proposalStep);
    if (data) {
      setValue('name', data.name || '');
      setValue('cep', data.cep || '');
      setValue('address', data.address || '');
      setValue('neighborhood', data.neighborhood || '');
      setValue('city', data.city || '');
      setValue('state', data.state || '');
      setValue('home_phone', data.home_phone || '');
      setValue('cell_phone', data.cell_phone || '');
      setValue('message', data.message || '');
      setValue('email', data.email || '');
      setValue('birth_date', data.birth_date || '');
      setValue('nationality', data.nationality || '');
      setValue('birth_state', data.birth_state || '');
      setValue('marital_status', data.marital_status || '');
    }
  }, [proposalStep]);

  const fetchAddressData = async (cep) => {
    if (cep.length < 9) {
      setValue('address', '');
      setValue('neighborhood', '');
      setValue('city', '');
      setValue('state', '');
      return;
    }

    setIsLoading(true);
    await api
      .get(`addresses/cep/${cep}`)
      .then(({ data }) => {
        if (!data.erro) {
          setValue('address', data.address1 || '');
          setValue('neighborhood', data.address2 || '');
          setValue('city', data.city || '');
          setValue('state', data.state || '');
        } else {
          setValue('address', '');
          setValue('neighborhood', '');
          setValue('city', '');
          setValue('state', '');
          Notify.error('O CEP informado não existe.');
        }
      })
      .catch((e) => {
        if (e.response?.data?.error === 'Address not found') {
          setValue('address', '');
          setValue('neighborhood', '');
          setValue('city', '');
          setValue('state', '');
          Notify.error('O CEP informado não existe.');
        } else {
          Notify.error('Erro ao buscar CEP:', e);
        }
      })
      .finally((_) => {
        setIsLoading(false);
      });
  };

  const onSubmit = async (data) => {
    if (data) {
      setIsLoading(true);
      try {
        await saveApplicantInfo(1, data);
        nextProposalStep();
      } catch (e) {
        console.error(e);
        Notify.error('Erro ao salvar as informações do candidato.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchAddressData(getValues('cep')).then(() => handleSubmit(onSubmit)(e));
      }}
      className="relative grid grid-cols-6 gap-4 p-4 mb-4 md:grid-cols-12"
      id="form-01"
    >
      {/* Nome Completo */}
      <div className="col-span-6 md:col-span-12">
        <label className="block text-xs font-medium text-gray-700">
          Nome Completo: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('name')}
          onChange={(e) => setValue('name', e.target.value.toUpperCase())}
          placeholder="Digite seu nome completo"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.name?.message}</p>
      </div>

      {/* CEP */}
      <div className="col-span-3 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">
          CEP: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('cep')}
          onChange={(e) => setValue('cep', masks.cep(e.target.value))}
          onBlur={(e) => fetchAddressData(e.target.value)}
          placeholder="Digite seu CEP"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.cep?.message}</p>
      </div>

      {/* Endereço */}
      <div className="col-span-3 md:col-span-8">
        <label className="block text-xs font-medium text-gray-700">Endereço:</label>
        <input
          {...register('address')}
          placeholder="Digite seu endereço"
          disabled
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.address?.message}</p>
      </div>

      {/* Bairro */}
      <div className="col-span-3 md:col-span-6">
        <label className="block text-xs font-medium text-gray-700">Bairro:</label>
        <input
          {...register('neighborhood')}
          placeholder="Digite seu bairro"
          disabled
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.neighborhood?.message}</p>
      </div>

      {/* Cidade */}
      <div className="col-span-3 md:col-span-3">
        <label className="block text-xs font-medium text-gray-700">Cidade:</label>
        <input
          {...register('city')}
          placeholder="Digite sua cidade"
          disabled
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.city?.message}</p>
      </div>

      {/* Estado */}
      <div className="col-span-2 md:col-span-3">
        <label className="block text-xs font-medium text-gray-700">UF:</label>
        <input
          {...register('state')}
          placeholder="Digite o estado"
          disabled
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.state?.message}</p>
      </div>

      {/* Telefone Residencial */}
      <div className="col-span-4 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">Telefone Residencial:</label>
        <input
          {...register('home_phone')}
          onChange={(e) => {
            const maskedValue = masks.phone(e.target.value);
            setValue('home_phone', maskedValue);
          }}
          maxLength={16}
          placeholder="Digite seu telefone residencial"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.home_phone?.message}</p>
      </div>

      {/* Celular */}
      <div className="col-span-3 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">
          Celular: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('cell_phone')}
          onChange={(e) => {
            const maskedValue = masks.phone(e.target.value);
            setValue('cell_phone', maskedValue);
          }}
          maxLength={16}
          placeholder="Digite seu celular"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.cell_phone?.message}</p>
      </div>

      {/* Recado */}
      <div className="col-span-3 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">Recado:</label>
        <input
          {...register('message')}
          onChange={(e) => {
            const maskedValue = masks.phone(e.target.value);
            setValue('message', maskedValue);
          }}
          maxLength={16}
          placeholder="Digite o número de recados"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.message?.message}</p>
      </div>

      {/* E-mail */}
      <div className="col-span-6 md:col-span-12">
        <label className="block text-xs font-medium text-gray-700">
          E-mail: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('email')}
          placeholder="Digite seu e-mail"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.email?.message}</p>
      </div>

      {/* Data de Nascimento */}
      <div className="col-span-3 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">
          Data de Nascimento: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('birth_date')}
          onChange={(e) => {
            const maskedValue = masks.dateBR(e.target.value);
            setValue('birth_date', maskedValue);
          }}
          placeholder="dd/mm/aaaa"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.birth_date?.message}</p>
      </div>

      {/* Naturalidade */}
      <div className="col-span-3 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">
          Naturalidade: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('nationality')}
          placeholder="Digite sua naturalidade"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.nationality?.message}</p>
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-xs font-medium text-gray-700">
          UF: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('birth_state')}
          onChange={(e) => {
            setValue('birth_state', e.target.value.toUpperCase());
          }}
          maxLength={2}
          placeholder="Digite seu estado de nascimento"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
        <p className="text-xs text-red-600">{errors.birth_state?.message}</p>
      </div>

      {/* Estado Civil */}
      <div className="col-span-4 md:col-span-3">
        <label className="block text-xs font-medium text-gray-700">
          Estado Civil: <span className="text-red-600">*</span>
        </label>
        <select
          {...register('marital_status')}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        >
          <option value="" selected disabled>
            Selecione
          </option>
          <option value="Solteiro(a)">Solteiro(a)</option>
          <option value="Casado(a)">Casado(a)</option>
          <option value="Divorciado(a)">Divorciado(a)</option>
          <option value="Viuvo(a)">Viúvo(a)</option>
          <option value="Nao desejo informar">Não desejo informar</option>
        </select>
        <p className="text-xs text-red-600">{errors.marital_status?.message}</p>
      </div>
    </form>
  );
}
