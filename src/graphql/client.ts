import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { useMemo } from 'react';

import { GRAPHQL_V1_API } from 'src/common/routes';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export type AppInitialState = null | NormalizedCacheObject;

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            sessions: relayStylePagination(),
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

export const initializeApollo = (
  initialState: AppInitialState
): ApolloClient<NormalizedCacheObject> => {
  const client = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = client.extract();
    client.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === 'undefined') return client;
  if (!apolloClient) apolloClient = client;
  return client;
};

export const useApollo = (
  initialState: AppInitialState
): ApolloClient<NormalizedCacheObject> => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
