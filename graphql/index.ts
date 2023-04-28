import { BaseContext } from '@apollo/server';
import { DataSources } from './data-sources'
import { AzureFunctionsMiddlewareOptions, startServerAndCreateHandler } from '@as-integrations/azure-functions';
import { ApolloServerRequestHandler } from './init/apollo';
import { HttpRequest, Context, AzureFunction } from "@azure/functions";
import * as util from './init/extensions/util';
import { Context as ApolloContext} from './context';
import   * as  appInsights   from "applicationinsights";
import { decorateContext } from './init/extensions/passport-context';

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

// const httpTrigger: AzureFunction = function(context: Context, req: HttpRequest): void {
//   context.log("GraphQL HTTP trigger function processed a request.");

//   // let options: AzureFunctionsMiddlewareOptions<BaseContext> = {
//   //   context: async (req: any) => {
//   //     let bearerToken = util.ExtractBearerToken(req);
//   //     context.log('[BearerToken]: ', bearerToken)
//   //     let myContext: Partial<ApolloContext> = {};
  
//   //     if (bearerToken) {
//   //       let verifiedUser = await apolloServerRequestHandler.getPortalTokenExtractor().GetVerifiedUser(bearerToken);
//   //       console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
//   //       if (verifiedUser) {
//   //         myContext.verifiedUser = verifiedUser;
//   //         console.log('context value is now:', JSON.stringify(myContext));
//   //       }
//   //     }

//   //     await decorateContext(myContext, req);
//   //     req.headers['x-ms-privatelink-id'] = ''; // https://github.com/Azure/azure-functions-host/issues/6013
//   //     req.headers['server'] = null; //hide microsoft server header
//   //     console.log('context value is now:', JSON.stringify(myContext));

//   //     myContext = {
//   //       ...myContext,
//   //       dataSources: DataSources,
//   //     }

//   //     return myContext;
//   //   }
//   // }

//   const handler = startServerAndCreateHandler(apolloServerRequestHandler.getServer(), options);
//   handler(context, req);
// }

const httpTrigger: AzureFunction = function(context: Context, req: HttpRequest): void {
  context.log("GraphQL HTTP trigger function processed a request.");

  const handler = startServerAndCreateHandler(apolloServerRequestHandler.getServer(), {
    context: async (_req: any) => {
      let context = new ApolloContext();
      context.init(req, apolloServerRequestHandler);
      return context;
    }
  });
  handler(context, req);
}

// Execute the following with every http request
export default httpTrigger;
