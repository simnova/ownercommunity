import { HttpRequest } from "@azure/functions";
import { InfrastructureServices } from '../../../../app/infrastructure-services';
import { AppContext, AppContextBuilder, VerifiedUser, OpenIdConfigKeyEnum } from '../../../../app/init/app-context-builder';
import * as util from '../../../../../seedwork/auth-seedwork-oidc/util';
import { PortalTokenValidation } from "../../../../../seedwork/auth-seedwork-oidc/portal-token-validation";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


export interface GlDailySummaryContext extends AppContext{
  init(
  req: HttpRequest,
  ): Promise<void>;
  startDate: string;
  endDate: string;
}

export class GlDailySummaryContextBuilder extends AppContextBuilder implements GlDailySummaryContext {
  private _req: HttpRequest;
  private _portalTokenValidator: PortalTokenValidation;

  constructor(
    infrastructureServices: InfrastructureServices,
    portalTokenValidator: PortalTokenValidation
  ) {
      super(infrastructureServices);
      this._portalTokenValidator = portalTokenValidator;
  }

  get startDate(): string {
    return this._req.headers.get('startDate');

  }

  get endDate(): string {
    return this._req.headers.get('endDate');
  }

  public async init(
    req: HttpRequest,
    ) {
    this._req = req;
    await this.setAppContext();
  }
  
  private async setAppContext(): Promise<void> {
    const verifiedUser: VerifiedUser = await this.getVerifiedUser(); 
    await this.initializeAppContext(
      verifiedUser, 
      null,
      null,
    );
  }

  private async getVerifiedUser(): Promise<VerifiedUser> {
    let bearerToken = util.ExtractBearerToken(this._req);
    if (bearerToken) {
      console.log('[BearerToken] ', bearerToken);
      let verifiedUser: VerifiedUser = await this._portalTokenValidator.GetVerifiedJwt<OpenIdConfigKeyEnum>(bearerToken);
      console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
      if (verifiedUser) {
        return verifiedUser;
      }
    }
  }

}
