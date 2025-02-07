import SignupBanner from '@/public/svgs/banners/signup_banner.svg';
import LogoGreen from '@/public/images/logo_green.svg';
import Image from 'next/image';
import AuthHeader from '../auth/header';

export function AuthLayout({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div>
          <AuthHeader />
        </div>
        <div className={`flex flex-1 bg-center bg-no-repeat bg-cover`}>
          <main className="relative flex flex-col justify-center flex-1 h-full max-h-full px-4 sm:px-6 lg:px-8">
            <Image
              src={LogoGreen}
              alt="Logo da tela de login"
              height={100}
              width={100}
              className="absolute w-full h-auto transform -translate-x-1/2 -translate-y-1/2 -z-10 top-1/2 left-1/2"
            />
            {children}
          </main>
          <div className="justify-end flex-1 hidden h-full max-w-full max-h-full overflow-hidden lg:flex">
            <Image
              className="object-cover h-full max-w-[75%] w-full max-h-full"
              alt="Banner da tela de registro"
              src={SignupBanner}
              width={100}
              height={100}
              unoptimized
            />
          </div>
        </div>
      </div>
    </>
  );
}
