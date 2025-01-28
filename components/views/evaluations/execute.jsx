import { EVALUATION_STAGE_IMAGES } from '@/constrants/evaluation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import EvaluationManager from '@/classes/evaluations';

export default function EvaluationExecute({ evaluation: initialEvaluation, job, stage_id }) {
  const [currentScreen, setCurrentScreen] = useState('description');
  const [evaluation, setEvaluation] = useState(initialEvaluation);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});

  const imageSrc = EVALUATION_STAGE_IMAGES[evaluation?.image_index] || null;

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleStart = () => {
    const dateStart = new Date();
    setEvaluation({ ...evaluation, start: dateStart });
    setCurrentScreen('execution');
    EvaluationManager.start({
      id,
      stage_id,
      date: dateStart,
      onSuccess: () => {},
    });
  };

  const handleNextQuestion = async () => {
    const currentAnswer = {
      question: evaluation.questions[currentQuestion].question,
      answer: answers[currentQuestion] || null,
    };

    try {
      await axios.post('/test', currentAnswer);
      console.log('Resposta enviada:', currentAnswer);
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
    }

    if (currentQuestion < evaluation.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
      setCurrentScreen('finish');
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/test', { answers });
      console.log('Todas as respostas foram enviadas.');
    } catch (error) {
      console.error('Erro ao enviar respostas finais:', error);
    }
  };

  const formatTime = (time = 0) => {
    time = time || 0;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (currentScreen === 'execution') {
      const calculateInitialTimeLeft = () => {
        const startTime = new Date(evaluation.start).getTime();
        const now = Date.now();
        const totalTime = evaluation.questions.length * evaluation.time_per_question * 60;
        const elapsedTime = Math.floor((now - startTime) / 1000);
        return Math.max(totalTime - elapsedTime, 0);
      };

      setTimeLeft(calculateInitialTimeLeft());

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            setCurrentScreen('finish');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentScreen, evaluation.start, evaluation.questions.length, evaluation.time_per_question]);

  return (
    <div className="min-h-screen md:p-6 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex flex-col justify-between w-full h-screen p-4 bg-white md:shadow-lg md:p-8 md:h-auto md:rounded-lg md:mx-auto md:max-w-3xl">
        {currentScreen === 'description' && (
          <>
            <div>
              {imageSrc && (
                <div className="flex justify-center w-full mb-6 overflow-hidden rounded-t-lg shadow-md max-h-96">
                  <Image
                    src={imageSrc}
                    height={200}
                    width={300}
                    unoptimized
                    className="w-full h-full rounded-lg"
                  />
                </div>
              )}

              <h1 className="mb-4 text-3xl font-bold text-gray-800">{evaluation.name}</h1>
              <h2 className="mb-2 text-xl font-medium text-gray-600">{job.title}</h2>
              <p className="text-lg font-normal text-gray-500">{job.company.name}</p>
              <p className="mb-6 text-lg text-gray-700">
                <strong className="font-medium text-gray-900">Descrição:</strong>{' '}
                {evaluation.description}
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Iniciar Teste
            </button>
          </>
        )}

        {currentScreen === 'execution' && (
          <>
            <div>
              <div className="flex flex-col items-end justify-between p-4 rounded-t md:mb-4 md:shadow-sm md:rounded-lg gap-x-3 md:items-center md:flex-row bg-blue-50">
                <div className="text-sm font-semibold text-red-500 md:text-base">
                  {formatTime(timeLeft)}
                </div>
                <h1 className="w-full text-lg font-bold leading-tight text-justify text-gray-800 md:h-auto md:text-2xl">
                  {evaluation.questions[currentQuestion].question} asdfad af dfa da daf
                </h1>
              </div>
              <div className="p-2 mb-6 rounded-b md:rounded-lg md:shadow md:p-4 bg-gray-50">
                <div className="flex flex-col gap-2 md:gap-4">
                  {evaluation.questions[currentQuestion].options.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center p-2 text-gray-600 transition rounded hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        className="hidden peer"
                        onChange={() => handleAnswerChange(currentQuestion, option)}
                      />
                      <span className="flex items-center justify-center w-5 h-5 mr-3 transition-all duration-200 border-2 border-gray-300 rounded-full cursor-pointer hover:border-blue-500 peer-checked:bg-blue-500" />
                      <span className="text-gray-700 cursor-pointer peer-checked:text-blue-500">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full gap-x-3">
              {currentQuestion > 0 ? (
                <button
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                  Voltar
                </button>
              ) : (
                <div className="invisible"></div>
              )}
              <button
                onClick={handleNextQuestion}
                className="self-end px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
              >
                {currentQuestion < evaluation.questions.length - 1 ? 'Próxima' : 'Finalizar'}
              </button>
            </div>
          </>
        )}

        {currentScreen === 'finish' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Teste Finalizado</h1>
            <p className="my-4 text-gray-600">
              Obrigado por completar o teste para a vaga de {job.title} na empresa{' '}
              {job.company.name}!
            </p>
            <button
              onClick={() => console.log('Finalizado!')}
              className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
