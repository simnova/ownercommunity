import { ApplicationServices } from "../../src/app/application-services";
import { InfrastructureServices } from "../../src/app/infrastructure-services";
import { AppContext } from "../../src/app/init/app-context-builder";
import { Passport } from "../../src/app/init/passport";
import { VerifiedUser } from "../seedwork-az-function-handler_http/http-context-builder";

export interface BaseContext {
  passport: Passport;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
}

export abstract class BaseContextBuilder implements BaseContext {
  protected _verifiedUser: VerifiedUser;
  protected _appContext: AppContext;
  protected _infrastructureServices: InfrastructureServices;

  constructor(infrastructureServices: InfrastructureServices) {
    this._infrastructureServices = infrastructureServices;
  }

  public async init(): Promise<void> {
    await this.setVerifiedUser();
    await this.setAppContext();
  }

  protected abstract setVerifiedUser(): Promise<void>;
  
  protected abstract setAppContext(): Promise<void>;

  get passport(): Passport {
    return this._appContext.passport;
  }

  get applicationServices(): ApplicationServices {
    return this._appContext.applicationServices;
  }

  get infrastructureServices(): InfrastructureServices {
    return this._infrastructureServices;
  }
}