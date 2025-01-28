import React, { useEffect, useState, useCallback } from 'react';
import FieldRadioButton from './common/filds/radio_button';
import ModalConfirmation from './models/confirmation';
import FieldCheckbox from './common/filds/checkbox';
import FieldTextarea from './common/filds/textarea';
import FieldNumber from './common/filds/number';
import FieldSwift from './common/filds/swift';

const Questionnaire = ({ formFields, onSubmit, onAnswersChange, onClose }) => {
  const [answers, setAnswers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const memoizedOnAnswersChange = useCallback(onAnswersChange, []);

  useEffect(() => {
    memoizedOnAnswersChange(Object.entries(answers).map(([id, value]) => ({ id, value })));
    const requiredFields = formFields.filter((field) => field.required);
    const answeredRequiredFields = requiredFields.every(
      (field) => answers[field.name] !== undefined && answers[field.name] !== '',
    );
    setIsComplete(answeredRequiredFields);
  }, [answers, formFields, memoizedOnAnswersChange]);

  const handleInputChange = (value, name) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedAnswers = Object.entries(answers).map(([id, value]) => ({
      id,
      value,
    }));
    onSubmit(formattedAnswers);
  };

  const handleCancelClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelConfirm = () => {
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="max-w-md p-6 mx-auto ">
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-2">{field.label}</label>

            {field.type === 'radio' && (
              <>
                {field.options?.map((option, i) => (
                  <FieldRadioButton
                    key={`${field.name}-${i}`}
                    id={`${field.name}-${i}`}
                    name={field.name}
                    value={option}
                    checked={answers[field.name] === option}
                    onChange={(value) => handleInputChange(value, field.name)}
                  />
                ))}
              </>
            )}
            {field.type === 'checkbox' && (
              <>
                {field.options?.map((option, i) => (
                  <FieldCheckbox
                    key={`${field.name}-${i}`}
                    id={`${field.name}-${i}`}
                    name={field.name}
                    value={option}
                    checked={answers[field.name] === option}
                    onChange={(value) => handleInputChange(value, field.name)}
                  />
                ))}
              </>
            )}

            {field.type === 'text' && (
              <FieldTextarea
                id={field.name}
                name={field.name}
                value={answers[field.name] || ''}
                onChange={(value) => handleInputChange(value, field.name)}
                className="border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            )}

            {field.type === 'inputSwift' && (
              <FieldSwift
                checked={answers[field.name] === 'true'}
                onChange={(checked) => handleInputChange(checked.toString(), field.name)}
              />
            )}

            {field.type === 'number' && (
              <FieldNumber
                label={field.label}
                value={parseInt(answers[field.name]) || 0}
                onChange={(value) => handleInputChange(String(value), field.name)}
              />
            )}
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-400"
            onClick={handleCancelClick}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!isComplete}
            className={`px-4 py-2 font-bold text-white rounded-md ${
              isComplete
                ? 'bg-green-400 hover:bg-green-300 focus:outline-none focus:bg-green-300'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Confirmar Candidatura
          </button>

          <ModalConfirmation
            open={showConfirmation}
            onConfirm={handleCancelConfirm}
            onCancel={handleCancelCancel}
          />
        </div>

        <div className="mt-10">
          <span className="text-sm text-gray-500 ">
            *Essa vaga requer que para se candidatar o usuário responda o questionário
          </span>
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;
