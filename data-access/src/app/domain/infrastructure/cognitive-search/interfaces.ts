import { CognitiveSearchBase } from '../../../../../seedwork/services-seedwork-cognitive-search-interfaces';

export interface CognitiveSearchDomain extends CognitiveSearchBase {}

export interface CognitiveSearchDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}
