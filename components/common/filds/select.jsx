import React from 'react';

const FieldSelect = ({ className, value, onChange, options, label }) => {
  return (
    <>
      <div className="">
        <label className="block">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`border rounded-md focus:outline-none focus:ring focus:border-indigo-300 ${className}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FieldSelect;
