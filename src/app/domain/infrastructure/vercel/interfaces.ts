import { APIResponse, DomainResponse } from "../../../external-dependencies/vercel";

export interface VercelDomain {
  addDomainToProject(domain: string): Promise<{ result?: DomainResponse; } & APIResponse>;
  removeDomainFromProject(domain: string): Promise<boolean>;
  getProjectDomain(domain: string): Promise<DomainResponse>;
}

export interface VercelDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}