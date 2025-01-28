import clsx from 'clsx';

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm';

const formClassesRegister =
  'block w-full appearance-none rounded-md border border-gray-800 bg-white px-2 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm';

function Label({ id, children }) {
  return (
    <label htmlFor={id} className="block mb-3 text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

export function TextField({ id, label, type = 'text', className = '', ...props }) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
}

export function TextFieldRegister({ id, label, type = 'text', className = '', ...props }) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClassesRegister} />
    </div>
  );
}

export function TextFieldSearch({ id, label, type = 'text', className = '', ...props }) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input
        id={id}
        type={type}
        className={clsx(formClassesRegister, 'border-none shadow-md')}
        {...props}
      />
    </div>
  );
}

export function SelectField({ id, label, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  );
}

export function NumberField({ id, label, type = 'number', className = '', ...props }) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
}
