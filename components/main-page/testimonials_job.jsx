import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Container } from '../common/container';
import { useState, useEffect } from 'react';

function CustomNextArrow({ onClick }) {
  return (
    <div className="absolute z-20 p-2 cursor-pointer -bottom-16 right-4" onClick={onClick}>
      <ChevronRightIcon className="w-10 h-10 text-primary" />
    </div>
  );
}

function CustomPrevArrow({ onClick }) {
  return (
    <div className="absolute z-20 p-2 cursor-pointer -bottom-16 right-16" onClick={onClick}>
      <ChevronLeftIcon className="w-10 h-10 text-primary" />
    </div>
  );
}

function Testimonial({ avatar, name, role, text }) {
  const [deviceSize, setDeviceSize] = useState(0);

  let maxCharacters = 0;

  if (deviceSize <= 320) {
    maxCharacters = 275;
  } else if (deviceSize <= 528) {
    maxCharacters = 300;
  } else if (deviceSize <= 1200) {
    maxCharacters = 425;
  } else {
    maxCharacters = 450;
  }

  useEffect(() => {
    function handleResize() {
      setDeviceSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);

  const [expanded, setExpanded] = useState(false);

  let textFormatted = expanded ? text : text.substring(0, maxCharacters);

  function expandText() {
    setExpanded(!expanded);
  }

  return (
    <div
      className={`p-4 bg-white w-auto flex flex-col mx-6 rounded-lg shadow-md ${
        expanded ? 'h-auto' : ' h-[30rem] md:h-[30rem] lg:h-[20rem]'
      }`}
    >
      <div className="flex items-start gap-3">
        <Image
          src={avatar}
          alt="Avatar"
          width={100}
          height={100}
          className="object-center p-2 rounded-full w-14 h-14"
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-primary">{name}</h3>
          <p className="text-sm">{role}</p>
        </div>
      </div>
      <div className={`mt-10 max-w-max ${expanded ? 'max-h-max' : 'lg:max-h-48 '}`}>
        {text.length > maxCharacters ? (
          <div>
            <p className="max-h-full overflow-hidden text-ellipsis ...">
              {textFormatted}
              {!expanded && '... '}
              <button onClick={expandText} type="button" className="font-bold text-black underline">
                {expanded ? ` mostrar menos` : ` mostrar mais`}
              </button>
            </p>
          </div>
        ) : (
          <p className="max-h-full overflow-hidden text-ellipsis ...">{text}</p>
        )}
      </div>
    </div>
  );
}

export function Testimonials({ testimonies }) {
  const testimonialsData = [...testimonies].map((t, i) => ({
    avatar: t.f_photo.url,
    name: t.name,
    role: t.office,
    text: t.description,
  }));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
          nextArrow: false,
          prevArrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: true,
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false,
        },
      },
    ],
  };

  return (
    <Container className="lg:mb-36">
      <div className="flex flex-col gap-8 ">
        <h2 className="relative text-2xl font-medium text-center text-black md:text-3xl lg:text-4xl">
          O que nossos funcionários dizem:
        </h2>
      </div>

      <div className="relative my-10">
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="flex items-center justify-center h-auto gap-10 my-10">
              <Testimonial key={index} {...testimonial} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
}
