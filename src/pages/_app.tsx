import { ApolloProvider } from '@apollo/client';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import type { FC, FunctionComponent } from 'react';
import Auth, { AuthProps } from 'src/components/Auth';
import { useApollo } from 'src/graphql/client';
import '../styles/globals.css';

export interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & {
    auth?: AuthProps;
    layout?: FunctionComponent;
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
