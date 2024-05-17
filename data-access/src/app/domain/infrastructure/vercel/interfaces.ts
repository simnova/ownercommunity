import { VercelBase } from '../../../../../seedwork/services-seedwork-vercel-api/interfaces';

export interface VercelDomain extends VercelBase {}

export interface VercelDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}
