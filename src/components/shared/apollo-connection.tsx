import { FC, useEffect } from 'react';

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';

import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import { useMsal } from './msal-react-lite';

export interface AuthProps {
  AuthenticationIdentifier?: string;
}

const ApolloConnection: FC<any> = (props) => {
  const { getSilentAuthResult, getIsLoggedIn } = useMsal();

  const hasAuth = props.AuthenticationIdentifier !== null && typeof props.AuthenticationIdentifier !== 'undefined';

  const withToken = setContext(async (_, { headers }) => {
    if (hasAuth) {
      const token = await getSilentAuthResult(props.AuthenticationIdentifier);
      console.log('auth-token', token);
      const returnHeaders = { ...headers };
      if (token?.accessToken) {
        returnHeaders['Authorization'] = `Bearer ${token.accessToken}`;
      }
      if (localStorage.getItem('community') !== null) {
        returnHeaders['community'] = localStorage.getItem('community')?.replaceAll('"', '');
      }
      console.log('returnHeaders', returnHeaders);
      return { headers: returnHeaders };
      /*
      return {
        
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token.accessToken}` : null,
          community: localStorage.getItem('community')?.replaceAll('"','') || null
        },
      };
      */
    } else {
      return {
        headers: {
          ...headers
        }
      };
    }
  });

  const httpLink = new BatchHttpLink({
    uri: `${import.meta.env.VITE_FUNCTION_ENDPOINT}`,
    batchMax: 15, // No more than 15 operations per batch
    batchInterval: 50 // Wait no more than 50ms after first batched operation
  });

  const countryLink = new HttpLink({
    uri: 'https://countries.trevorblades.com/'
  });

  const client = new ApolloClient({
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === 'country',
      countryLink,
      from([withToken, httpLink])
    ),
    cache: new InMemoryCache(),
    connectToDevTools: import.meta.env.NODE_ENV !== 'production'
  });

  useEffect(() => {
    const updateCache = async (): Promise<void> => {
      if (hasAuth && client && !getIsLoggedIn(props.AuthenticationIdentifier)) {
        try {
          // will throw exception if not connected
          await client.resetStore(); //clear Apollo cache when user logs off
        } catch (err) {
          if (err instanceof Error && err.message !== 'Failed to fetch') {
            console.error('Apollo Reset error', err);
          }
        }
      }
    };
    updateCache().catch((e) => console.error(e));
  }, [getIsLoggedIn, hasAuth, props.AuthenticationIdentifier, client]); // eslint-disable-line react-hooks/exhaustive-deps

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloConnection;
