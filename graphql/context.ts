import { Passport } from '../domain/contexts/iam/passport';
import { DataSources, DataSourcesType, initializeDataSources } from './data-sources';
import * as util from './init/extensions/util';
import { HttpRequest } from '@azure/functions';
import { Context as AzureContext } from '@azure/functions';
import { ApolloServerRequestHandler } from './init/apollo';
import { decorateContext } from './init/extensions/passport-context';
import { BaseContext } from '@apollo/server';

export class Context implements BaseContext {
  public verifiedUser: {
    verifiedJWT: any;
    openIdConfigKey: string;
  };
  public community:string;
  public passport: Passport;
  public dataSources: DataSourcesType;
  public executionContext: any;

  public async init(req: HttpRequest, serverRequestHandler: ApolloServerRequestHandler) {
    this.dataSources = initializeDataSources(this);

    let bearerToken = util.ExtractBearerToken(req);
    console.log('[BearerToken]: ', bearerToken)

    if (bearerToken) {
      let verifiedUser = await serverRequestHandler.getPortalTokenExtractor().GetVerifiedUser(bearerToken);
      console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
      if (verifiedUser) {
        this.verifiedUser = verifiedUser;
        console.log('context value is now:', this);
      }
    }

    await decorateContext(this, req);

    req.headers['x-ms-privatelink-id'] = ''; // https://github.com/Azure/azure-functions-host/issues/6013
    req.headers['server'] = null; //hide microsoft server header
    
    console.log('context value is now:', this);
  }
}