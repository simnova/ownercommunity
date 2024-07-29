import { HttpRequest } from '@azure/functions';
import { PortalTokenValidation } from '../../../seedwork/auth-seedwork-oidc/portal-token-validation';
import { HttpContext, HttpContextBuilder } from '../../../seedwork/az-function-handler-seedwork-http/http-context-builder';
import { CommunityData, MemberData } from '../../app/external-dependencies/datastore';
import { ApplicationServices } from '../../app/application-services';
import { Passport } from '../../app/init/passport';
import { AppContext, AppContextBuilder, VerifiedJwtPayloadType } from '../../app/init/app-context-builder';
import { InfrastructureServices } from '../../app/infrastructure-services';

export interface GraphqlContext extends HttpContext<InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType>  {
  community: CommunityData;
  member: MemberData;
}

export class GraphqlContextBuilder extends HttpContextBuilder<InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType, AppContext> implements GraphqlContext {;
  constructor(request: HttpRequest, portalTokenValidator: PortalTokenValidation, infrastructureServices: InfrastructureServices) {
    super(request, portalTokenValidator, infrastructureServices);
  }

  public async init() {
      // execute following in order
    await this.setReqHeaders();
    await super.init();
  }

  private async setReqHeaders(): Promise<void> {
    this._req.headers.set('x-ms-privatelink-id', ''); // https://github.com/Azure/azure-functions-host/issues/6013
    this._req.headers.set('server', null); //hide microsoft server header
  }

  get community(): CommunityData {
    return this._appContext.community;
  }

  get member(): MemberData {
    return this._appContext.member;
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
