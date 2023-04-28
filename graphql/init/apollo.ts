import { ApolloServer, BaseContext, GraphQLRequestContext } from '@apollo/server';
import { HttpRequest, Context } from '@azure/functions';
import { DataSources } from '../data-sources/';
import { connect } from '../../infrastructure/data-sources/cosmos-db/connect';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import mongoose from 'mongoose';
import { PortalTokenValidation } from './extensions/portal-token-validation';
import { combinedSchema } from './extensions/schema-builder';
import * as util from './extensions/util';
import RegisterHandlers from '../../domain/infrastructure/event-handlers/index';
import { Context as ApolloContext } from '../context';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from '../schema';
import { GraphQLSchemaWithFragmentReplacements } from 'graphql-middleware/dist/types';

import { decorateContext } from './extensions/passport-context';
import { AzureFunctionsMiddlewareOptions, startServerAndCreateHandler } from '@as-integrations/azure-functions';

export class ApolloServerRequestHandler {
  private readonly serverConfig = (portalTokenExtractor: PortalTokenValidation,securedSchema: GraphQLSchemaWithFragmentReplacements) => {
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

            RegisterHandlers();
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

  getServer(): ApolloServer<BaseContext> {
    if (this.graphqlHandlerObj) {
      // req.headers['x-ms-privatelink-id'] = ''; // https://github.com/Azure/azure-functions-host/issues/6013
      // req.headers['server'] = null; //hide microsoft server header
      return this.graphqlHandlerObj;
    }
  }

  getPortalTokenExtractor(): PortalTokenValidation {
    if (this.portalTokenExtractor) {
      return this.portalTokenExtractor;
    }
  }

  // public handleRequests(context: Context, req: HttpRequest) {
  //   req.headers['x-ms-privatelink-id'] = ''; // https://github.com/Azure/azure-functions-host/issues/6013
  //   req.headers['server'] = null; //hide microsoft server header
  //   const options: AzureFunctionsMiddlewareOptions<BaseContext> = {
  //     context: async ({ context, req }) => {
  //       return {
  //         context,
  //         req,
  //       };
  //     }
  //   }
  //   return startServerAndCreateHandler(this.graphqlHandlerObj, options);
  // }

  private readonly graphqlHandlerObj: ApolloServer<BaseContext>;
  private readonly portalTokenExtractor: PortalTokenValidation;

  constructor(portals: Map<string, string>) {
    try {
      console.log(' -=-=-=-=-=-=-=-=-= INITIALIZING APOLLO -=-=-=-=-=-=-=-=-=');
      const securedSchema: GraphQLSchemaWithFragmentReplacements = applyMiddleware(combinedSchema, permissions);
      this.portalTokenExtractor = new PortalTokenValidation(portals);

      const server = new ApolloServer<BaseContext>({
        ...this.serverConfig(this.portalTokenExtractor, securedSchema),
      });

      this.graphqlHandlerObj = server;

    } catch (error) {
      console.log('Error initializing apollo server:', error);
    }
  }
}
