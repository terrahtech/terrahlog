// import { AppProps } from 'next/app';
// import Head from 'next/head';
// import { Poppins } from 'next/font/google';
// import '../styles/globals.css';
// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '600', '700'],
//   variable: '--font-poppins',
// });
// import { Provider } from 'react-redux';
// import { store } from '../store/store';

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <Component {...pageProps} />
//     </>
//   );
// }


import { AppProps } from 'next/app';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <main className={poppins.variable}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}
