import { useRef, useState } from 'react';
import SwiperCarousel from './swiper';
import { BtnSwiper } from '../common/buttons/swiper';

export default function JobCards({ jobs }) {
  const swiperRef = useRef(null);
  const [isPaginationActive, setIsPaginationActive] = useState(false);
  const [isPressedBtn1, setIsPressedBtn1] = useState(false);
  const [isPressedBtn2, setIsPressedBtn2] = useState(false);

  if (jobs?.length === 0 || jobs === undefined) {
    return <p>Nenhuma vaga encontrada.</p>;
  }

  return (
    <div className="relative w-full">
      <SwiperCarousel
        data={jobs}
        swiperRef={swiperRef}
        setIsPaginationActive={setIsPaginationActive}
      />

      {isPaginationActive && (
        <BtnSwiper
          swiperRef={swiperRef}
          isPressedBtn1={isPressedBtn1}
          isPressedBtn2={isPressedBtn2}
          setIsPressedBtn1={setIsPressedBtn1}
          setIsPressedBtn2={setIsPressedBtn2}
        />
      )}
    </div>
  );
}
