import React, { FC, useEffect } from 'react';

import {
  HttpLink,
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  from,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { useMsal } from './msal-react-lite';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { mergeDeep } from '@apollo/client/utilities';
import { Environment, FetchFunction, Network, Observable, RecordSource, Store } from 'relay-runtime';
import { RelayEnvironmentProvider } from 'react-relay';

export interface AuthProps {
  AuthenticationIdentifier?: string
}

const RelayConnection: FC<any> = (props) => {
  const { getAuthToken,getSilentAuthResult, getIsLoggedIn } = useMsal();

  const hasAuth = props.AuthenticationIdentifier !== null && typeof props.AuthenticationIdentifier !== "undefined";
  
  var headers: [string,string][] = [
    ["Content-Type", "application/json"],
  ];

  if (hasAuth) {
    getSilentAuthResult(props.AuthenticationIdentifier)
      .then( (token) => {
        console.log('relay auth-token',token);
        if(token && token.accessToken){ headers.push(['Authorization', `Bearer ${token.accessToken}`]) }
        if(localStorage.getItem('community') !== null){ headers.push(['community', localStorage.getItem('community')?.replaceAll('"','') ?? ""]) }
        console.log('headers', headers);
      })
  }

  const HTTP_ENDPOINT = process.env.REACT_APP_FUNCTION_ENDPOINT ?? "/api/graphql"

  const fetchFn: FetchFunction = (params, variables) => {
    console.log("fetch headers", headers)
    const response = fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    return Observable.from(response.then((data) => data.json()));
  };

  const network = Network.create(fetchFn);
  const store = new Store(new RecordSource());
  const RelayEnvironment = new Environment({ store, network });


  // const httpLink = new BatchHttpLink({ 
  //   uri: `${process.env.REACT_APP_FUNCTION_ENDPOINT}`,
  //   batchMax: 15, // No more than 15 operations per batch
  //   batchInterval: 50 // Wait no more than 50ms after first batched operation
  // });

  // const countryLink = new HttpLink({
  //   uri: "https://countries.trevorblades.com/",
  // })

 
  // const client = new ApolloClient({
  //   link: ApolloLink.split(
  //     (operation) => operation.getContext().clientName === 'country',
  //     countryLink,
  //     from([withToken, httpLink])
  //   ),
  //   cache: new InMemoryCache(),
  //   connectToDevTools: process.env.NODE_ENV !== 'production',
  // });

  // useEffect(() => {
  //   const updateCache = async():Promise<void> => {
  //     if(hasAuth && client && !getIsLoggedIn(props.AuthenticationIdentifier)){ 
  //       try{  // will throw exception if not connected
  //         await client.resetStore(); //clear Apollo cache when user logs off
  //       } catch(err){
  //         if(err instanceof Error && err.message !== 'Failed to fetch'){
  //           console.error("Apollo Reset error",err);
  //         }
  //       }
  //     }
  //   }
  //   updateCache().catch(e => console.error(e));
  // }, [getIsLoggedIn,hasAuth, props.AuthenticationIdentifier,client]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return <RelayEnvironmentProvider environment={RelayEnvironment}>
    {props.children}
  </RelayEnvironmentProvider>;
};

export default RelayConnection;