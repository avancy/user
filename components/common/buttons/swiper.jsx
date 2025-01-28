import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function BtnSwiper({
  swiperRef,
  isPressedBtn1,
  isPressedBtn2,
  setIsPressedBtn1,
  setIsPressedBtn2,
}) {
  return (
    <div className="flex sm:items-center sm:justify-center">
      <div className="flex w-full lg:w-[115px] lg:gap-[11px] pt-4 lg:absolute z-10 lg:-top-12 lg:right-8 sm:max-w-[348px] lg:mr-auto">
        <button
          className={`flex flex-1 border border-gray-500 lg:w-[52px] lg:h-[52px] items-center bg-white justify-center rounded-l-md lg:rounded-md py-3 shadow-lg transition-transform duration-200 lg:hover:scale-95 ${
            isPressedBtn1 ? 'scale-95' : ''
          }`}
          onMouseDown={() => setIsPressedBtn1(true)}
          onMouseUp={() => setIsPressedBtn1(false)}
          onMouseLeave={() => setIsPressedBtn1(false)}
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>

        <button
          className={`flex flex-1 items-center lg:w-[52px] lg:h-[52px] justify-center rounded-r-md lg:rounded-md bg-primary py-3 shadow-lg transition-transform duration-200 lg:hover:scale-95 ${
            isPressedBtn2 ? 'scale-95' : ''
          }`}
          onMouseDown={() => setIsPressedBtn2(true)}
          onMouseUp={() => setIsPressedBtn2(false)}
          onMouseLeave={() => setIsPressedBtn2(false)}
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <ChevronRightIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
