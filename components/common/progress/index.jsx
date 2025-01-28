const CircularProgressBar = ({ current = 0, total = 0, radius = 45, className, thickness = 5 }) => {
  radius = radius > 47 ? 47 : radius;
  const totalDigits = total.toString().length;
  const percentage = (current / total) * 100;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justiy-center min-w-min min-h-min">
      <svg
        className="transition-all duration-300 transform rotate-90"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="transition-all duration-300"
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={`${thickness}`}
        />
        <circle
          className="transition-all duration-300"
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#4caf50"
          strokeWidth={`${thickness}`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transition="stroke-dashoffset 0.35s"
        />
      </svg>
      <div
        className={`absolute transition-all duration-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className}`}
      >
        {`${current}`.padStart(totalDigits, '0')}/<span>{total}</span>
      </div>
    </div>
  );
};

const Progress = {
  Cirular: CircularProgressBar,
};
export default Progress;
