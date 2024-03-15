import { Passport, ReadOnlyPassport, SystemPassport } from "./iam/passport";
import { ExecutionContext } from "../../domain-seedwork/execution-context";

export interface DomainExecutionContext extends ExecutionContext {
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