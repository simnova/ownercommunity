import { Passport, ReadOnlyPassport, SystemPassport } from "./iam/passport";
import { BaseDomainExecutionContext } from "../../../../seedwork/domain-seedwork/base-domain-execution-context";

export interface DomainExecutionContext extends BaseDomainExecutionContext {
  passport: Passport;
}

export const SystemExecutionContext = (): DomainExecutionContext => {
  const context: DomainExecutionContext = {
    passport: SystemPassport.GetInstance(),
  };
  return context;
};

export const ReadOnlyContext = (): DomainExecutionContext => {
  const context: DomainExecutionContext = {
    passport: ReadOnlyPassport.GetInstance(),
  };
  return context;
};