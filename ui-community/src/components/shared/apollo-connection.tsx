import { from, ApolloLink, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { FC, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';
import {
  ApolloLinkToAddAuthHeader,
  ApolloLinkToAddCustomHeader,
  client,
  BaseApolloLink,
  TerminatingApolloBatchLinkForGraphqlServer,
  TerminatingApolloHttpLinkForGraphqlServer
} from './apollo-client-links';

export interface ApolloConnectionProps {
  children: React.ReactNode;
}
export const ApolloConnection: FC<ApolloConnectionProps> = (props: ApolloConnectionProps) => {
  const auth = useAuth();
  const params = useParams(); // useParams.memberId won't work here because ApolloConnection wraps the Routes, not inside a Route
  const communityId = params['*']?.slice(0, 24) ?? null;
  const memberId = params['*']?.match(/(member|admin)\/([\w\d]+)/)?.[2] ?? null;

  const apolloLinkChainForGraphqlDataSourceCacheDisabled = from([
    BaseApolloLink(),
    ApolloLinkToAddAuthHeader(auth),
    ApolloLinkToAddCustomHeader('community', communityId, communityId !== 'accounts'),
    ApolloLinkToAddCustomHeader('member', memberId),
    ApolloLinkToAddCustomHeader('cache-enabled', 'false'),
    TerminatingApolloBatchLinkForGraphqlServer({
      uri: `${import.meta.env.VITE_FUNCTION_ENDPOINT}`,
      batchMax: 15,
      batchInterval: 50
    })
  ]);

  const apolloLinkChainForGraphqlDataSourceCacheEnabled = from([
    BaseApolloLink(),
    ApolloLinkToAddAuthHeader(auth),
    ApolloLinkToAddCustomHeader('community', communityId, communityId !== 'accounts'),
    ApolloLinkToAddCustomHeader('member', memberId),
    ApolloLinkToAddCustomHeader('cache-enabled', 'true'),
    TerminatingApolloHttpLinkForGraphqlServer({
      uri: `${import.meta.env.VITE_FUNCTION_ENDPOINT}`
    })
  ]);

  const apolloLinkChainForCountryDataSource = from([
    new RestLink({
      uri: 'https://countries.trevorblades.com/'
    })
  ]);

  const linkMap = {
    CountryDetails: apolloLinkChainForCountryDataSource,
    cacheEnabled: apolloLinkChainForGraphqlDataSourceCacheEnabled,
    default: apolloLinkChainForGraphqlDataSourceCacheDisabled
  };

  const updateLink = () => {
    return ApolloLink.from([
      ApolloLink.split(
        // various options to split:
        // 1. use a custom property in context: (operation) => operation.getContext().dataSource === some DataSourceEnum,
        // 2. check for string name of the query if it is named: (operation) => operation.operationName === "CountryDetails",
        (operation) => {
          const operationContext = operation.getContext();
          const cacheHeader = operationContext.headers?.['cache-enabled'];
          return cacheHeader === 'true';
        },
        linkMap.cacheEnabled,
        ApolloLink.split(
          (operation) => operation.operationName in linkMap,
          new ApolloLink((operation, forward) => {
            const link = linkMap[operation.operationName as keyof typeof linkMap] || linkMap.default;
            return link.request(operation, forward);
          }),
          linkMap.default
        )
      )
    ]);
  };

  useEffect(() => {
    client.setLink(updateLink());
  }, [auth]);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
