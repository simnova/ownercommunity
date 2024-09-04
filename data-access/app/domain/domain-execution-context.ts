import { BaseDomainExecutionContext } from "@library/domain-seedwork/base-domain-execution-context";
import { DomainVisa, SystemDomainVisa, ReadOnlyDomainVisa } from "@app/main/domain.visa";


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