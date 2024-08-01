import { HttpRequest } from '@azure/functions';
import { PortalTokenValidation } from '../../../../auth/portal-token-validation';
import { InfrastructureServices } from '../../../../app/infrastructure-services';
import * as util from '../../../../../seedwork/auth-seedwork-oidc/util';
import { AppContext, AppContextBuilder, VerifiedUser } from '../../../../app/init/app-context-builder';

export interface GraphqlContext extends AppContext{
  init(
    req: HttpRequest, 
  ): Promise<void>;
}

export class GraphqlContextBuilder extends AppContextBuilder implements GraphqlContext{
  private _req: HttpRequest;
  private _portalTokenValidator: PortalTokenValidation;

  constructor(
    infrastructureServices: InfrastructureServices,
    portalTokenValidator: PortalTokenValidation
  ) {
      super(infrastructureServices);
      this._portalTokenValidator = portalTokenValidator;
  }

  public async init(
    req: HttpRequest, 
    ) {
      // execute following in order
    this._req = req;
    await this.setAppContext();
    await this.setReqHeaders();
  }
  
  private async setAppContext(): Promise<void> {
    const verifiedUser: VerifiedUser = await this.getVerifiedUser(); 
    await this.initializeAppContext(
      verifiedUser, 
      this._req.headers.get('community'),
      this._req.headers.get('member'),
    );
  }

  private async getVerifiedUser(): Promise<VerifiedUser> {
    let bearerToken = util.ExtractBearerToken(this._req);
    if (bearerToken) {
      console.log('[BearerToken] ', bearerToken);
      let verifiedUser: VerifiedUser = await this._portalTokenValidator.GetVerifiedUser(bearerToken);
      console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
      if (verifiedUser) {
        return verifiedUser;
      }
    }
  }

  private async setReqHeaders(): Promise<void> {
    this._req.headers.set('x-ms-privatelink-id', ''); // https://github.com/Azure/azure-functions-host/issues/6013
    this._req.headers.set('server', null); //hide microsoft server header
  }

  public get req(): HttpRequest {
    return this._req;
  }
}
