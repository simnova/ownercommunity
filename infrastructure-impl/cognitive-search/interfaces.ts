import { CognitiveSearchDomain, CognitiveSearchDomainInitializeable } from "../../domain/infrastructure/cognitive-search/interfaces";

export interface CognitiveSearchInfrastructure extends CognitiveSearchDomain, CognitiveSearchDomainInitializeable {
  search(indexName: string, searchText: string, options?: any): Promise<any>;
}