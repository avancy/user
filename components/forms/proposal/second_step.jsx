import { useProposalContext } from '../../../contexts/proposal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Notify } from '@/components/common/notification';

const schema = yup.object().shape({
  partner: yup.string(),
  father_name: yup.string(),
  mother_name: yup.string().required('Campo Obrigatório'),
  education: yup.string().required('Campo Obrigatório'),
  first_job: yup.string().required('Campo Obrigatório'),
});

export default function SecondStepForm({ setIsLoading = () => {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      first_job: 'no',
    },
  });

  const { nextProposalStep, saveApplicantInfo, getApplicantInfo, proposalStep } =
    useProposalContext();

  useEffect(() => {
    const data = getApplicantInfo(proposalStep);

    if (data) {
      setValue('partner', data.partner || '');
      setValue('father_name', data.father_name || '');
      setValue('mother_name', data.mother_name || '');
      setValue('education', data.education || '');
      setValue('first_job', data.first_job || false);
    }
  }, [proposalStep]);

  const onSubmit = async (data) => {
    if (data) {
      setIsLoading(true);
      try {
        await saveApplicantInfo(2, data);
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
      id="form-02"
    >
      {/* Cônjuge */}
      <div className="col-span-12">
        <label className="block text-xs font-medium text-gray-700">Cônjuge:</label>
        <input
          {...register('partner')}
          onChange={(e) => {
            setValue('partner', e.target.value.toUpperCase());
          }}
          placeholder="Somente para casados(as) ou em união estável"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.partner?.message}</p>
      </div>

      {/* Nome do Pai */}
      <div className="col-span-12">
        <label className="block text-xs font-medium text-gray-700">Nome Pai:</label>
        <input
          {...register('father_name')}
          onChange={(e) => {
            setValue('father_name', e.target.value.toUpperCase());
          }}
          placeholder="Nome Pai:"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.father_name?.message}</p>
      </div>

      {/* Nome da Mãe */}
      <div className="col-span-12">
        <label className="block text-xs font-medium text-gray-700">
          Nome Mãe: <span className="text-red-600">*</span>
        </label>
        <input
          {...register('mother_name')}
          onChange={(e) => {
            setValue('mother_name', e.target.value.toUpperCase());
          }}
          placeholder="Nome Mãe:"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="text-xs text-red-600">{errors.mother_name?.message}</p>
      </div>

      {/* Grau de Instrução */}
      <div className="col-span-12 md:col-span-3">
        <label className="block text-xs font-medium text-gray-700">
          Grau de Instrução: <span className="text-red-600">*</span>
        </label>
        <select
          {...register('education')}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="" selected disabled>
            Selecione
          </option>
          <option value="Sem Instrução">Sem Instrução</option>
          <option value="Fundamental Incompleto">Fundamental Incompleto</option>
          <option value="Fundamental Completo">Fundamental Completo</option>
          <option value="Médio Incompleto">Médio Incompleto</option>
          <option value="Médio Completo">Médio Completo</option>
          <option value="Superior Incompleto">Superior Incompleto</option>
          <option value="Superior Completo">Superior Completo</option>
          <option value="Pós-Graduação">Pós-Graduação</option>
          <option value="Mestrado">Mestrado</option>
          <option value="Doutorado">Doutorado</option>
        </select>
        <p className="text-xs text-red-600">{errors.education?.message}</p>
      </div>

      {/* Primeiro Emprego */}
      <div className="flex flex-col col-span-12 md:col-span-3">
        <label className="block text-xs font-medium text-gray-700">Primeiro Emprego?</label>
        <div className="flex items-center gap-4 my-auto">
          {[
            { value: 'yes', label: 'Sim' },
            { value: 'no', label: 'Não' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 text-xs font-medium text-gray-700"
            >
              <input
                type="radio"
                {...register('first_job')}
                value={option.value}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-red-600">{errors.first_job?.message}</p>
      </div>
    </form>
  );
}
