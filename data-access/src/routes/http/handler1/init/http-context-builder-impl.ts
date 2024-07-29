import { HttpRequest } from "@azure/functions";
import { HttpContext, HttpContextBuilder } from "../../../../../seedwork/az-function-handler-seedwork-http/http-context-builder";
import { AppContext, AppContextBuilder, VerifiedJwtPayloadType, VerifiedUser } from "../../../../app/init/app-context-builder";
import { PortalTokenValidation } from "../../../../../seedwork/auth-seedwork-oidc/portal-token-validation";
import * as util from '../../../../../seedwork/auth-seedwork-oidc/util';
import { ApplicationServices } from "../../../../app/application-services";
import { InfrastructureServices } from "../../../../app/infrastructure-services";
import { Passport } from "../../../../app/init/passport";

export class HttpContextBuilderImpl 
extends HttpContextBuilder<InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType, AppContext> 
implements HttpContext<InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType>  {
  constructor(req: HttpRequest, portalTokenValidator: PortalTokenValidation, infrastructureServices: InfrastructureServices) {
    super(req, portalTokenValidator, infrastructureServices);
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

  protected async setAppContext(): Promise<void> {
    this._appContext = new AppContextBuilder(
      this._verifiedUser, 
      this._req.headers.get('community'), 
      this._req.headers.get('member'),
      this._infrastructureServices
    );
    await this._appContext.init();
  }
}