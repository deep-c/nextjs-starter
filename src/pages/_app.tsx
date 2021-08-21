import { ApolloProvider } from '@apollo/client';
import { Provider } from 'next-auth/client';
import dynamic from 'next/dynamic';

import { AppInitialState, useApollo } from 'src/graphql/client';
import Auth, { AuthProps } from 'src/modules/auth/components/Auth';

import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { Toaster as ToasterComponent } from 'react-hot-toast';
import type { ExtractFCProps } from 'src/common/types/utils';
import 'src/common/styles/globals.css';

type NextPagePropsExtra = {
  initialApolloState: AppInitialState;
  session: Session;
};

export type GetLayoutFn = (
  page: ReactElement,
  layoutProps: { session: Session }
) => ReactNode;

export type NextPageWithExtra = NextPage & {
  auth?: AuthProps;
  getLayout?: GetLayoutFn;
};

export type AppPropsWithExtra<P = unknown> = {
  Component: NextPageWithExtra;
  pageProps: P;
} & Omit<AppProps<P>, 'pageProps'>;

const Toaster: React.ComponentType<ExtractFCProps<typeof ToasterComponent>> =
  dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster));

const MyApp = ({
  Component,
  pageProps,
}: AppPropsWithExtra<NextPagePropsExtra>): React.ReactElement => {
  const client = useApollo(pageProps.initialApolloState);
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Toaster position="top-right" />
        {Component.auth ? (
          <Auth {...Component.auth}>
            {getLayout(<Component {...pageProps} />, {
              session: pageProps.session,
            })}
          </Auth>
        ) : (
          getLayout(<Component {...pageProps} />, {
            session: pageProps.session,
          })
        )}
      </ApolloProvider>
    </Provider>
  );
};
export default MyApp;
