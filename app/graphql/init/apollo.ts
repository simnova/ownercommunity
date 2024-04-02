import { ApolloServer, GraphQLRequestContext } from '@apollo/server';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { applyMiddleware } from 'graphql-middleware';
import { GraphQLSchemaWithFragmentReplacements } from 'graphql-middleware/dist/types';
import mongoose from 'mongoose';
import { combinedSchema } from '../schema/builder/schema-builder';
import { permissions } from '../schema/builder/resolver-builder';
import { GraphqlContext as ApolloContext } from '../graphql-context';
// import { connect } from '../../../seedwork/services-seedwork-datastore-mongodb/connect';
// import { PortalTokenValidation } from '../../auth/portal-token-validation';
// import { DomainImpl } from '../../core/domain/domain-impl';
// import { InfrastructureServicesBuilder } from '../../startup/infrastructure-services-builder';

export class ApolloServerRequestHandler {
  // private readonly serverConfig = (portalTokenExtractor: PortalTokenValidation, securedSchema: GraphQLSchemaWithFragmentReplacements) => {
  private readonly serverConfig = (securedSchema: GraphQLSchemaWithFragmentReplacements) => {
    return {
      schema: securedSchema,
      cors: {
        origin: true,
        credentials: true,
      },

      allowBatchedHttpRequests: true,
      //  playground: { endpoint: '/api/graphql/playground' },
      plugins: [
        {
          async didEncounterErrors(requestContext: GraphQLRequestContext<ApolloContext>) {
            console.error('Apollo Server encountered error:', requestContext.errors);
          },
          async serverWillStart() {
            console.log('Apollo Server Starting');
            // await connect();
            // portalTokenExtractor.Start();
            // const DomainInfrastructureImplInstance = new InfrastructureServicesBuilder();
            // const DomainImplInstance = new DomainImpl(
            //   DomainInfrastructureImplInstance.datastore,
            //   DomainInfrastructureImplInstance.cognitiveSearch,
            //   DomainInfrastructureImplInstance.blobStorage,
            //   DomainInfrastructureImplInstance.vercel
            // );
            // await DomainImplInstance.startup();
          },
          async onHealthCheck(): Promise<any> {
            // health check endpoint is: https://<function-name>.azurewebsites.net/api/graphql/.well-known/apollo/server-health
            // doesn't work yet
            // https://github.com/apollographql/apollo-server/pull/5270
            // https://github.com/apollographql/apollo-server/pull/5003
            let mongoConnected = mongoose.connection.readyState === 1;
            if (mongoConnected) {
              return;
            } else {
              throw new Error('MongoDB is not connected');
            }
          },
        },
        responseCachePlugin(),
      ],
    };
  };

  getServer(): ApolloServer<ApolloContext> {
    if (this.graphqlHandlerObj) {
      return this.graphqlHandlerObj;
    }
  }

  // getPortalTokenExtractor(): PortalTokenValidation {
  //   if (this.portalTokenExtractor) {
  //     return this.portalTokenExtractor;
  //   }
  // }

  private readonly graphqlHandlerObj: ApolloServer<ApolloContext>;
  // private readonly portalTokenExtractor: PortalTokenValidation;

  // constructor(portals: Map<string, string>) {
  constructor() {
    try {
      console.log(' -=-=-=-=-=-=-=-=-= INITIALIZING APOLLO -=-=-=-=-=-=-=-=-=');
      const securedSchema: GraphQLSchemaWithFragmentReplacements = applyMiddleware(combinedSchema, permissions);
      // this.portalTokenExtractor = new PortalTokenValidation(portals);

      const server = new ApolloServer<ApolloContext>({
        // ...this.serverConfig(this.portalTokenExtractor, securedSchema),
        ...this.serverConfig(securedSchema),
      });

      this.graphqlHandlerObj = server;
    } catch (error) {
      console.log('Error initializing apollo server:', error);
    }
  }
}
