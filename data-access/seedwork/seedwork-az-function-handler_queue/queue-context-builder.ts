import { InvocationContext } from "@azure/functions";
import { AppContext, AppContextBuilder, VerifiedUser } from "../../src/app/init/app-context-builder";
import { InfrastructureServicesBuilder } from "../../src/init/infrastructure-services-builder";
import { ApplicationServices } from "../../src/app/application-services";
import { InfrastructureServices } from "../../src/app/infrastructure-services";

export interface QueueContext {
  payload: any;
  invocationId: string;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
}

export class QueueContextBuilder implements QueueContext{
  private _payload: any;
  private _verifiedUser: VerifiedUser;
  private _invocationId: string;
  private _appContext: AppContext;
  private _infrastructureServices: InfrastructureServices;

  constructor(queueItem: any, context: InvocationContext, infrastructureServices: InfrastructureServicesBuilder) {
    this._payload = JSON.parse(JSON.stringify(queueItem));
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
    this._appContext = new AppContextBuilder(this._verifiedUser, undefined, '', this._infrastructureServices);
    await this._appContext.init();
  }

  get payload(): any {
    return this._payload;
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