import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LightTooltip } from '../tooltip';
import { useEffect } from 'react';
import * as masks from '../masks';
import * as yup from 'yup';
import clsx from 'clsx';

export const LabelStyle = {
  MEDIUM: 'block text-sm font-medium leading-6 text-gray-700',
  DEFAULT: 'block text-xs font-medium text-gray-700',
};

export const SubmitStyle = {
  MEDIUM:
    'px-8 py-2 text-sm font-semibold text-white shadow-md rounded-4xl bg-primary hover:bg-secundary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
  DEFAULT:
    'inline-flex justify-center px-8 py-2 ml-3 text-xs font-medium text-white border border-transparent shadow-sm rounded-4xl bg-primary',
};

export const CancelStyle = {
  DEFAULT:
    'inline-flex justify-center px-8 py-2 text-xs font-medium text-primary border border-transparent shadow-sm rounded-4xl bg-white',
};

export const InputWidth = {
  ONE_TWELFTH: 'lg:col-span-1',
  ONE_SIXTH: 'lg:col-span-2',
  ONE_FOURTH: 'lg:col-span-3 sm:col-span-4 col-span-12',
  ONE_THIRD: 'lg:col-span-4 sm:col-span-6 col-span-12',
  HALF: 'sm:col-span-6 col-span-12',
  TWO_THIRDS: 'lg:col-span-8 sm:col-span-8 col-span-12',
  THREE_FOURTHS: 'lg:col-span-9 sm:col-span-9 col-span-12',
  FULL: 'col-span-12',
};

export const InputType = {
  TEXT: 'text',
  NUMBER: 'number',
  PASSWORD: 'password',
  SELECT: 'select',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
};

