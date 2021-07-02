import '../styles/globals.css';
import type { FunctionComponent, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'next-auth/client';
import Auth, { AuthProps } from '@/components/Auth';
import { useApollo } from '@/graphql/client';

export interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & {
    auth?: AuthProps;
    layout?: FunctionComponent;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const client = useApollo(pageProps.initialApolloState);
  const Layout =
    Component.layout ?? ((children: ReactNode) => <>{children}</>);
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        {Component.auth ? (
          <Auth {...Component.auth}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
