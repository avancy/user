import { useProposalContext } from '../../../contexts/proposal';
import { Notify } from '@/components/common/notification';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import * as masks from '@/components/masks';
import * as yup from 'yup';

export default function FourthStepForm({ setIsLoading = () => {} }) {
  const schema = yup.object().shape({
    hasDependents: yup.boolean().required('Selecione se tem dependentes'),
    dependents: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required('Nome Obrigatório'),
          birthDate: yup
            .string()
            .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Esse campo precisa ter uma data válida')
            .required('Esse campo não pode ficar em branco'),
          cpf: yup.string().required('Esse campo não pode ficar em branco'),
          kinship: yup.string().required('Esse campo não pode ficar em branco'),
        }),
      )
      .required('Esse campo não pode ficar em branco'),
  });
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      hasDependents: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependents',
  });

  const { nextProposalStep, saveApplicantInfo, getApplicantInfo, proposalStep, setIsAlertOpen } =
    useProposalContext();

  useEffect(() => {
    const data = getApplicantInfo(proposalStep);

    if (data) {
      setValue('hasDependents', data.hasDependents);
      if (data.dependents && data.dependents.length > 0) {
        remove();

        data.dependents.forEach((dependent) => {
          append({ ...dependent });
        });
      }
    }
  }, [proposalStep]);

  const onSubmit = async (data) => {
    if (data) {
      setIsLoading(true);
      try {
        await saveApplicantInfo(4, data);
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
    <form id="form-04" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 mb-4">
        <label className="block pb-3 text-xs font-medium text-gray-700">Dependentes:</label>
        <div className="flex items-center gap-4">
          <label
            htmlFor="yes"
            className="flex items-center gap-1 text-xs font-medium text-gray-700"
          >
            <input
              id="yes"
              type="radio"
              {...register('hasDependents')}
              value={true}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-600"
              onChange={(e) => setValue('hasDependents', e.target.value)}
              checked={watch('hasDependents') === 'true' || watch('hasDependents') === true}
              onClick={(e) =>
                setValue('dependents', [
                  { name: undefined, birthDate: undefined, cpf: undefined, kinship: undefined },
                ])
              }
            />
            Sim
          </label>
          <label htmlFor="no" className="flex items-center gap-1 text-xs font-medium text-gray-700">
            <input
              id="no"
              type="radio"
              {...register('hasDependents')}
              value={false}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-600"
              onChange={(e) => setValue('hasDependents', e.target.value)}
              checked={
                watch('hasDependents') === 'false' ||
                watch('hasDependents') === false ||
                watch('hasDependents') === null
              }
              onClick={() => {
                setValue('dependents', []);
              }}
            />
            Não
          </label>
        </div>
        {errors.hasDependents && (
          <p className="text-xs text-red-600">{errors.hasDependents.message}</p>
        )}
      </div>
      <div>
        {(watch('hasDependents') === 'true' || watch('hasDependents') === true) &&
          fields.length > 0 &&
          fields.map((field, index) => (
            <div key={field.id} className="relative grid grid-cols-12 gap-4 p-4 mb-4">
              <div className="col-span-12 md:col-span-8">
                <label
                  className={`block text-xs font-medium text-gray-700`}
                  htmlFor={`name-${index}`}
                >
                  Nome do dependente {index + 1}:
                </label>
                <input
                  id={`name-${index}`}
                  type="text"
                  {...register(`dependents.${index}.name`)}
                  onChange={(e) => {
                    const maskedValue = masks.uppercase(e.target.value);
                    setValue(`dependents.${index}.name`, maskedValue);
                  }}
                  placeholder="Nome"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-300"
                  disabled={!watch('hasDependents', false)}
                />
                {errors.dependents?.[index]?.name && (
                  <p className="text-xs text-red-600">{errors.dependents[index].name.message}</p>
                )}
              </div>

              <div className="col-span-6 md:col-span-4">
                <label
                  className="block text-xs font-medium text-gray-700"
                  htmlFor={`birthDate-${index}`}
                >
                  Data de nascimento:
                </label>
                <input
                  id={`birthDate-${index}`}
                  type="text"
                  {...register(`dependents.${index}.birthDate`)}
                  onInput={(e) => {
                    const maskedValue = masks.dateBR(e.target.value);
                    if (Array.isArray(watch(`dependents`)) && watch(`dependents`).length > 0) {
                      setValue(`dependents.${index}.birthDate`, maskedValue);
                    }
                  }}
                  placeholder="Data de Nascimento"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-300"
                  disabled={!watch('hasDependents', false)}
                />
                {errors.dependents?.[index]?.birthDate && (
                  <p className="text-xs text-red-600">
                    {errors.dependents[index].birthDate.message}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label className="block text-xs font-medium text-gray-700" htmlFor={`cpf-${index}`}>
                  CPF:
                </label>
                <input
                  id={`cpf-${index}`}
                  type="text"
                  {...register(`dependents.${index}.cpf`)}
                  onChange={(e) => {
                    const maskedValue = masks.cpf(e.target.value);
                    setValue(`dependents.${index}.cpf`, maskedValue);
                  }}
                  placeholder="CPF"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-300"
                  disabled={!watch('hasDependents', false)}
                />
                {errors.dependents?.[index]?.cpf && (
                  <p className="text-xs text-red-600">{errors.dependents[index].cpf.message}</p>
                )}
              </div>

              <div className="col-span-5">
                <label
                  className="block text-xs font-medium text-gray-700"
                  htmlFor={`kinship-${index}`}
                >
                  Parentesco:
                </label>
                <input
                  id={`kinship-${index}`}
                  type="text"
                  {...register(`dependents.${index}.kinship`)}
                  placeholder="Parentesco"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-300"
                  disabled={!watch('hasDependents', false)}
                />
                {errors.dependents?.[index]?.kinship && (
                  <p className="text-xs text-red-600">{errors.dependents[index].kinship.message}</p>
                )}
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute flex items-center justify-center font-bold text-white bg-red-500 rounded-md top-1 right-1 w-7 h-7"
                >
                  X
                </button>
              )}
            </div>
          ))}

        <div className="flex items-center justify-end p-4">
          <button
            type="button"
            disabled={watch('hasDependents') === false || watch('hasDependents') === 'false'}
            onClick={() => append({ name: '', birthDate: '', cpf: '', kinship: '' })}
            className="h-12 w-12 rounded-md text-white transition duration-300 bg-[#4D41C2] text-2xl font-bold disabled:opacity-60 hover:bg-[#8274f8]"
          >
            +
          </button>
        </div>
      </div>
    </form>
  );
}
