import ModalConfirmation from '@/components/models/confirmation';
import Questionnaire from '../questions_page';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

export function ModalQuestion({ onSubmit, onClose, job }) {
  const [open, setOpen] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (job?.survey_json) {
      setFormFields(job.survey_json);
    }
  }, [job?.survey_json]);

  const handleSubmit = () => {
    const formData = {
      questions_json: formFields.map((field) => ({
        id: field.id,
        label: field.label,
        type: field.type,
        name: field.name,
        options: field.options || [],
        required: field.required || false,
        expectedAnswer: field?.expectedAnswer?.trim() || null,
      })),
      answers_json: answers.map((answer) => ({
        questionId: answer.id,
        answer: answer?.value?.trim(),
      })),
      has_required_survey_to_apply: job?.has_required_survey_to_apply || false,
    };

    const expectedAnswersMap = formData.questions_json.reduce((map, question) => {
      if (question.expectedAnswer !== null && question.required) {
        map[question.name] = question.expectedAnswer;
      }
      return map;
    }, {});

    formData.answers_json.forEach((answer) => {
      if (answer.answer === 'true') {
        answer.answer = 'Sim';
      }
    });

    formData.has_required_survey_to_apply = Object.keys(expectedAnswersMap).every((questionId) => {
      const answer = formData.answers_json.find((ans) => ans.questionId === questionId);
      if (!answer) {
        return false;
      }

      const expectedAnswer = expectedAnswersMap[questionId];
      return expectedAnswer === answer.answer;
    });

    onSubmit(formData);
    setOpen(false);
  };

  const handleAnswersChange = (newAnswers) => {
    setAnswers(newAnswers);
  };

  const handleCancelClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelConfirm = () => {
    setShowConfirmation(false);
    setOpen(false);
  };

  const handleCancelCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto bg-black/40"
        onClose={() => {
          setOpen(false);
          onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setOpen(false);
                      onClose();
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <ModalConfirmation
                  open={showConfirmation}
                  onConfirm={handleCancelConfirm}
                  onCancel={handleCancelCancel}
                />

                <Questionnaire
                  formFields={formFields}
                  onSubmit={handleSubmit}
                  onAnswersChange={handleAnswersChange}
                  onClose={() => {
                    setOpen(false);
                    onClose();
                  }}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
