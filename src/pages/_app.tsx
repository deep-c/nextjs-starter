import { ApolloProvider } from '@apollo/client';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'next-auth/client';
import { Toaster } from 'react-hot-toast';

import Auth, { AuthProps } from 'src/components/Auth';
import { AppInitialState, useApollo } from 'src/graphql/client';

import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';
import type { FunctionComponent } from 'react';

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

const MyApp = ({ Component, pageProps }: MyAppProps): React.ReactElement => {
  const client = useApollo(pageProps.initialApolloState);
  const Layout = Component.layout ?? (({ children }) => <>{children}</>);
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Toaster position="top-right" />
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
