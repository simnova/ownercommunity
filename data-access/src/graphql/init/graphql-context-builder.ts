import { HttpRequest } from '@azure/functions';
import { PortalTokenValidation } from '../../auth/portal-token-validation';
import { Passport } from '../../app/init/passport';
import { HttpContext, HttpContextBuilder } from '../../../seedwork/seedwork-az-function-handler_http/http-context-builder';
import { InfrastructureServicesBuilder } from '../../init/infrastructure-services-builder';
import { HttpContextBuilderImpl } from '../../http/init/http-context-builder-impl';

export interface GraphqlContext extends HttpContext {
  communityId: string;
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

  get communityId(): string {
    return this._appContext.communityId;
  }
}
