import './tracer';
import { wrapFunctionHandler } from './wrapper';

import { startServerAndCreateHandler } from '@as-integrations/azure-functions';
import { ApolloServerRequestHandler } from './init/apollo';
import { Context as ApolloContext} from './context';

let apolloServerRequestHandler = new ApolloServerRequestHandler(
  new Map<string,string>([
    ["AccountPortal","ACCOUNT_PORTAL"]
  ])
);


// Execute the following with every http request
export default wrapFunctionHandler(startServerAndCreateHandler(apolloServerRequestHandler.getServer(), {
  context: async ({ req }) => {
    let context = new ApolloContext();
    await context.init(req, apolloServerRequestHandler);
    return context;
  }
}));