import { HttpRequest } from '@azure/functions';
import { PortalTokenValidation } from '../../auth/portal-token-validation';
import { HttpContext } from '../../../seedwork/seedwork-az-function-handler_http/http-context-builder';
import { InfrastructureServicesBuilder } from '../../init/infrastructure-services-builder';
import { HttpContextBuilderImpl } from '../../http/init/http-context-builder-impl';
import { CommunityData, MemberData } from '../../app/external-dependencies/datastore';

export interface GraphqlContext extends HttpContext {
  community: CommunityData;
  member: MemberData;
}

export class GraphqlContextBuilder extends HttpContextBuilderImpl implements GraphqlContext {;
  constructor(request: HttpRequest, portalTokenValidator: PortalTokenValidation, infrastructureServices: InfrastructureServicesBuilder) {
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
    return this._appContext.member;;
  }
}
