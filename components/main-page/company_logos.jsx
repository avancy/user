import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

export default function CompanyLogos({ child_companies_logo, company_name }) {
  const removeLogos = [
    '3aa7726a-a961-4575-bde1-01499504e66f',
    '43c0339e-19cf-4834-b316-11af8b457a40',
  ];

  const filteredLogos = child_companies_logo.filter(
    (logo) => !removeLogos.includes(logo.CompanyId),
  );

  return (
    <section className="flex flex-col items-center w-full py-20">
      <div className="flex justify-center flex-grow p-4">
        <h1 className="relative text-2xl font-medium text-center text-black md:text-3xl lg:text-4xl bg-secundary bg-clip-text">
          Empresas que usam {company_name}
        </h1>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        grabCursor={true}
        loop={true}
        centeredSlides={false}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="max-w-7xl mt-10 h-[10rem] md:h-[20rem] relative w-[90%] flex items-center justify-center"
        initialSlide={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {filteredLogos.map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center h-full p-2 md:mx-0">
            <div
              className="h-full shadow-lg flex transform items-center justify-center mx-auto p-2 transition-transform
        hover:scale-105 w-[12.625rem] md:w-[17.5rem] rounded-md"
            >
              <Image
                src={logo?.Url}
                unoptimized={true}
                alt="Logo da empresa"
                width={1}
                height={1}
                className="w-[120px] h-auto lg:w-[240px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
