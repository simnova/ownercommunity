import { DomainVisa, ReadOnlyDomainVisa, SystemDomainVisa } from "../../src/app/domain/domain.visa";
import { BaseDomainExecutionContext } from "../../seedwork/domain-seedwork/base-domain-execution-context";

export interface DomainExecutionContext extends BaseDomainExecutionContext {
  domainVisa: DomainVisa;
}

export const SystemExecutionContext = (): DomainExecutionContext => {
  const context: DomainExecutionContext = {
    domainVisa: SystemDomainVisa.GetInstance(),
  };
  return context;
};

export const ReadOnlyContext = (): DomainExecutionContext => {
  const context: DomainExecutionContext = {
    domainVisa: ReadOnlyDomainVisa.GetInstance(),
  };
  return context;
};