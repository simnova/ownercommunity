import { DomainVisa, ReadOnlyDomainVisa, SystemDomainVisa } from "./domain.visa";
import { BaseDomainExecutionContext } from "../../../seedwork/domain-seedwork/base-domain-execution-context";

export interface DomainExecutionContext extends BaseDomainExecutionContext {
  domainVisa: DomainVisa;
}

export const SystemDomainExecutionContext = (): DomainExecutionContext => {
  const context: DomainExecutionContext = {
    domainVisa: SystemDomainVisa.GetInstance(),
  };
  return context;
};

export const ReadOnlyDomainExecutionContext = (): DomainExecutionContext => {
  const context: DomainExecutionContext = {
    domainVisa: ReadOnlyDomainVisa.GetInstance(),
  };
  return context;
};