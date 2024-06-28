import { HttpRequest } from "@azure/functions";
import { AppContext, AppContextBuilder } from "../../src/app/init/app-context-builder";
import { PortalTokenValidation } from "../../src/auth/portal-token-validation";
import { InfrastructureServicesBuilder } from "../../src/init/infrastructure-services-builder";
import * as util from '../auth-seedwork-oidc/util';
import { ApplicationServices } from "../../src/app/application-services";
import { InfrastructureServices } from "../../src/app/infrastructure-services";

export type VerifiedUser = {
  verifiedJWT: any;
  openIdConfigKey: string;
};

export interface HttpContext {
  req: HttpRequest;
  verifiedUser: VerifiedUser;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
}

export class HttpContextBuilder implements HttpContext {
  protected _req: HttpRequest;
  protected _portalTokenValidator: PortalTokenValidation;
  protected _verifiedUser: VerifiedUser;
  protected _appContext: AppContext;
  protected _infrastructureServices: InfrastructureServices;

  constructor(req: HttpRequest, portalTokenValidator: PortalTokenValidation, infrastructureServices: InfrastructureServicesBuilder) {
    this._req = req;
    this._portalTokenValidator = portalTokenValidator;
    this._infrastructureServices = infrastructureServices;
  }

  public async init(): Promise<void> {
    await this.setVerifiedUser();
    await this.setAppContext();
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

  private async setAppContext(): Promise<void> {
    this._appContext = new AppContextBuilder(
      this._verifiedUser, 
      this._req.headers.get('community'), 
      this._req.headers.get('member'),
      this._infrastructureServices
    );
    await this._appContext.init();
  }

  get req(): HttpRequest {
    return this._req;
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
}