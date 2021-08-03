import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { useMemo } from 'react';

import { GRAPHQL_V1_API } from 'src/routes';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export type AppInitialState = null | NormalizedCacheObject;

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            users: relayStylePagination(),
          },
        },
      },
    }),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HOST + GRAPHQL_V1_API.path,
    }),
    ssrMode: typeof window === 'undefined',
  });
}

export const initializeApollo = (
  initialState: AppInitialState
): ApolloClient<NormalizedCacheObject> => {
  const client = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use
  // Apollo Client, the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();
    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    client.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;
  return client;
};

export const useApollo = (
  initialState: AppInitialState
): ApolloClient<NormalizedCacheObject> => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
