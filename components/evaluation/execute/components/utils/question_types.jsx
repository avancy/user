import { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

export function QMultipleChoices({
  onExpiration = () => {},
  setQuestionsLoading,
  questionLoadding,
  onNext = () => {},
  max_date = '',
  question_index,
  started_at,
  question,
}) {
  const { question_text, multiple_choices } = question;
  const [selectedChoice, setSelectedChoice] = useState(null);

  const maxDateTime = new Date(max_date).getTime();
  const currentTime = Date.now();
  const timeLeft = Math.max(maxDateTime - currentTime, 0);

  const handleNext = () => {
    selectedChoice && onNext(selectedChoice);
  };

  useEffect(() => {
    setQuestionsLoading(false);
  }, []);

  if (questionLoadding) {
    return null;
  }

  return (
    <div
      className="max-w-lg mx-auto text-gray-900 md:min-w-[45vw] h-screen flex-1"
      style={{ maxHeight: `calc(100vh - 160px)` }}
    >
      <div className="relative flex flex-col justify-between h-full max-h-full p-6 pt-0 overflow-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between pt-4 pb-2 bg-white">
          <div className="text-lg font-semibold tracking-wide text-blue-600 uppercase">
            Questão {question_index + 1}
          </div>
          <div className="font-bold text-blue-500">
            <Countdown
              date={Date.now() + timeLeft}
              onComplete={onExpiration}
              renderer={({ minutes, seconds }) => (
                <span>{`${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`}</span>
              )}
            />
          </div>
        </div>
        <div className="mt-2 font-bold text-justify md:text-2xl">{question_text}</div>
        <div className="mt-6 space-y-3">
          {console.log(question)}
          {console.log(multiple_choices)}
          {multiple_choices.map((choice) => (
            <Choice
              key={choice.id}
              choice={choice}
              selectedChoice={selectedChoice}
              onSelect={() => setSelectedChoice(choice.id)}
            />
          ))}
        </div>
        <div className="flex flex-col justify-end flex-1">
          <button
            onClick={handleNext}
            className={`font-bold w-full bg-brand-secondary-500 font-helvetica py-[15px] mt-2 transition-all duration-300 rounded-full text-xl hover:bg-brand-secondary-400 hover:scale-105`}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

const Choice = ({ choice, selectedChoice, onSelect }) => {
  return (
    <label
      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
        selectedChoice === choice.id
          ? 'border-blue-500 text-blue-600 scale-105'
          : 'border-gray-300 text-gray-800 hover:border-blue-400 hover:text-blue-500'
      }`}
    >
      <input
        type="radio"
        name="multiple_choice"
        value={choice.id}
        checked={selectedChoice === choice.id}
        onChange={onSelect}
        className="hidden"
      />
      <div
        className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition-all ${
          selectedChoice === choice.id ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
        }`}
      >
        {selectedChoice === choice.id && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
      </div>
      <span className="text-lg">{choice.text}</span>
    </label>
  );
};
