import { CognitiveSearchDomain, CognitiveSearchDomainInitializeable } from "../../domain/infrastructure/cognitive-search/interfaces";

export interface CognitiveSearchInfrastructureService extends CognitiveSearchDomain, CognitiveSearchDomainInitializeable {
  search(indexName: string, searchText: string, options?: any): Promise<any>;
}