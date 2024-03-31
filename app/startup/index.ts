import '../telemetry/tracer';
import { wrapFunctionHandler } from '../telemetry/wrapper';

import { startServerAndCreateHandler } from '../graphql/init/func-v4'; // to be replaced by @as-integrations/azure-functions after PR is merged
import { ApolloServerRequestHandler } from '../graphql/init/apollo';
import { Context as ApolloContext} from '../graphql/context';
import { app } from '@azure/functions';

let apolloServerRequestHandler = new ApolloServerRequestHandler(
  new Map<string,string>([
    ["AccountPortal","ACCOUNT_PORTAL"]
  ])
);


// // const services = new Services();
// // RegisterHandlers(services);
// function startup() {
//   console.log('Starting up...');
//   // wait for 20 secs
//   setTimeout(() => {
//     console.log('Startup complete.');
//   }, 20000);
// }

// startup();
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