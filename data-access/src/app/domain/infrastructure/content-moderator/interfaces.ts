import { ContentModeratorBase } from '../../../../../seedwork/services-seedwork-content-moderator-interfaces';

export interface ContentModeratorDomain extends ContentModeratorBase {}

export interface ContentModeratorDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}
