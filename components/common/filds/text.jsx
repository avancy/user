import React from 'react';

const FieldText = ({ className, placeholder, label, value, onChange }) => {
  return (
    <div className="">
      <label className="block">{label}</label>
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} border rounded-md focus:outline-none focus:ring focus:border-indigo-500`}
      />
    </div>
  );
};

export default FieldText;
