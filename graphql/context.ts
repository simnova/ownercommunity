import { Passport } from '../domain/contexts/iam/passport';
import * as util from './init/extensions/util';
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
    let bearerToken = util.ExtractBearerToken(req);
    console.log('[BearerToken]: ', bearerToken);

    this.services = new Services();

    this.dataSources = new DataSourceBuilder(this);

    // if (bearerToken) {
    //   let verifiedUser = await serverRequestHandler.getPortalTokenExtractor().GetVerifiedUser(bearerToken);
    //   console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
    //   if (verifiedUser) {
    //     this.verifiedUser = verifiedUser;
    //     console.log('context value is now:', this);
    //   }
    // }

    await PassportContext.decorateContext(this);

    // await decorateContext(this, req);

    req.headers['x-ms-privatelink-id'] = ''; // https://github.com/Azure/azure-functions-host/issues/6013
    req.headers['server'] = null; //hide microsoft server header
  }
}
