import { InvocationContext, Timer } from "@azure/functions";
import { AppContext, AppContextBuilder } from "../../src/app/init/app-context-builder";
import { InfrastructureServicesBuilder } from "../../src/init/infrastructure-services-builder";
import { ApplicationServices } from "../../src/app/application-services";
import { InfrastructureServices } from "../../src/app/infrastructure-services";

export type VerifiedUser = {
  verifiedJWT: any;
  openIdConfigKey: string;
};

export interface TimerContext {
  timer: Timer;
  invocationId: string;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
}

export class TimerContextBuilder implements TimerContext {
  private _timer: Timer;
  private _invocationId: string;
  private _verifiedUser: VerifiedUser;
  private _appContext: AppContext;
  private _infrastructureServices: InfrastructureServices;

  constructor(timer: Timer, context: InvocationContext, infrastructureServices: InfrastructureServicesBuilder) {
    this._timer = timer;
    this._invocationId = context.invocationId;
    this._infrastructureServices = infrastructureServices;
  }

  public async init(): Promise<void> {
    this.setVerifiedUser();
    await this.setAppContext();
  }

  private setVerifiedUser(): void {
    this._verifiedUser = {
      verifiedJWT: {},
      openIdConfigKey: 'SYSTEM'
    }
  }

  private async setAppContext(): Promise<void> {
    this._appContext = new AppContextBuilder(this._verifiedUser, null, null, this._infrastructureServices);
    await this._appContext.init();
  }

  get timer(): Timer {
    return this._timer;
  }

  get invocationId(): string {
    return this._invocationId;
  }

  get applicationServices(): ApplicationServices {
    return this._appContext.applicationServices;
  }

  get infrastructureServices(): InfrastructureServices {
    return this._infrastructureServices;
  }
}