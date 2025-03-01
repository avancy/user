import clsx from 'clsx';
import { EVALUATIONS_IMAGES_LIST } from '../../constants';
import Image from 'next/image';

export default function ImageByIndex({ index, className }) {
  console.log(index);
  return (
    <div className={clsx('relative justify-center hidden mt-2 r-10 flex-1 xl:flex', className)}>
      <div className="absolute w-[calc(100%-30px)] max-h-full h-min max-w-full overflow-hidden transform -translate-x-1/2 -translate-y-1/2 rounded-[50px] top-1/2 left-1/2">
        <Image
          src={EVALUATIONS_IMAGES_LIST[index]}
          alt="disc"
          className="w-full"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
