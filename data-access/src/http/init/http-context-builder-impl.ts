import { HttpRequest } from "@azure/functions";
import { HttpContext, HttpContextBuilder } from "../../../seedwork/seedwork-az-function-handler_http/http-context-builder";
import { AppContextBuilder } from "../../app/init/app-context-builder";
import { PortalTokenValidation } from "../../auth/portal-token-validation";
import { InfrastructureServicesBuilder } from "../../init/infrastructure-services-builder";
import * as util from '../../../seedwork/auth-seedwork-oidc/util';

export class HttpContextBuilderImpl extends HttpContextBuilder implements HttpContext {
  constructor(req: HttpRequest, portalTokenValidator: PortalTokenValidation, infrastructureServices: InfrastructureServicesBuilder) {
    super(req, portalTokenValidator, infrastructureServices);
  }
  
  protected async setVerifiedUser(): Promise<void> {
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