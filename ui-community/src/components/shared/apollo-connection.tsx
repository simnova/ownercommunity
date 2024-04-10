import { FC, useEffect } from 'react';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';

import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { setContext } from '@apollo/client/link/context';
import { useAuth } from 'react-oidc-context';


export interface AuthProps {
  AuthenticationIdentifier?: string
}

const ApolloConnection: FC<any> = (props) => {
  const auth = useAuth()

  const hasAuth = props.AuthenticationIdentifier !== null && typeof props.AuthenticationIdentifier !== "undefined";
  
  const withToken = setContext(async (_, { headers }) => {
    if(hasAuth){
      const access_token = auth.user?.access_token;
      console.log('auth-token',access_token);
      const returnHeaders = {...headers};
      if(access_token){ returnHeaders['Authorization'] = `Bearer ${access_token}`; }
      if(localStorage.getItem('community') !== null){ returnHeaders['community'] = localStorage.getItem('community')?.replaceAll('"',''); }
      console.log('returnHeaders',returnHeaders);
      return {headers: returnHeaders};
    } else {
      return {
        headers: {
          ...headers
        },
      };
    }
  });



  const httpLink = new BatchHttpLink({ 
    uri: `${import.meta.env.VITE_FUNCTION_ENDPOINT}`,
    batchMax: 15, // No more than 15 operations per batch
    batchInterval: 50 // Wait no more than 50ms after first batched operation
  });

  const countryLink = new HttpLink({
    uri: "https://countries.trevorblades.com/",
  })

 
  const client = new ApolloClient({
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === 'country',
      countryLink,
      from([withToken, httpLink])
    ),
    cache: new InMemoryCache(),
    connectToDevTools: import.meta.env.NODE_ENV !== 'production',
  });

  useEffect(() => {
    const updateCache = async():Promise<void> => {
      if(hasAuth && client && !auth.isAuthenticated){ 
        try{  // will throw exception if not connected
          await client.resetStore(); //clear Apollo cache when user logs off
        } catch(err){
          if(err instanceof Error && err.message !== 'Failed to fetch'){
            console.error("Apollo Reset error",err);
          }
        }
      }
    }
    updateCache().catch(e => console.error(e));
  }, [auth.isAuthenticated,hasAuth, props.AuthenticationIdentifier,client]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloConnection;