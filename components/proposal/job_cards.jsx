import { useRef, useState } from 'react';
import SwiperCarousel from './swiper';
import { BtnSwiper } from '../common/buttons/swiper';
import Image from 'next/image';
import Seta from '@/public/images/seta.png';

export default function JobCards({ jobs }) {
  const swiperRef = useRef(null);
  const [isPaginationActive, setIsPaginationActive] = useState(false);

  if (jobs?.length === 0 || jobs === undefined) {
    return <p>Nenhuma vaga encontrada.</p>;
  }

  return (
    <div className="relative flex items-center w-full">
      {isPaginationActive && (
        <Image
          src={Seta}
          alt="Seta"
          className="w-16 transition duration-300 rotate-180 cursor-pointer opacity-5 hover:opacity-30 h-52"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        />
      )}
      <SwiperCarousel
        data={jobs}
        swiperRef={swiperRef}
        setIsPaginationActive={setIsPaginationActive}
      />
      {isPaginationActive && (
        <Image
          src={Seta}
          alt="Seta"
          className="w-16 transition duration-300 cursor-pointer opacity-5 hover:opacity-30 h-52"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        />
      )}
    </div>
  );
}
