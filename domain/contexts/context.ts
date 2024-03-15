import { Passport } from "./iam/passport";
import { ExecutionContext } from "../../domain-seedwork/execution-context";

export interface DomainExecutionContext extends ExecutionContext {
  passport: Passport;
}