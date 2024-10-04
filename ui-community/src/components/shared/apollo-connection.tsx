import { FC, useEffect } from 'react';

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';

import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';

const countryLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/'
});


const httpLink = new BatchHttpLink({
  uri: `${import.meta.env.VITE_FUNCTION_ENDPOINT}`,
  batchMax: 15, // No more than 15 operations per batch
  batchInterval: 50 // Wait no more than 50ms after first batched operation
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.NODE_ENV !== 'production'
});

const ApolloConnection: FC<any> = (props) => {
  const auth = useAuth();
  const params = useParams(); // useParams.memberId won't work here because ApolloConnection wraps the Routes, not inside a Route

  const withToken = setContext(async (_, { headers }) => {
      return getAuthHeaders(headers);
   
  });

  const getAuthHeaders = async (headers: any) => {
    if(auth.isAuthenticated !== true) {
      return {
        headers: {
          ...headers
        }
      };
    }
    const access_token = auth.user?.access_token;
    console.log('auth-token', access_token);
    const returnHeaders = { ...headers };
    if (access_token) {
      returnHeaders['Authorization'] = `Bearer ${access_token}`;
    }
    console.log('params ', params['*']?.slice(0, 24));
    const communityId = params['*']?.slice(0, 24) ?? null;
    if (communityId !== null && communityId !== 'accounts') {
      returnHeaders['community'] = communityId;
    }
    const memberId = params['*']?.match(/(member|admin)\/([\w\d]+)/)?.[2] ?? null;
    if (memberId !== null) {
      returnHeaders['member'] = memberId;
    }
    console.log('returnHeaders', returnHeaders);
    return { headers: returnHeaders };
  };


  useEffect(() => {
    client.setLink(ApolloLink.split(
      (operation) => operation.getContext().clientName === 'country',
      countryLink,
      from([withToken, httpLink])
    ));
  },[auth]);

  console.log('ApolloConnection > client', client.link);
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloConnection;
