import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container } from '../common/container';
import avancy from '@/images/avancy-gray.svg';

export function GallerySection({ gallery, name = '' }) {
  const [columns, setColumns] = useState(gallery.length);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 600) {
        setColumns(1);
      } else if (window.innerWidth < 940) {
        setColumns(2);
      } else {
        setColumns(gallery.length);
      }
    };

    window.addEventListener('resize', updateColumns);

    updateColumns();

    return () => window.removeEventListener('resize', updateColumns);
  }, [gallery.length]);

  return (
    <Container className="py-20">
      <section className="flex justify-center flex-grow p-4">
        <div className="flex flex-col items-center justify-center w-full md:w-3/6 lg:w-1/2">
          <h1 className="relative text-2xl font-medium text-center text-black md:text-3xl lg:text-4xl">
            Conheca mais sobre a Empresa
          </h1>
        </div>
      </section>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {gallery.map((g, i) => (
          <div
            key={i}
            className={`flex justify-center align-middle h-72 ${gallery.length >= 4 ? 'w-full' : 'w-72'} rounded-lg overflow-hidden shadow-sm`}
          >
            <Image
              alt={g?.f_name || ''}
              src={g?.f_photo?.url || ''}
              width="10"
              height="10"
              className={`h-full object-center object-cover w-auto`}
              unoptimized
              onError={(e) => {
                e.target.src = avancy.src;
              }}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
