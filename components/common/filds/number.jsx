import React from 'react';

const FieldNumber = ({ label, value, onChange, className }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
      />
    </div>
  );
};

export default FieldNumber;
