import { InvocationContext } from "@azure/functions";
import { QueueContext, QueueContextBuilder } from "../../../seedwork/seedwork-az-function-handler_queue/queue-context-builder";
import { AppContextBuilder } from "../../app/init/app-context-builder";
import { InfrastructureServicesBuilder } from "../../init/infrastructure-services-builder";

export class QueueContextBuilderImpl extends QueueContextBuilder implements QueueContext {
  constructor(queueItem: any, context: InvocationContext, infrastructureServices: InfrastructureServicesBuilder) {
    super(queueItem, context, infrastructureServices);
  }

  protected async setVerifiedUser(): Promise<void> {
    this._verifiedUser = {
      verifiedJWT: {},
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