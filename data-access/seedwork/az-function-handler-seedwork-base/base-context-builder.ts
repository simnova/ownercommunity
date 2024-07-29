import { AppContextBase } from "./base-app-context";

export interface BaseContext<InfrastructureServicesType, ApplicationServicesType, PassportType> {
  passport: PassportType;
  applicationServices: ApplicationServicesType;
  infrastructureServices: InfrastructureServicesType;
}

export abstract class BaseContextBuilder
<InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedUserType, AppContextType extends AppContextBase<VerifiedUserType, PassportType, ApplicationServicesType, InfrastructureServicesType>>
implements BaseContext<InfrastructureServicesType, ApplicationServicesType, PassportType> {
  protected _appContext: AppContextType;
  protected _infrastructureServices: InfrastructureServicesType;

  constructor(infrastructureServices: InfrastructureServicesType) {
    this._infrastructureServices = infrastructureServices;
  }

  public async init(): Promise<void> {
    await this.setVerifiedUser();
    await this.setAppContext();
  }

  protected abstract setVerifiedUser(): Promise<void>;
  
  protected abstract setAppContext(): Promise<void>;

  get passport(): PassportType {
    return this._appContext.passport;
  }

  get applicationServices(): ApplicationServicesType {
    return this._appContext.applicationServices;
  }

  get infrastructureServices(): InfrastructureServicesType {
    return this._infrastructureServices;
  }
}