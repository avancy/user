import React from 'react';

const FieldCheckbox = ({ id, name, value, checked, onChange, className }) => {
  return (
    <div className="">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={`mr-2 ${className}`}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default FieldCheckbox;
