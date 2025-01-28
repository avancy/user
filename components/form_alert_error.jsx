import { XCircleIcon } from '@heroicons/react/20/solid';

export function FormAlertError({ message, errors }) {
  return (
    <div className="p-4 rounded-xl bg-red-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
          <div className="mt-2 text-sm text-red-700">
            {errors && Array.isArray(errors) && errors.length > 0 && (
              <ul role="list" className="pl-5 space-y-1 list-disc">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
