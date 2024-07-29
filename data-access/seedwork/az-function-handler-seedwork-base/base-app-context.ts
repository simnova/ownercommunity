
export interface AppContextBase<VerifiedUserType, PassportType, ApplicationServicesType, InfrastructureServicesType> {  // extends DomainExecutionContext {
  verifiedUser: VerifiedUserType;
  passport: PassportType;
  applicationServices: ApplicationServicesType;
  infrastructureServices: InfrastructureServicesType;
  init(): Promise<void>;
}

export type VerifiedUser<VerifiedJwtPayloadType> = {
  verifiedJWT: VerifiedJwtPayloadType;
  openIdConfigKey: string;
};