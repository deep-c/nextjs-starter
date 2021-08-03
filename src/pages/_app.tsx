import { ApolloProvider } from '@apollo/client';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'next-auth/client';

import Auth, { AuthProps } from 'src/components/Auth';
import { AppInitialState, useApollo } from 'src/graphql/client';

import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';
import type { FC, FunctionComponent } from 'react';

import '../styles/globals.css';

export interface MyAppProps extends AppProps {
  Component: NextComponentType<
    NextPageContext,
    Record<string, unknown>,
    Record<string, unknown>
  > & {
    auth?: AuthProps;
    layout?: FunctionComponent;
  };
  pageProps: {
    initialApolloState: AppInitialState;
    session: Session;
  };
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState);
  const Layout = Component.layout ?? (({ children }) => <>{children}</>);
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
};
export default MyApp;
