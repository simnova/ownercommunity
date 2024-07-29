import { InvocationContext } from "@azure/functions";
import { QueueContext, QueueContextBuilder } from "../../../../seedwork/az-function-handler-seedwork-queue/queue-context-builder";
import { AppContext, AppContextBuilder, VerifiedJwtPayloadType } from "../../../app/init/app-context-builder";
import { InfrastructureServices } from "../../../app/infrastructure-services";
import { ApplicationServices } from "../../../app/application-services";
import { Passport } from "../../../app/init/passport";

export class QueueContextBuilderImpl
 extends QueueContextBuilder 
 <InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType, AppContext>
 implements QueueContext
 <InfrastructureServices, ApplicationServices, Passport> {
  constructor(queueItem: any, context: InvocationContext, infrastructureServices: InfrastructureServices) {
    super(queueItem, context, infrastructureServices);
  }

  protected async setVerifiedUser(): Promise<void> {
    this._verifiedUser = {
      verifiedJWT: {
        oid: '',
        name: '',
        given_name: '',
        family_name: '',
        email: '',
        sub: ''
      },
      openIdConfigKey: 'SYSTEM'
    };
  }

  protected async setAppContext(): Promise<void> {
    this._appContext = new AppContextBuilder(
      this._verifiedUser,
      null,
      null,
      this._infrastructureServices
    );
    await this._appContext.init();
  }
}