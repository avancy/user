import { useRouter } from 'next/router';
import Image from 'next/image';
import Banner from '../../images/banner-site.png';

export function Hero({ company_name, text, banner }) {
  const router = useRouter();

  return (
    <div className="relative opacity-90 rounded-b-4xl bg-gradient-to-r from-primary to-transparent">
      <div className="absolute inset-0 z-10 rounded-b-4xl" />
      <Image
        src={banner?.url || Banner}
        alt="Banner da Empressa"
        width={100}
        height={100}
        className="object-cover w-full min-h-[200px] md:h-[87.5vh] rounded-b-4xl"
        unoptimized
      />
      <div className="absolute inset-0 z-10 opacity-90 rounded-b-4xl bg-gradient-to-r from-primary to-transparent" />

      <div className="absolute inset-0 z-20 flex items-center justify-start px-10">
        <div className="max-w-3xl py-3 text-center md:w-full md:text-left">
          <h1 className="mb-4 text-lg font-bold text-white md:text-5xl lg:text-6xl">
            {text ? text : `${company_name} - Venha fazer parte da nossa equipe!`}
          </h1>

          <div className="flex items-center justify-center mt-10 sm:justify-start">
            <button
              onClick={() => {
                router.push('#jobs');
              }}
              className="text-primary bg-white transition-all hover:scale-105 active:scale-95 font-bold hover:text-white hover:bg-secundary duration-300 px-4 md:px-11 py-1 md:py-2.5 lg:py-2.5  md:w-auto inline-block rounded-full"
            >
              Encontrar vagas!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
