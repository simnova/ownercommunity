import { Passport } from './domain/contexts/iam/passport';
// import { HttpRequest } from '@azure/functions';
// import { ApolloServerRequestHandler } from './init/apollo';
// import { PassportContext } from '../graphql/init/extensions/passport-context';
// import { InfrastructureServicesBuilder } from '../startup/infrastructure-services-builder';
// import { DataSourceBuilder } from './data-sources/data-source-builder';
// import { DomainInfrastructure } from '../domain/infrastructure';
// import { DomainExecutionContext } from '../domain/contexts/domain-execution-context';
import { ApplicationServices } from './application-services';
import { InfrastructureServices } from './infrastructure-services';
import { BaseApplicationServiceExecutionContext } from '../application-services-impl/_base.application-service';

export type VerifiedUser = {
  verifiedJWT: any;
  openIdConfigKey: string;
};

export interface Context extends BaseApplicationServiceExecutionContext{
  verifiedUser: VerifiedUser;
  community: string;
  passport: Passport;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
  executionContext: any;
  init( 
      verifiedUser: VerifiedUser, 
      community: string, 
      applicationServices: ApplicationServices,
      infrastructureServices: InfrastructureServices,
  ): Promise<void>;
  // static init(req: HttpRequest, serverRequestHandler: ApolloServerRequestHandler) {
  //   this.services = new InfrastructureServicesBuilder();
  //   this.dataSources = new DataSourceBuilder(this);

    // await PassportContext.decorateContext(this, req, serverRequestHandler.getPortalTokenExtractor());

  //   req.headers.set('x-ms-privatelink-id', ''); // https://github.com/Azure/azure-functions-host/issues/6013
  //   req.headers.set('server', null); //hide microsoft server header
  // }
}
