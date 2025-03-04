import {
  INTERNSHIPS_TYPES,
  INTERNSHIPS_TYPES_LIST,
} from '@/components/evaluation/execute/constants';
import { createContext, useContext, useEffect, useState } from 'react';

const TestContext = createContext();

export function EvaluationProvider({ children, values, onClose, onSave }) {
  const [step, setStep] = useState(INTERNSHIPS_TYPES.DETAILS);
  const [formStep, setFormStep] = useState(0);
  const [options, setOptions] = useState(values);

  const nextStep = () => {
    const current = INTERNSHIPS_TYPES_LIST.findIndex((item) => item === step);
    setStep(INTERNSHIPS_TYPES_LIST[Math.min(current + 1, INTERNSHIPS_TYPES_LIST.length - 1)]);
  };

  const backStep = () => {
    const current = INTERNSHIPS_TYPES_LIST.findIndex((item) => item === step);
    setStep(INTERNSHIPS_TYPES_LIST[Math.max(current - 1, 0)]);
  };

  const setStepType = (type_name, index = 0) => {
    if (type_name === INTERNSHIPS_TYPES.FORMS) {
      setFormStep(index);
      setStep(type_name);
    }

    if (INTERNSHIPS_TYPES_LIST.includes(type_name)) {
      setStep(type_name);
    }
  };

  const handleClose = () => {
    onClose && onClose();
  };

  const handleSave = (callback = () => {}) => {
    onSave && onSave(callback(options));
    onClose && onClose();
  };

  useEffect(() => {
    setOptions(values);
  }, []);

  return (
    <TestContext.Provider
      value={{
        // OPTIONS
        options,
        setOptions,

        // FORM
        formStep,
        setFormStep,

        // STEPS
        step,
        nextStep,
        backStep,
        setStepType,
        handleClose,
        handleSave,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTestContext() {
  return useContext(TestContext);
}
