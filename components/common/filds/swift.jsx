import React from 'react';

const FieldSwift = ({ className, label, checked, onChange }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <div className={`mb-4 flex items-center ${className}`}>
      <label className="block mx-2">{label}</label>
      <div
        className={`relative inline-block w-11 rounded-full h-6 mr-3 ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}
        onClick={handleChange}
        role="button"
      >
        <div
          className={`absolute w-6 h-6 bg-white text-[10px] flex justify-center items-center  rounded-full shadow-md transition-transform duration-300 ${
            checked ? `transform translate-x-full after:content-['Sim']` : `after:content-['Não']`
          }`}
        ></div>
      </div>
    </div>
  );
};

export default FieldSwift;
