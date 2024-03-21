import { ApolloServer, GraphQLRequestContext } from '@apollo/server';
import { connect } from '../../services-seedwork-datastore-mongodb/connect';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import mongoose from 'mongoose';
import { PortalTokenValidation } from './extensions/portal-token-validation';
import { combinedSchema } from './extensions/schema-builder';
import { DomainImpl } from '../../domain/domain-impl';
import { Context as ApolloContext } from '../context';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from '../schema';
import { GraphQLSchemaWithFragmentReplacements } from 'graphql-middleware/dist/types';
import { DomainInfrastructureImpl } from '../../startup/domain-infrastructure-impl-instance';

export class ApolloServerRequestHandler {
  private readonly serverConfig = (portalTokenExtractor: PortalTokenValidation, securedSchema: GraphQLSchemaWithFragmentReplacements) => {
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
            await connect();
            portalTokenExtractor.Start();
            const DomainInfrastructureImplInstance = new DomainInfrastructureImpl();
            const DomainImplInstance = new DomainImpl(
              DomainInfrastructureImplInstance.datastore,
              DomainInfrastructureImplInstance.cognitiveSearch,
              DomainInfrastructureImplInstance.blobStorage,
              DomainInfrastructureImplInstance.vercel
            );
            await DomainImplInstance.startup();
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

  getPortalTokenExtractor(): PortalTokenValidation {
    if (this.portalTokenExtractor) {
      return this.portalTokenExtractor;
    }
  }

  private readonly graphqlHandlerObj: ApolloServer<ApolloContext>;
  private readonly portalTokenExtractor: PortalTokenValidation;

  constructor(portals: Map<string, string>) {
    try {
      console.log(' -=-=-=-=-=-=-=-=-= INITIALIZING APOLLO -=-=-=-=-=-=-=-=-=');
      const securedSchema: GraphQLSchemaWithFragmentReplacements = applyMiddleware(combinedSchema, permissions);
      this.portalTokenExtractor = new PortalTokenValidation(portals);

      const server = new ApolloServer<ApolloContext>({
        ...this.serverConfig(this.portalTokenExtractor, securedSchema),
      });

      this.graphqlHandlerObj = server;
    } catch (error) {
      console.log('Error initializing apollo server:', error);
    }
  }
}
