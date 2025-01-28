import Image from 'next/image';

export default function DiscImage() {
  return (
    <div className="relative justify-center hidden mt-2 p r-10 xl:flex">
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
