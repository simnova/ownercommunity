import { startServerAndCreateHandler } from '@as-integrations/azure-functions';
import { ApolloServerRequestHandler } from './init/apollo';
import { Context as ApolloContext} from './context';
import   * as  appInsights   from "applicationinsights";

if(!process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || process.env.APPLICATIONINSIGHTS_CONNECTION_STRING.length === 0){
  console.log('Application Insights not configured');
} else {
  appInsights
    .setup()
    .setAutoCollectConsole(true, true)
    .start();
  console.log('Application Insights configured');
} 

let apolloServerRequestHandler = new ApolloServerRequestHandler(
  new Map<string,string>([
    ["AccountPortal","ACCOUNT_PORTAL"]
  ])
);

// Execute the following with every http request
export default startServerAndCreateHandler(apolloServerRequestHandler.getServer(), {
  context: async ({ req }) => {
    let context = new ApolloContext();
    await context.init(req, apolloServerRequestHandler);
    return context;
  }
});;

