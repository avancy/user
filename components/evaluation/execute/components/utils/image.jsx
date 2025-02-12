import Image from 'next/image';
import clsx from 'clsx';

export default function DiscImage({ className }) {
  return (
    <div className={clsx('relative justify-center hidden mt-2 r-10 xl:flex', className)}>
      <Image
        src="/images/disc.png"
        alt="disc"
        className="w-auto h-full p-5"
        width={400}
        height={400}
      />
    </div>
  );
}
