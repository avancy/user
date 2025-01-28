import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import JobCard from './job_card';

export default function SwiperCarousel({ data, swiperRef, setIsPaginationActive }) {
  return (
    <Swiper
      ref={swiperRef}
      onResize={(swiper) => {
        setIsPaginationActive(!swiper.pagination.el.classList.contains('swiper-pagination-lock'));
      }}
      onInit={(swiper) => {
        setIsPaginationActive(!swiper.pagination.el.classList.contains('swiper-pagination-lock'));
      }}
      modules={[Navigation, Pagination, A11y]}
      grabCursor={true}
      loop={true}
      centeredSlides={false}
      slidesPerView={1.1}
      breakpoints={{
        768: { slidesPerView: 2.2 },
        878: {slidesPerView: 2.4},
        1024: {slidesPerView: 2.6},
        1108: {slidesPerView: 2.8},
        1208: {slidesPerView: 3.2},
        1280: {slidesPerView: 2.8},
        1392: {slidesPerView: 3.2},
        1530: {slidesPerView: 3.4},
        1654: {slidesPerView: 3.8},
        1792: {slidesPerView: 4.2},
        1948: {slidesPerView: 4.8},
        2142: {slidesPerView: 5.2},
        2352: {slidesPerView: 5.8},
        2780: {slidesPerView: 6.2},
      }}
      pagination={{
        dynamicBullets: true,
        dynamicMainBullets: 4,
      }}
      className="flex"
      initialSlide={0}
    >
      {data?.map((item, i) => (
        <SwiperSlide className="flex mt-3 p-7" key={`${i} - ${item.title}`}>
          <JobCard
            job={item?.job}
            job_proposal={item?.job_proposal || null}
            stage={item?.stage}
            c={item?.required_disc}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
