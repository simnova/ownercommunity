import { HttpRequest } from '@azure/functions';
import { PortalTokenValidation } from '../../auth/portal-token-validation';
// import { ApplicationServices } from '../../app/application-services';
import { InfrastructureServices } from '../../app/infrastructure-services';
import * as util from '../../../seedwork/auth-seedwork-oidc/util';
import { AppContext, AppContextBuilder, VerifiedUser } from '../../app/init/app-context-builder';
// import { Passport } from '../../app/init/passport';
// import { CommunityData, MemberData } from '../../app/external-dependencies/datastore';

// export type VerifiedUser = {
//   verifiedJWT: any;
//   openIdConfigKey: string;
// };

export interface GraphqlContext extends AppContext{
  // verifiedUser: VerifiedUser;
  // community: CommunityData;
  // member: MemberData;
  // passport: Passport;
  // applicationServices: ApplicationServices;
  // infrastructureServices: InfrastructureServices;
  init(
    req: HttpRequest, 
    // portalTokenValidator: PortalTokenValidation,
    // infrastructureServices: InfrastructureServices,
  ): Promise<void>;
}

export class GraphqlContextBuilder extends AppContextBuilder implements GraphqlContext{
  private _req: HttpRequest;
  private _portalTokenValidator: PortalTokenValidation;
  // private _appContext: AppContext;
  // private _verifiedUser: VerifiedUser;
  // private _infrastructureServices: InfrastructureServices;

  constructor(
    infrastructureServices: InfrastructureServices,
    portalTokenValidator: PortalTokenValidation
  ) {
      super(infrastructureServices);
      this._portalTokenValidator = portalTokenValidator;
  }

  public async init(
    req: HttpRequest, 
    // portalTokenValidator: PortalTokenValidation,
    // infrastructureServices: InfrastructureServices,
    ) {
      // execute following in order
    this._req = req;
    // this._portalTokenValidator = portalTokenValidator;
    // this._infrastructureServices = infrastructureServices;
    // await this.setVerifiedUser();
    await this.setAppContext();
    await this.setReqHeaders();
  }
  
  private async setAppContext(): Promise<void> {
    const verifiedUser: VerifiedUser = await this.getVerifiedUser(); 
    await this.initializeAppContext(
      verifiedUser, 
      this._req.headers.get('community'),
      this._req.headers.get('member'),
      // this._infrastructureServices
    );
    // await this._appContext.init();
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

  // public get verifiedUser(): VerifiedUser {
  //   return this._verifiedUser;
  // }

  // public get community(): CommunityData {
  //   return this._appContext.community;
  // }

  // public get member(): MemberData {
  //   return this._appContext.member;
  // }

  // public get passport(): Passport {
  //   return this._appContext.passport;
  // }

  // public get applicationServices(): ApplicationServices {
  //   return this._appContext.applicationServices;
  // }

  // public get infrastructureServices(): InfrastructureServices {
  //   return this._infrastructureServices;
  // }

  public get req(): HttpRequest {
    return this._req;
  }
}
