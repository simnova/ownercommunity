import { InvocationContext } from "@azure/functions";
import { InfrastructureServices } from '../../../app/infrastructure-services';
import { AppContext, AppContextBuilder, VerifiedUser } from '../../../app/init/app-context-builder';
import { OpenIdConfigKeyEnum } from "../../../../seedwork/auth-seedwork-oidc/portal-token-validation";


export interface QueueContext extends AppContext{
  init(
    queueItem: any, context: InvocationContext
  ): Promise<void>;
}

export class QueueContextBuilder extends AppContextBuilder implements QueueContext{
  protected _queueName: string;

  constructor(
    infrastructureServices: InfrastructureServices,
  ) {
      super(infrastructureServices);
  }

  public async init(
    queueItem: any, context: InvocationContext 
    ) {
    this._queueName = context.functionName;
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
          name: this._queueName,
          given_name: 'SYSTEM',
          family_name: 'SYSTEM',
          email: 'SYSTEM',
          sub: 'SYSTEM'
        },
        openIdConfigKey: OpenIdConfigKeyEnum.SYSTEM   // must be SYSTEM so that SystemVisas can be assigned in passport
      };
  }

}
