import React from 'react';

const FieldTextarea = ({ id, name, value, onChange, className }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      className={`w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 ${className}`}
    />
  );
};

export default FieldTextarea;
