import { Passport } from '../core/domain/contexts/iam/passport';
import { HttpRequest } from '@azure/functions';
import { ApolloServerRequestHandler } from './init/apollo';
import { PassportContext } from './init/extensions/passport-context';
import { InfrastructureServicesBuilder } from '../startup/infrastructure-services-builder';
import { DataSourceBuilder } from './data-sources/data-source-builder';
import { DomainInfrastructure } from '../core/domain/infrastructure';
import { DomainExecutionContext } from '../core/domain/contexts/domain-execution-context';

export class Context implements DomainExecutionContext{
  public verifiedUser: {
    verifiedJWT: any;
    openIdConfigKey: string;
  };
  public community: string;
  public passport: Passport;
  public dataSources: DataSourceBuilder;
  public executionContext: any;
  public services: InfrastructureServicesBuilder;

  public async init(req: HttpRequest, serverRequestHandler: ApolloServerRequestHandler) {
    this.services = new InfrastructureServicesBuilder();
    this.dataSources = new DataSourceBuilder(this);

    await PassportContext.decorateContext(this, req, serverRequestHandler.getPortalTokenExtractor());

    req.headers.set('x-ms-privatelink-id', ''); // https://github.com/Azure/azure-functions-host/issues/6013
    req.headers.set('server', null); //hide microsoft server header
  }
}
