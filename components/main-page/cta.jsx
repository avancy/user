import Image from 'next/image';

import { ThinkIcon } from '@/images/icons/ThinkIcon';
import { HeartIcon } from '@/images/icons/HeartIcon';
import { TargetArrowIcon } from '@/images/icons/TargetArrowIcon';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const renderCard = (icon, title, description) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex items-center w-full gap-5 mt-8 text-gray-900">
      <div className="hidden md:block">{icon}</div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold ">{title}</h3>

        <div>
          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out grid ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            {description
              ?.split('\n')
              .filter((p) => p.trim() !== '')
              .map((p, index) => {
                return description.length < 156 ? (
                  <p key={index} className="h-full font-normal text-justify text-black">
                    {p}
                  </p>
                ) : (
                  <p
                    key={index}
                    className={`${expanded ? 'h-full' : 'h-12'} overflow-hidden font-normal text-justify text-black`}
                  >
                    {p}
                  </p>
                );
              })}
            {!expanded && description.length > 156 && (
              <div className="absolute inset-0 h-full pointer-events-none bg-gradient-to-t from-white/50 to-transparent"></div>
            )}
          </div>

          {description && description.length > 156 && (
            <button
              onClick={toggleExpanded}
              className="self-start font-bold text-black underline transition-all duration-500 ease-in-out"
            >
              {expanded ? 'Mostrar menos' : 'Mostrar mais'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function AboutUs({ about, about_image, mission, vision, values }) {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef(null);
  const [initialHeight, setInitialHeight] = useState('0');
  const [contentHeight, setContentHeight] = useState('0px');

  const handleLoadImage = (e) => {
    const imageHeight = e.target.clientHeight;
    setInitialHeight(`${imageHeight / 2}`);
  };

  useEffect(() => {
    if (textRef.current) {
      const fullContentHeight = textRef.current.scrollHeight;
      if (initialHeight !== '0px') {
        setContentHeight(expanded ? `${fullContentHeight}px` : `${initialHeight}px`);
      }
    }
  }, [expanded, initialHeight]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center w-full max-w-6xl px-4">
        <div className="flex flex-col items-start flex-1 h-auto gap-5 md:gap-10 lg:gap-15 lg:flex-row">
          <div className="flex items-start justify-center w-full lg:justify-end lg:w-1/2">
            {about_image && (
              <Image
                width="510"
                height="800"
                className="rounded-b-4xl h-[400px] w-[300px] md:h-[600px] md:w-[400px] lg:h-[800px] lg:w-[510px] object-cover"
                src={about_image?.url}
                alt="imagem de apresentação"
                onLoad={handleLoadImage}
                unoptimized
              />
            )}
          </div>
          <div className="flex flex-col w-full lg:w-1/2">
            <div className="flex flex-col w-full gap-2 mt-4">
              <div
                ref={textRef}
                className="relative overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: contentHeight }}
              >
                {about
                  ?.split('\n')
                  .filter((p) => p.trim() !== '')
                  .map((p, index) => (
                    <p
                      key={index}
                      className="mb-4 text-sm font-medium text-justify text-black indent-8"
                    >
                      {p}
                    </p>
                  ))}
                {!expanded && (
                  <div className="absolute inset-0 h-full pointer-events-none bg-gradient-to-t from-white/50 to-transparent"></div>
                )}
              </div>

              {about && about.length > 0 && (
                <button
                  onClick={toggleExpanded}
                  className="self-start font-bold text-black underline transition-all duration-500 ease-in-out"
                >
                  {expanded ? 'Mostrar menos' : 'Mostrar mais'}
                </button>
              )}

              <div className="flex flex-col items-center">
                {mission &&
                  renderCard(<TargetArrowIcon className="text-primary" />, 'Missão', mission)}
                {vision && renderCard(<ThinkIcon className="text-primary" />, 'Visão', vision)}
                {values && renderCard(<HeartIcon className="text-primary" />, 'Valores', values)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTA(props) {
  return (
    <div
      id="about"
      className={` ${props.about_image ? 'container flex flex-col h-auto gap-20 py-20 mx-auto' : 'max-w-4xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8'} `}
    >
      <div>
        <h2 className="relative text-2xl font-medium text-center text-black md:text-3xl lg:text-4xl bg-clip-text">
          Sobre Nós
        </h2>
      </div>
      {props.about_image ? (
        <AboutUs {...props} />
      ) : (
        <p className="px-4 py-10 mb-4 text-sm font-medium text-justify text-black indent-8">
          {props.about}
        </p>
      )}
    </div>
  );
}
