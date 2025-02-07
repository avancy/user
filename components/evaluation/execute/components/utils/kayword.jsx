import { useState } from 'react';
import { Tooltip } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Keyword({ name, description, select = false, classNames, ...rest }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`flex items-center ${
        select
          ? 'bg-brand-secondary-500 text-black font-bold border-transparent'
          : 'border-gray-500'
      } min-w-0 w-max font-sans text-sm font-semibold border rounded-4xl ${classNames}`}
      {...rest}
    >
      {/* Render para telas grandes */}
      <div className="hidden md:block">
        {description ? (
          <Tooltip
            className="absolute z-50 py-2 bg-black rounded-md shadow-md max-w-[300px]"
            placement="bottom-start"
            openDelay={500}
            content={
              <div className="relative text-brand-secondary-500">
                <div className="absolute -z-10 -top-5 w-[12px] h-7 -rotate-12 flex justify-start overflow-hidden">
                  <div className="pt-1 rotate-45 bg-black w-7 h-7 rotate" />
                </div>
                {description}
              </div>
            }
          >
            <div className="px-4 py-1">{name}</div>
          </Tooltip>
        ) : (
          <span className="px-4 py-1">{name}</span>
        )}
      </div>

      {/* Render para telas pequenas */}
      <div className="relative flex items-center gap-2 md:hidden">
        <span className={clsx('py-1', description ? 'pl-4 pr-0' : 'px-4')}>{name}</span>
        {description && (
          <>
            <button
              className="p-1 text-gray-500 border-l rounded-r-full border-gray-400/50"
              onClick={() => setShowTooltip(true)}
            >
              <InformationCircleIcon className="w-5 h-5" />
            </button>
            {showTooltip && (
              <>
                <div className="absolute left-0 z-30 p-2 mt-2 text-xs text-white bg-black rounded-lg shadow-md max-w-64 top-full">
                  {description}
                </div>
                <div
                  onClick={() => setShowTooltip(false)}
                  className="fixed inset-0 z-50 w-full h-full"
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
