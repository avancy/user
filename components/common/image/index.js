import Img from 'next/image';
import avancy from '@/images/avancy-gray.svg';

export default function Image({ src, className, ...props }) {
  return (
    <Img
      src={src}
      onError={(e) => {
        e.target.src = avancy.src;
      }}
      className={`m-auto ${className}`}
      {...props}
      unoptimized
    />
  );
}
