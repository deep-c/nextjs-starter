import '../styles/globals.css';
import type { FunctionComponent, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'next-auth/client';
import Auth, { AuthProps } from '@/components/Auth';

export interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & {
    auth?: AuthProps;
    layout?: FunctionComponent;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout =
    Component.layout ?? ((children: ReactNode) => <>{children}</>);
  return (
    <Provider session={pageProps.session}>
      {Component.auth ? (
        <Auth {...Component.auth}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}
export default MyApp;
