import EvaluationCard from '../views/evaluations/card';

export function GridEvaluations({ evaluations }) {
  const keys = Object.keys(evaluations || {});

  return (
    <div className="flex flex-col flex-grow w-full h-full">
      <div>
        <h1 className="mb-3 font-bold text-center font-montserrat md:text-3xl md:text-left">
          Avaliações disponíveis
        </h1>
        <h2>
          Abaixo acompanhe os testes disponíveis para execução ou revisar um teste já executado.
        </h2>
      </div>

      {keys.length === 0 ? (
        <div className="flex items-center justify-center flex-grow w-full h-full text-gray-500">
          <span className="text-xl">Ainda não há avaliações para mostrar...</span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center mt-10 gap-14 md:justify-start lg:mx-0">
          {keys.map((key, i) => (
            <EvaluationCard key={i} {...evaluations[key]} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GridEvaluations;
