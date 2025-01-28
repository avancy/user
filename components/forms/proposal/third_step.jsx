import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as masks from '@/components/masks';
import { useProposalContext } from '../../../contexts/proposal';
import { useEffect } from 'react';
import { Notify } from '@/components/common/notification';

const schema = yup.object().shape({
  pis: yup.string().length(14, 'PIS deve conter apenas 11 dígitos numéricos'),
  ctps: yup
    .string()
    .test(
      'length',
      'A CTPS deve ter 7 ou 8 dígitos',
      (value) => value.length === 12 || value.length === 14,
    ),
  serial_ctps: yup.string().required('Campo Obrigatório'),
  emission_ctps: yup.string().required('Campo Obrigatório'),
  cpf: yup.string().length(14, 'O CPF deve conter apenas 11 dígitos numéricos'),
  rg: yup
    .string()
    .test('length', 'O RG deve conter no minimo 7 dígitos', (value) => value.length >= 8)
    .required('Campo Obrigatório'),
  federative_unity: yup
    .string()
    .length(2, 'UF deve conter 2 dígitos')
    .required('Campo Obrigatório'),
  emission_date: yup.string().length(10, 'A data não esta completa').required('Campo Obrigatório'),
  electoral_title: yup
    .string()
    .length(15, 'Título deve conter 12 dígitos')
    .required('Campo Obrigatório'),
  electoral_zone: yup.string().required('Campo Obrigatório'),
  electoral_session: yup.string().required('Campo Obrigatório'),
  electoral_emission: yup.string().required('Campo Obrigatório'),
  driver_license: yup.string(),
  driver_license_category: yup.string(),
  driver_license_expiration: yup.string(),
  reservist: yup.string(),
  bank: yup.string(),
  bank_agency: yup.string(),
  bank_current_account: yup.string(),
  bank_savings_account: yup.string(),
});

