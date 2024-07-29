import { HttpRequest } from "@azure/functions";
import { PortalTokenValidation } from "../auth-seedwork-oidc/portal-token-validation";
import { BaseContext, BaseContextBuilder } from "../az-function-handler-seedwork-base/base-context-builder";
import * as util from '../auth-seedwork-oidc/util';
import { AppContextBase, VerifiedUser } from "../az-function-handler-seedwork-base/base-app-context";

export interface HttpContext<InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedJwtPayloadType> 
extends BaseContext<InfrastructureServicesType, ApplicationServicesType, PassportType> {
  req: HttpRequest;
  verifiedUser: VerifiedUser<VerifiedJwtPayloadType>;
}

export abstract class HttpContextBuilder
<InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedJwtPayloadType, AppContextType extends AppContextBase<VerifiedUser<VerifiedJwtPayloadType>, PassportType, ApplicationServicesType, InfrastructureServicesType>>
extends BaseContextBuilder
<InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedUser<VerifiedJwtPayloadType>, AppContextType>
implements HttpContext
<InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedJwtPayloadType> {
  protected _verifiedUser: VerifiedUser<VerifiedJwtPayloadType>;
  protected _req: HttpRequest;
  protected _portalTokenValidator: PortalTokenValidation;

  constructor(req: HttpRequest, portalTokenValidator: PortalTokenValidation, infrastructureServices: InfrastructureServicesType) {
    super(infrastructureServices);
    this._req = req;
    this._portalTokenValidator = portalTokenValidator;
  }

  protected async setVerifiedUser(): Promise<void> {
    let bearerToken = util.ExtractBearerToken(this._req);
    if (bearerToken) {
      console.log('[BearerToken] ', bearerToken);
      let verifiedUser = await this._portalTokenValidator.GetVerifiedUser<VerifiedJwtPayloadType>(bearerToken);
      console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
      if (verifiedUser) {
        this._verifiedUser = verifiedUser;
      }
    }
  }

  get req(): HttpRequest {
    return this._req;
  }

  get verifiedUser(): VerifiedUser<VerifiedJwtPayloadType> {
    return this._verifiedUser;
  }
}