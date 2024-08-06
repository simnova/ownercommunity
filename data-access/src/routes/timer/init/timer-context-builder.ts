import { InvocationContext, Timer } from "@azure/functions";
import { InfrastructureServices } from '../../../app/infrastructure-services';
import { AppContext, AppContextBuilder, VerifiedUser } from '../../../app/init/app-context-builder';
import { OpenIdConfigKeyEnum } from "../../../../seedwork/auth-seedwork-oidc/portal-token-validation";


export interface TimerContext extends AppContext{
  init(
    timer: Timer, context: InvocationContext
  ): Promise<void>;
}

export class TimerContextBuilder extends AppContextBuilder implements TimerContext{
  protected _timerName: string;

  constructor(
    infrastructureServices: InfrastructureServices,
  ) {
      super(infrastructureServices);
  }

  public async init(
    timer: Timer, context: InvocationContext 
    ) {
    this._timerName = context.functionName;
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
    return {
        verifiedJWT: {
          name: this._timerName,
          given_name: 'SYSTEM',
          family_name: 'SYSTEM',
          email: 'SYSTEM',
          sub: 'SYSTEM'
        },
        openIdConfigKey: OpenIdConfigKeyEnum.SYSTEM  // must be SYSTEM so that SystemVisas can be assigned in passport
      };
  }

}
