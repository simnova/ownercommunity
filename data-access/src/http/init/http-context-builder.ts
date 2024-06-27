import { HttpRequest } from "@azure/functions";
import { ApplicationServices } from "../../app/application-services";
import { InfrastructureServices } from "../../app/infrastructure-services";
import { PortalTokenValidation } from "../../auth/portal-token-validation";
import * as util from '../../../seedwork/auth-seedwork-oidc/util';
import { AppContext, AppContextBuilder, VerifiedUser } from "../../app/init/app-context-builder";

export interface HttpContext {
  req: HttpRequest;
  verifiedUser: VerifiedUser;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
  init(
    req: HttpRequest, 
    portalTokenValidator: PortalTokenValidation,
    infrastructureServices: InfrastructureServices,
  ): Promise<void>;
}

export class HttpContextBuilder implements HttpContext {
  private _req: HttpRequest;
  private _portalTokenValidator: PortalTokenValidation;
  private _appContext: AppContext;
  private _verifiedUser: VerifiedUser;
  private _infrastructureServices: InfrastructureServices;

  public async init(
    req: HttpRequest, 
    portalTokenValidator: PortalTokenValidation,
    infrastructureServices: InfrastructureServices,
    ) {
      this._req = req;
      this._portalTokenValidator = portalTokenValidator;
      this._infrastructureServices = infrastructureServices;
      await this.setVerifiedUser();
      await this.setAppContext();
  }
  
  private async setAppContext(): Promise<void> {
    this._appContext = new AppContextBuilder(
      this._verifiedUser, 
      this._req.headers.get('community'),
      this._req.headers.get('member'),
      this._infrastructureServices
    );
    await this._appContext.init();
  }

  private async setVerifiedUser(): Promise<void> {
    let bearerToken = util.ExtractBearerToken(this._req);
    if (bearerToken) {
      console.log('[BearerToken] ', bearerToken);
      let verifiedUser = await this._portalTokenValidator.GetVerifiedUser(bearerToken);
      console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
      if (verifiedUser) {
        this._verifiedUser = verifiedUser;
      }
    }
  }

  get verifiedUser(): VerifiedUser {
    return this._verifiedUser;
  }

  get applicationServices(): ApplicationServices {
    return this._appContext.applicationServices;
  }

  get infrastructureServices(): InfrastructureServices {
    return this._infrastructureServices;
  }

  get req(): HttpRequest {
    return this._req;
  }
}