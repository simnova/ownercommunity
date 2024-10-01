import { ApolloServer, GraphQLRequestContext } from '@apollo/server';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { applyMiddleware } from 'graphql-middleware';
import { GraphQLSchemaWithFragmentReplacements } from 'graphql-middleware/dist/types';
// import mongoose from 'mongoose';
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
      //  playground: { endpoint: '/api/graphql/playground' },
      plugins: [
        {
          async didEncounterErrors(requestContext: GraphQLRequestContext<ApolloContext>) {
            console.error('Apollo Server encountered error:', requestContext.errors);
          },
          async serverWillStart() {
            console.log(`custom-log | apollo-server | serverWillStart`);
          },
          async onHealthCheck(): Promise<any> {
            // health check endpoint is: https://<function-name>.azurewebsites.net/api/graphql/.well-known/apollo/server-health
            // doesn't work yet
            // https://github.com/apollographql/apollo-server/pull/5270
            // https://github.com/apollographql/apollo-server/pull/5003
            // let mongoConnected = mongoose.connection.readyState === 1;
            // if (mongoConnected) {
            //   return;
            // } else {
            //   throw new Error('MongoDB is not connected');
            // }
          },
        },
        responseCachePlugin(),
      ],
    };
  };
  
  private readonly _apolloServer: ApolloServer<ApolloContext>;
  get apolloServer(): ApolloServer<ApolloContext> {
    if (this._apolloServer) {
      return this._apolloServer;
    }
  }
  

  private static instance: ApolloServerRequestHandler;
  static getInstance(): ApolloServerRequestHandler {
    if (!ApolloServerRequestHandler.instance) {
      ApolloServerRequestHandler.instance = new ApolloServerRequestHandler();
    }
    return ApolloServerRequestHandler.instance;
  }
  private constructor() {
    try {
      console.log(`custom-log | apollo-server | creating`);
      const securedSchema: GraphQLSchemaWithFragmentReplacements = applyMiddleware(combinedSchema, permissions);
      this._apolloServer= new ApolloServer<ApolloContext>({
        ...this.serverConfig(securedSchema),
      });
      console.log(`custom-log | apollo-server | created`);
    } catch (error) {
      console.error(`custom-log | apollo-server | creating failed | ${error.message} | ${error.stack}`);
      throw error;
    }
  }
}
