import { Passport } from '../domain/contexts/iam/passport';
import { HttpRequest } from '@azure/functions';
import { ApolloServerRequestHandler } from './init/apollo';
import { PassportContext } from './init/extensions/passport-context';
import { Services } from '../infrastructure/services';
import { DataSourceBuilder } from './data-sources/data-source-builder';

export class Context {
  public verifiedUser: {
    verifiedJWT: any;
    openIdConfigKey: string;
  };
  public community: string;
  public passport: Passport;
  public dataSources: DataSourceBuilder;
  public executionContext: any;
  public services: Services;

  public async init(req: HttpRequest, serverRequestHandler: ApolloServerRequestHandler) {
    this.services = new Services();
    this.dataSources = new DataSourceBuilder(this);

    await PassportContext.decorateContext(this, req, serverRequestHandler.getPortalTokenExtractor());

    req.headers['x-ms-privatelink-id'] = ''; // https://github.com/Azure/azure-functions-host/issues/6013
    req.headers['server'] = null; //hide microsoft server header
  }
}
