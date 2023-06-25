// Bootstrap CSS features
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../styles/scss/global.scss';

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

import Header from '../components/Header.js';

export default function MyApp({ Component, pageProps, session }) {
  // Boostrap JS features
  useEffect(() => {
    import('../node_modules/bootstrap/dist/js/bootstrap.js');
  }, []);

  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
