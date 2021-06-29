import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'next-auth/client';
import Auth, { AuthProps } from '@/components/auth';

export interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & { auth: AuthProps };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Provider session={pageProps.session}>
      {Component.auth ? (
        <Auth {...Component.auth}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}
export default MyApp;
