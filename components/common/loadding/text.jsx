import Image from 'next/image';
import { BlueSpinner } from './blue_spinner';

export function LoadingText() {
  const small_gif_path = '/gifs/loading_sm.gif';
  const big_gif_path = '/gifs/loading_lg.gif';

  return (
    <div className="flex items-center justify-start pl-2">
      <Image
        src={small_gif_path}
        unoptimized={true}
        width={50}
        height={50}
        className="lg:hidden"
        alt="Carregando..."
      />

      <Image
        src={big_gif_path}
        unoptimized={true}
        width={200}
        height={200}
        className="hidden lg:block"
        alt="Carregando..."
      />
    </div>
  );
}
