import { InvocationContext, Timer } from "@azure/functions";
import { TimerContext, TimerContextBuilder } from "../../../seedwork/seedwork-az-function-handler_timer/timer-context-builder";
import { InfrastructureServicesBuilder } from "../../init/infrastructure-services-builder";
import { AppContextBuilder } from "../../app/init/app-context-builder";

export class TimerContextBuilderImpl extends TimerContextBuilder implements TimerContext {
  constructor(timer: Timer, context: InvocationContext, infrastructureServices: InfrastructureServicesBuilder) {
    super(timer, context, infrastructureServices);
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