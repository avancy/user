import { BlueSpinner } from './blue_spinner';

export function LoadingText() {
  return (
    <div className="flex items-center justify-start pl-2">
      <BlueSpinner />
      <span className="text-blue-900 animate-pulse text-normal">Carregando...</span>
    </div>
  );
}