const Input = ({
  name,
  label,
  labelStyle,
  register,
  required,
  errors,
  width,
  type,
  tip,
  defaultValue,
  mask,
  onChange,
  onBlur,
  setValue,
  autoCompleteType,
  placeholder,
  disabled,
}) => {
  defaultValue = defaultValue ? defaultValue : type == InputType.NUMBER ? 0 : '';

  useEffect(() => {
    setValue(name, mask in masks ? masks[mask](defaultValue) : defaultValue);
  }, [mask, defaultValue, setValue, name]);

  let onChangeCb = (value) => {
    if (mask in masks) {
      value = masks[mask](value);
    }
    setValue(name, value);
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  return (
    <div className={width}>
      <label htmlFor={name} className={labelStyle ? labelStyle : LabelStyle.DEFAULT}>
        {label}
      </label>
      {disabled ? (
        <LightTooltip title={'O campo não pode ser modificado'}>
          <input
            {...register(name, { required })}
            type={type}
            placeholder={placeholder ? placeholder : ''}
            id={name}
            autoComplete={autoCompleteType}
            onBlur={onBlur}
            disabled={disabled}
            onChange={(e) => onChangeCb(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
          />
        </LightTooltip>
      ) : (
        <input
          {...register(name, { required })}
          type={type}
          placeholder={placeholder ? placeholder : ''}
          id={name}
          autoComplete={autoCompleteType}
          onBlur={onBlur}
          disabled={disabled}
          onChange={(e) => onChangeCb(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm md:mt-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
        />
      )}
      {errors && errors[name] && errors[name]?.message ? (
        <p className="mt-2 text-sm text-red-600"> {errors[name].message} </p>
      ) : (
        tip != '' && <p className="mt-2 text-xs text-gray-500"> {tip} </p>
      )}
    </div>
  );
};

const TextArea = ({
  name,
  label,
  resize,
  register,
  required,
  errors,
  width,
  type,
  tip,
  defaultValue,
  onChange,
  onBlur,
  setValue,
  rows,
}) => {
  defaultValue = defaultValue ? defaultValue : '';

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue, setValue, name]);

  let onChangeCb = (value) => {
    setValue(name, value);
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  return (
    <div className={width}>
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>
      <textarea
        {...register(name, { required })}
        type={type}
        id={name}
        autoComplete={name}
        onBlur={onBlur}
        onChange={(e) => onChangeCb(e.target.value)}
        className={`${!resize && 'resize-none'} block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs`}
        rows={rows}
      />
      {errors && errors[name] && errors[name]?.message ? (
        <p className="mt-2 text-xs text-red-600"> {errors[name].message} </p>
      ) : (
        tip != '' && <p className="mt-2 text-xs text-gray-500"> {tip} </p>
      )}
    </div>
  );
};

const Select = ({
  name,
  label,
  register,
  required,
  errors,
  width,
  type,
  tip,
  onBlur,
  onChange,
  options,
  defaultValue,
  setValue,
}) => {
  defaultValue = defaultValue ? defaultValue : '';

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);

  let onChangeCb = (event) => {
    onChange && typeof onChange === 'function' && onChange(event?.target?.value);
    setValue(name, event?.target?.value);
  };

  return (
    <div className={width}>
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>
      <select
        {...register(name, { required })}
        onChange={(event) => onChangeCb(event)}
        onBlur={onBlur}
        type={type}
        id={name}
        autoComplete={name}
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
      >
        {(options || []).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[name] && errors[name]?.message ? (
        <p className="mt-2 text-xs text-red-600"> {errors[name].message} </p>
      ) : (
        tip != '' && <p className="mt-2 text-xs text-gray-500"> {tip} </p>
      )}
    </div>
  );
};
// Select.displayName = "Select";

const CheckBox = ({
  name,
  label,
  subtitle,
  register,
  required,
  errors,
  width,
  tip,
  defaultValue,
  onChange,
  onBlur,
  setValue,
  className,
}) => {
  defaultValue = defaultValue != undefined ? defaultValue : false;

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);

  let onChangeCb = (event) => {
    onChange && typeof onChange === 'function' && onChange(event?.target?.checked);
    setValue(name, event?.target?.checked);
  };

  return (
    <div className={width}>
      <div className="relative flex items-start">
        <div className="flex items-center h-6">
          <input
            {...register(name, { required })}
            onChange={(event) => onChangeCb(event)}
            onBlur={onBlur}
            id={name}
            name={name}
            autoComplete={name}
            type="checkbox"
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label
            htmlFor={name}
            className={`${className ? className : 'text-xs font-medium text-gray-700'}`}
          >
            {label}
          </label>
          <p id="comments-description" className="text-xs font-normal text-gray-500 ">
            {subtitle}
          </p>
        </div>
      </div>

      {errors && errors[name] && errors[name]?.message ? (
        <p className="mt-2 text-xs text-red-600"> {errors[name].message} </p>
      ) : (
        tip != '' && <p className="mt-2 text-xs text-gray-500"> {tip} </p>
      )}
    </div>
  );
};

const RadioButton = ({
  name,
  label,
  subtitle,
  register,
  required,
  errors,
  width,
  tip,
  defaultValue,
  flexDirection,
  onChange,
  onBlur,
  setValue,
  options = [],
}) => {
  defaultValue = defaultValue !== undefined ? defaultValue : options[0]?.value || false;

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue, setValue, name]);

  const onChangeCb = (event) => {
    const selectedValue = event.target.value;
    onChange && typeof onChange === 'function' && onChange(selectedValue);
    setValue(name, selectedValue);
  };

  return (
    <div className={width}>
      <label className="block text-xs font-medium text-gray-700">{label}</label>
      {subtitle && <p className="text-xs font-normal text-gray-500">{subtitle}</p>}

      <div className={`mt-2 flex flex-${flexDirection ? flexDirection : 'row'} gap-7`}>
        {options.map((option, i) => (
          <div key={i} className="flex items-center mb-2">
            <input
              {...register(name, { required })}
              onChange={onChangeCb}
              onBlur={onBlur}
              id={`${name}_${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              defaultChecked={defaultValue === option.value}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-600"
            />
            <label htmlFor={`${name}_${option.value}`} className="ml-2 text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {errors && errors[name]?.message ? (
        <p className="mt-2 text-xs text-red-600">{errors[name].message}</p>
      ) : (
        tip && <p className="mt-2 text-xs text-gray-500">{tip}</p>
      )}
    </div>
  );
};

function InputBuilder({
  type,
  label,
  labelStyle,
  tip,
  width,
  resize,
  flexDirection,
  errors,
  register,
  name,
  onBlur,
  onChange,
  options,
  value,
  mask,
  setValue,
  rows,
  hide,
  className,
  autoCompleteType,
  placeholder,
  disabled,
}) {
  return hide ? (
    <></>
  ) : [InputType.NUMBER, InputType.PASSWORD, InputType.TEXT].includes(type) ? (
    <Input
      type={type}
      className={className}
      errors={errors}
      name={name}
      label={label}
      labelStyle={labelStyle} // TRANFORMAR LABEL EM UM JSON
      tip={tip}
      register={register}
      width={width}
      defaultValue={value}
      autoCompleteType={autoCompleteType}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      mask={mask}
      setValue={setValue}
      disabled={disabled}
    />
  ) : type == InputType.TEXTAREA ? (
    <TextArea
      type={type}
      resize={resize}
      className={className}
      errors={errors}
      name={name}
      label={label}
      tip={tip}
      register={register}
      width={width}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      defaultValue={value}
      setValue={setValue}
      rows={rows}
    />
  ) : type == InputType.SELECT ? (
    <Select
      type={type}
      className={className}
      errors={errors}
      name={name}
      label={label}
      tip={tip}
      register={register}
      width={width}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      defaultValue={value}
      setValue={setValue}
    />
  ) : type == InputType.CHECKBOX ? (
    <CheckBox
      type={type}
      className={className}
      errors={errors}
      name={name}
      label={label}
      tip={tip}
      register={register}
      width={width}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      defaultValue={value}
      setValue={setValue}
    />
  ) : type == InputType.RADIO ? (
    <RadioButton
      type={type}
      className={className}
      errors={errors}
      name={name}
      flexDirection={flexDirection}
      label={label}
      tip={tip}
      register={register}
      width={width}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      defaultValue={value}
      setValue={setValue}
    />
  ) : (
    <></>
  );
}

function getYupSchema(form) {
  let schema = {};
  for (let attr in form) {
    schema[attr] = typeof form[attr]?.validation != undefined ? form[attr].validation : undefined;
  }
  return yup.object(schema);
}

export function FormBuilder({
  form,
  formWidth,
  disabled,
  className,
  noMargin,
  btnCancelLabel,
  btnSubmitLabel,
  onCancel,
  onSubmit,
  cancel,
  submit,
  hiddenInputs = [],
  submitStyle,
  cancelStyle,
  ...rest
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(getYupSchema(form)),
    defaultValues: {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formWidth}>
      <div className={`${!noMargin && 'm-2'}`}>
        <div className={`${className} grid grid-cols-12 gap-6`}>
          {form &&
            Object.getOwnPropertyNames(form).map((attr) => (
              <InputBuilder
                key={attr}
                {...form[attr]}
                name={attr}
                errors={errors}
                register={register}
                setValue={setValue}
                hide={hiddenInputs.includes(attr)}
              />
            ))}
        </div>
        <FormActions
          btnCancelLabel={btnCancelLabel}
          btnSubmitLabel={btnSubmitLabel}
          submitStyle={submitStyle}
          cancelStyle={cancelStyle}
          onCancel={onCancel}
          cancel={cancel}
          submit={submit}
          disabled={disabled}
        />
      </div>
    </form>
  );
}

function FormActions({
  onCancel,
  btnCancelLabel = 'Cancelar',
  btnSubmitLabel = 'Salvar',
  cancel = true,
  submit = true,
  submitStyle,
  cancelStyle,
  disabled,
}) {
  return (
    <div className="pt-8">
      <div className="flex flex-wrap justify-end gap-2">
        {submit ? (
          <button
            type="submit"
            className={submitStyle ? submitStyle : SubmitStyle.DEFAULT}
            disabled={disabled}
          >
            {btnSubmitLabel}
          </button>
        ) : undefined}

        {cancel ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => typeof onCancel === 'function' && onCancel()}
            className={clsx(
              'px-8 py-2 text-xs font-medium bg-white border shadow-sm text-primary rounded-4xl border-primary',
              cancelStyle ? cancelStyle : CancelStyle.DEFAULT,
            )}
          >
            {btnCancelLabel}
          </button>
        ) : undefined}
      </div>
    </div>
  );
}
