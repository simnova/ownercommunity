import { ApolloServerRequestHandler } from './init/apollo';
import { HttpRequest, Context } from "@azure/functions";
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
export default (context: Context, req: HttpRequest) => {
  return apolloServerRequestHandler.handleRequests(context, req);
}