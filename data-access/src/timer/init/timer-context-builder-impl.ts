import { InvocationContext, Timer } from "@azure/functions";
import { TimerContext, TimerContextBuilder } from "../../../seedwork/az-function-handler-seedwork-timer/timer-context-builder";
import { AppContext, AppContextBuilder, VerifiedJwtPayloadType } from "../../app/init/app-context-builder";
import { InfrastructureServices } from "../../app/infrastructure-services";
import { ApplicationServices } from "../../app/application-services";
import { Passport } from "../../app/init/passport";

export type VerifiedJwtTimerPayloadType = {
  timerStuff: string;
}

export class TimerContextBuilderImpl
 extends TimerContextBuilder 
  <InfrastructureServices, ApplicationServices, Passport, VerifiedJwtPayloadType, AppContext>
 implements TimerContext<InfrastructureServices, ApplicationServices, Passport> {
  constructor(timer: Timer, context: InvocationContext, infrastructureServices: InfrastructureServices) {
    super(timer, context, infrastructureServices);
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
        // timerStuff: ''
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