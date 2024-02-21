import './tracer';
import { wrapFunctionHandler } from './wrapper';

import { startServerAndCreateHandler } from './init/func-v4'; // to be replaced by @as-integrations/azure-functions after PR is merged
import { ApolloServerRequestHandler } from './init/apollo';
import { Context as ApolloContext} from './context';
import { app } from '@azure/functions';

let apolloServerRequestHandler = new ApolloServerRequestHandler(
  new Map<string,string>([
    ["AccountPortal","ACCOUNT_PORTAL"]
  ])
);


// Execute the following with every http request
app.http("graphql", {
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
  route: "graphql/{*segments}",
    handler: wrapFunctionHandler(startServerAndCreateHandler(apolloServerRequestHandler.getServer(), {
      context: async ({ req }) => {
        let context = new ApolloContext();
        await context.init(req, apolloServerRequestHandler);
        return context;
      }
    })),
  }
);