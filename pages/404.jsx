import Head from 'next/head';
import { Lottie404 } from '@/components/lottie-ui';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon-v2.ico" />
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
        <title>Mavielo RH</title>
      </Head>
      <main className="">
        <div className="flex flex-col items-center justify-center ">
          <Lottie404 />
          <div className="absolute top-[26rem] flex justify-center flex-col items-center ">
            <h1 className="text-4xl font-bold text-gray-900">Ops! Página não encontrada</h1>
            <p className="max-w-2xl mt-4 text-lg text-center text-gray-600">
              Desculpe, a página que você está procurando não foi encontrada. Verifique o URL ou
              entre em contato conosco para obter assistência.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-semibold text-indigo-600 hover:underline"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Voltar para a página inicial
              </Link>
            </div>
            <div className="mt-2">
              <Link
                target="_blank"
                href="https://wa.me/5566996280492?text=Tive+um+erro+no site, poderia me ajudar?"
                className="flex items-center gap-2 text-lg text-indigo-600 hover:underline"
              >
                <PhoneIcon className="w-5 h-5" /> Entre em contato conosco
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
