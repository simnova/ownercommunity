import { from, ApolloLink, ApolloProvider } from "@apollo/client";
import { RestLink } from 'apollo-link-rest';
import { FC, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router-dom";
import { ApolloLinkToAddAuthHeader, ApolloLinkToAddCustomHeader, client, BaseApolloLink, TerminatingApolloLinkForGraphqlServer } from "./apollo-client-links";


export enum DataSourceEnum {
  country = 'country',
  graphql = 'graphql'
}

export interface ApolloConnectionProps {
  children: React.ReactNode;
}
export const ApolloConnection: FC<ApolloConnectionProps> = (props: ApolloConnectionProps) => {
  const auth = useAuth();
  const params = useParams(); // useParams.memberId won't work here because ApolloConnection wraps the Routes, not inside a Route
  const communityId = params['*']?.slice(0, 24) ?? null;
  const memberId = params['*']?.match(/(member|admin)\/([\w\d]+)/)?.[2] ?? null;


  const apolloLinkChainForGraphqlDataSource = from([
    BaseApolloLink(),
    ApolloLinkToAddAuthHeader(auth),
    ApolloLinkToAddCustomHeader('community', communityId, (communityId !== 'accounts')),
    ApolloLinkToAddCustomHeader('member', memberId),
    TerminatingApolloLinkForGraphqlServer({
      uri: `${import.meta.env.VITE_FUNCTION_ENDPOINT}`,
      batchMax: 15,
      batchInterval: 50
    })
  ]);

  const apolloLinkChainForCountryDataSource = from([
    new RestLink({
      uri: 'https://countries.trevorblades.com/'
    })
  ]);

  const dataSources = new Map<DataSourceEnum, ApolloLink>([
    [DataSourceEnum.country, apolloLinkChainForCountryDataSource],
    [DataSourceEnum.graphql, apolloLinkChainForGraphqlDataSource]
  ]);

  const updateLink = () => {
    const link = ApolloLink.split(
      // various options to split:
      // 1. use a custom property in context: (operation) => operation.getContext().dataSource === DataSourceEnum.country,
      // 2. check for string name of the query if it is named: (operation) => operation.operationName === "CountryDetails",
      (operation) => operation.operationName === "CountryDetails",
      dataSources.get(DataSourceEnum.country)!,
      // you can add more nested split links here
      // and make the graphql link the default
      dataSources.get(DataSourceEnum.graphql)
    ) as ApolloLink;

    console.log(`updateLink > link : ${JSON.stringify(link)}`);
    return link;
  };
  
  client.setLink(updateLink());

  useEffect(() => {
    client.setLink(updateLink());
  }, [auth]);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
