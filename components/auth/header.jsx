import MavieloLogo from '@/public/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <header className="flex flex-col items-center w-full">
      <div className="py-6">
        <Link href={'https://mavielorh.com.br/'}>
          <Image priority src={MavieloLogo} alt="Logo MavieloRH" className="w-auto h-11" />
        </Link>
      </div>

      <hr className="w-[85%] border-t-2 border-gray-100" />
    </header>
  );
}
