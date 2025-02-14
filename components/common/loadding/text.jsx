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
        width={100}
        height={100}
        className="lg:hidden"
        alt="Carregando..."
      />

      <Image
        src={big_gif_path}
        unoptimized={true}
        width={400}
        height={400}
        className="hidden lg:block"
        alt="Carregando..."
      />
    </div>
  );
}
