import { HttpRequest } from "@azure/functions";
import { HttpContext, HttpContextBuilder } from "../../../../../seedwork/az-function-handler-seedwork-http/http-context-builder";
import { AppContext, AppContextBuilder, VerifiedJwtPayloadType } from "../../../../app/init/app-context-builder";
import { PortalTokenValidation } from "../../../../../seedwork/auth-seedwork-oidc/portal-token-validation";
import { ApplicationServices } from "../../../../app/application-services";
import { InfrastructureServices } from "../../../../app/infrastructure-services";
import { Passport } from "../../../../app/init/passport";

export class HttpContextBuilderImpl 
extends HttpContextBuilder<InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType, AppContext> 
implements HttpContext<InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType>  {
  constructor(req: HttpRequest, portalTokenValidator: PortalTokenValidation, infrastructureServices: InfrastructureServices) {
    super(req, portalTokenValidator, infrastructureServices);
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