export default function ThirdStepForm({ setIsLoading = () => {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { nextProposalStep, saveApplicantInfo, getApplicantInfo, proposalStep } =
    useProposalContext();

  useEffect(() => {
    const data = getApplicantInfo(proposalStep);

    if (data) {
      setValue('pis', data.pis || '');
      setValue('ctps', data.ctps || '');
      setValue('serial_ctps', data.serial_ctps || '');
      setValue('emission_ctps', data.emission_ctps || '');
      setValue('cpf', data.cpf || '');
      setValue('rg', data.rg || '');
      setValue('federative_unity', data.federative_unity || '');
      setValue('emission_date', data.emission_date || '');
      setValue('electoral_title', data.electoral_title || '');
      setValue('electoral_zone', data.electoral_zone || '');
      setValue('electoral_session', data.electoral_session || '');
      setValue('electoral_emission', data.electoral_emission || '');
      setValue('driver_license', data.driver_license || '');
      setValue('driver_license_category', data.driver_license_category || '');
      setValue('driver_license_expiration', data.driver_license_expiration || '');
      setValue('reservist', data.reservist || '');
      setValue('bank', data.bank || '');
      setValue('bank_agency', data.bank_agency || '');
      setValue('bank_current_account', data.bank_current_account || '');
      setValue('bank_savings_account', data.bank_savings_account || '');
    }
  }, [proposalStep]);

  const onSubmit = async (data) => {
    if (data) {
      setIsLoading(true);
      try {
        await saveApplicantInfo(3, data);
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
      onSubmit={handleSubmit(onSubmit)}
      className="relative grid grid-cols-12 gap-4 p-4 mb-4"
      id="form-03"
    >
      {/* PIS/PASEP */}
      <div className="col-span-6 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">
          PIS/PASEP: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('pis')}
          onChange={(e) => {
            const maskedValue = masks.pisPasep(e.target.value);
            setValue('pis', maskedValue);
          }}
          placeholder="XXX.XXXX.XX-X"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.pis?.message}</p>
      </div>

      {/* CTPS */}
      <div className="col-span-6 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">
          CTPS n°: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('ctps')}
          onChange={(e) => {
            const maskedValue = masks.ctps(e.target.value);
            setValue('ctps', maskedValue);
          }}
          placeholder="XXX.XXXXXX-XX"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.ctps?.message}</p>
      </div>

      <div className="col-span-7 md:col-span-2">
        <label className="block text-xs font-medium text-gray-700">
          Série: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('serial_ctps')}
          maxLength={8}
          placeholder="N° de série CTPS"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.serial_ctps?.message}</p>
      </div>

      <div className="col-span-5 md:col-span-2">
        <label className="block text-xs font-medium text-gray-700">
          Emissão: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('emission_ctps')}
          onChange={(e) => {
            const maskedValue = masks.dateBR(e.target.value);
            setValue('emission_ctps', maskedValue);
          }}
          placeholder="Data emissão"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.emission_ctps?.message}</p>
      </div>
      <div className="h-1 col-span-12 rounded-full bg-[#4D41C2] md:hidden lg:hidden" />

      {/* CPF */}
      <div className="col-span-8 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">
          CPF: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('cpf')}
          onChange={(e) => {
            const maskedValue = masks.cpf(e.target.value);
            setValue('cpf', maskedValue);
          }}
          placeholder="CPF"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.cpf?.message}</p>
      </div>

      {/* Federative Unity */}
      <div className="col-span-4 md:col-span-2">
        <label className="block text-xs font-medium text-gray-700">
          UF: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('federative_unity')}
          onChange={(e) => {
            const maskedValue = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
            setValue('federative_unity', maskedValue);
          }}
          maxLength={2}
          placeholder="UF"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.federative_unity?.message}</p>
      </div>

      {/* RG */}
      <div className="col-span-6 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">
          RG: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('rg')}
          onChange={(e) => {
            const maskedValue = masks.rg(e.target.value);
            setValue('rg', maskedValue);
          }}
          maxLength={13}
          placeholder="RG"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.rg?.message}</p>
      </div>

      <div className="col-span-6 md:col-span-2">
        <label className="block text-xs font-medium text-gray-700">
          Emissão: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('emission_date')}
          onChange={(e) => {
            const maskedValue = masks.dateBR(e.target.value);
            setValue('emission_date', maskedValue);
          }}
          placeholder="Data de emissão"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.emission_date?.message}</p>
      </div>

      <div className="h-1 col-span-12 rounded-full bg-[#4D41C2] md:hidden lg:hidden" />

      <div className="col-span-8 md:col-span-5">
        <label className="block text-xs font-medium text-gray-700">
          Título de Eleitor: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('electoral_title')}
          onChange={(e) => {
            setValue('electoral_title', masks.electoralTitle(e.target.value));
          }}
          maxLength={15}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.electoral_title?.message}</p>
      </div>

      <div className="col-span-4 md:col-span-2">
        <label className="block text-xs font-medium text-gray-700">
          Zona: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('electoral_zone')}
          maxLength={4}
          placeholder="0000"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.electoral_title?.message}</p>
      </div>

      <div className="col-span-6 md:col-span-3">
        <label className="block text-xs font-medium text-gray-700">
          Sessão: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('electoral_session')}
          placeholder="Sessão eleitoral"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.electoral_session?.message}</p>
      </div>

      <div className="col-span-6 md:col-span-2">
        <label className="block text-xs font-medium text-gray-700">
          Emissão: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('electoral_emission')}
          onChange={(e) => {
            const maskedValue = masks.dateBR(e.target.value);
            setValue('electoral_emission', maskedValue);
          }}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.electoral_emission?.message}</p>
      </div>
      <div className="h-1 col-span-12 rounded-full bg-[#4D41C2] md:hidden lg:hidden" />

      <div className="col-span-12 md:col-span-5">
        <label className="block text-xs font-medium text-gray-700">Habilitação:</label>
        <input
          {...register('driver_license')}
          onChange={(e) => {
            setValue('driver_license', masks.uppercase(e.target.value));
          }}
          maxLength={11}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.driver_license?.message}</p>
      </div>

      <div className="col-span-5 md:col-span-3">
        <label className="block text-xs font-medium text-gray-700">Categoria:</label>
        <select
          {...register('driver_license_category')}
          className="block w-full mt-1 border-gray-300 max-h-[50px] overflow-auto rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          size="1"
        >
          <option value="" selected disabled>
            selecione
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="AB">AB</option>
          <option value="AC">AC</option>
          <option value="AD">AD</option>
          <option value="AE">AE</option>
          <option value="BC">BC</option>
          <option value="BD">BD</option>
          <option value="BE">BE</option>
          <option value="CD">CD</option>
          <option value="CE">CE</option>
          <option value="DE">DE</option>
          <option value="ABCDE">ABCDE</option>
        </select>
        <p className="text-xs text-red-600">{errors.driver_license_category?.message}</p>
      </div>

      <div className="col-span-7 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">Vencimento:</label>
        <input
          {...register('driver_license_expiration')}
          onChange={(e) => {
            const maskedValue = masks.dateBR(e.target.value);
            setValue('driver_license_expiration', maskedValue);
          }}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.driver_license_expiration?.message}</p>
      </div>
      <div className="h-1 col-span-12 rounded-full bg-[#4D41C2] md:hidden lg:hidden" />

      <div className="col-span-3">
        <label className="block text-xs font-medium text-gray-700">Banco: </label>
        <input
          {...register('bank')}
          placeholder="Nome do Banco"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.bank?.message}</p>
      </div>

      <div className="col-span-4 md:col-span-1">
        <label className="block text-xs font-medium text-gray-700">Agência:</label>
        <input
          {...register('bank_agency')}
          onChange={(e) => {
            const maskedValue = masks.bankAgency(e.target.value);
            setValue('bank_agency', maskedValue);
          }}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.bank_agency?.message}</p>
      </div>

      <div className="col-span-5 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">Conta Corrente:</label>
        <input
          {...register('bank_current_account')}
          onChange={(e) => {
            const maskedValue = masks.bankAccount(e.target.value);
            setValue('bank_current_account', maskedValue);
          }}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.bank_current_account?.message}</p>
      </div>

      <div className="col-span-12 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">Conta Poupança:</label>
        <input
          {...register('bank_savings_account')}
          onChange={(e) => {
            const maskedValue = masks.bankAccount(e.target.value);
            setValue('bank_savings_account', maskedValue);
          }}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.bank_savings_account?.message}</p>
      </div>
      <div className="h-1 col-span-12 rounded-full bg-[#4D41C2] md:hidden lg:hidden" />

      <div className="col-span-12 md:col-span-4">
        <label className="block text-xs font-medium text-gray-700">Reservista:</label>
        <input
          {...register('reservist')}
          placeholder="Reservista (obrigatório para homens)"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.reservist?.message}</p>
      </div>
    </form>
  );
}
