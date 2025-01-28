function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ProgressBar(props) {
  return (
    <>
      <div
        className={classNames(
          'leading-5 font-semibold overflow-hidden rounded-full w-full text-center relative block text-xs h-5',
          props.hasErrors
            ? 'bg-red-100 text-red-500'
            : props.percentage >= 100
              ? 'bg-green-50 text-green-800'
              : 'bg-blue-50 text-blue-800',
        )}
      >
        <div
          className={classNames(
            'shadow-none h-full rounded-full absolute block',
            props.hasErrors
              ? 'bg-transparent'
              : props.percentage >= 100
                ? 'bg-green-400 bg-opacity-25'
                : 'bg-blue-400 bg-opacity-25',
          )}
          style={{ width: props.percentage + '%' }}
        >
          &nbsp;
        </div>

        {props.hasErrors ? 'Falha' : props.percentage + ' %'}
      </div>
    </>
  );
}
