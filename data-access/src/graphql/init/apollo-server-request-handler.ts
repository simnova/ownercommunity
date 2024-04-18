import { ApolloServer, GraphQLRequestContext } from '@apollo/server';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { applyMiddleware } from 'graphql-middleware';
import { GraphQLSchemaWithFragmentReplacements } from 'graphql-middleware/dist/types';
import mongoose from 'mongoose';
import { combinedSchema } from '../schema/builder/schema-builder';
import { permissions } from '../schema/builder/resolver-builder';
import { GraphqlContext as ApolloContext } from './graphql-context-builder';

export class ApolloServerRequestHandler {
  private readonly serverConfig = (securedSchema: GraphQLSchemaWithFragmentReplacements) => {
    return {
      schema: securedSchema,
      cors: {
        origin: true,
        credentials: true,
      },

      allowBatchedHttpRequests: true,
      plugins: [
        {
          async didEncounterErrors(requestContext: GraphQLRequestContext<ApolloContext>) {
            console.error('Apollo Server encountered error:', requestContext.errors);
          },
          async serverWillStart() {
            console.log('Apollo Server Starting');
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

  private readonly graphqlHandlerObj: ApolloServer<ApolloContext>;

  constructor() {
    try {
      console.log(' -=-=-=-=-=-=-=-=-= INITIALIZING APOLLO -=-=-=-=-=-=-=-=-=');
      const securedSchema: GraphQLSchemaWithFragmentReplacements = applyMiddleware(combinedSchema, permissions);

      const server = new ApolloServer<ApolloContext>({
        ...this.serverConfig(securedSchema),
      });

      this.graphqlHandlerObj = server;
    } catch (error) {
      console.log('Error initializing apollo server:', error);
    }
  }
}
