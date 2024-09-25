import { InfrastructureContextBase } from "../../../seedwork/infrastructure-seedwork/infrastructure-context-base";
import { AuditContext, ReadOnlyAuditContext, SystemAuditContext } from "./audit-context";

export interface InfrastructureContext extends InfrastructureContextBase {
  auditContext: AuditContext;
}

export const ReadOnlyInfrastructureContext = (): InfrastructureContext => {
  const context: InfrastructureContext = {
    auditContext: ReadOnlyAuditContext.GetInstance(),
  };
  return context;
};

export const SystemInfrastructureContext = (): InfrastructureContext => {
  const context: InfrastructureContext = {
    auditContext: SystemAuditContext.GetInstance(),
  };
  return context;
};