import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(props) {
  let pageProps = props.__NEXT_DATA__?.props?.pageProps;

  return (
    <Html
      className="h-full scroll-smooth bg-white antialiased font-sans [font-feature-settings:'ss01']"
      lang="pt-br"
    >
      <Head>
        <link rel="shortcut icon" href="/favicon-v2.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className="flex flex-col h-full"
        style={{
          '--color-primary': '#009a9c',
          '--color-secondary': '#01b7c6',
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
