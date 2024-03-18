import { Passport } from '../domain/contexts/iam/passport';
import { HttpRequest } from '@azure/functions';
import { ApolloServerRequestHandler } from './init/apollo';
import { PassportContext } from './init/extensions/passport-context';
import { DomainInfrastructureImplInstance } from '../startup/domain-infrastructure-impl-instance';
import { DataSourceBuilder } from './data-sources/data-source-builder';
import { DomainInfrastructure } from '../domain/infrastructure';

export class Context {
  public verifiedUser: {
    verifiedJWT: any;
    openIdConfigKey: string;
  };
  public community: string;
  public passport: Passport;
  public dataSources: DataSourceBuilder;
  public executionContext: any;
  public services: DomainInfrastructure;

  public async init(req: HttpRequest, serverRequestHandler: ApolloServerRequestHandler) {
    this.services = DomainInfrastructureImplInstance;
    this.dataSources = new DataSourceBuilder(this);

    await PassportContext.decorateContext(this, req, serverRequestHandler.getPortalTokenExtractor());

    req.headers.set('x-ms-privatelink-id', ''); // https://github.com/Azure/azure-functions-host/issues/6013
    req.headers.set('server', null); //hide microsoft server header
  }
}
