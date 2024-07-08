import { HttpRequest } from "@azure/functions";
import { PortalTokenValidation } from "../../src/auth/portal-token-validation";
import { InfrastructureServicesBuilder } from "../../src/init/infrastructure-services-builder";
import { BaseContext, BaseContextBuilder } from "../seedwork-az-function-handler_base/base-context-builder";

export type VerifiedUser = {
  verifiedJWT: any;
  openIdConfigKey: string;
};

export interface HttpContext extends BaseContext{
  req: HttpRequest;
  verifiedUser: VerifiedUser;
}

export abstract class HttpContextBuilder extends BaseContextBuilder implements HttpContext {
  protected _req: HttpRequest;
  protected _portalTokenValidator: PortalTokenValidation;

  constructor(req: HttpRequest, portalTokenValidator: PortalTokenValidation, infrastructureServices: InfrastructureServicesBuilder) {
    super(infrastructureServices);
    this._req = req;
    this._portalTokenValidator = portalTokenValidator;
  }

  get req(): HttpRequest {
    return this._req;
  }

  get verifiedUser(): VerifiedUser {
    return this._verifiedUser;
  }
}