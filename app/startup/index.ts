import '../telemetry/tracer';
import { wrapFunctionHandler } from '../telemetry/wrapper';

import { startServerAndCreateHandler } from './func-v4'; // to be replaced by @as-integrations/azure-functions after PR is merged
import { ApolloServerRequestHandler } from '../graphql/init/apollo';
import { Context as ApolloContext} from '../graphql/context';
import { app } from '@azure/functions';
import { PortalTokenValidation } from '../auth/portal-token-validation';
import { connect } from '../../seedwork/services-seedwork-datastore-mongodb/connect';
import { InfrastructureServicesBuilder } from './infrastructure-services-builder';
import { DomainImpl } from '../core/domain/domain-impl';

const portalTokenValidator = new PortalTokenValidation(
  new Map<string,string>([
    ["AccountPortal","ACCOUNT_PORTAL"]
  ])
);
portalTokenValidator.Start();
connect();
const DomainInfrastructureImplInstance = new InfrastructureServicesBuilder();
            const DomainImplInstance = new DomainImpl(
              DomainInfrastructureImplInstance.datastore,
              DomainInfrastructureImplInstance.cognitiveSearch,
              DomainInfrastructureImplInstance.blobStorage,
              DomainInfrastructureImplInstance.vercel
            );
            DomainImplInstance.startup();

            
let apolloServerRequestHandler = new ApolloServerRequestHandler(
  // new Map<string,string>([
  //   ["AccountPortal","ACCOUNT_PORTAL"]
  // ])
);
console.log(' ########### Apollo Server Starting');

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
        await context.init(req, portalTokenValidator);
        return context;
      }
    })),
  }
);