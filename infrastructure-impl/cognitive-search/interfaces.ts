import { CognitiveSearchDomain } from "../../domain/infrastructure/cognitive-search/interfaces";

export interface CognitiveSearchInfrastructure extends CognitiveSearchDomain {
  search(indexName: string, searchText: string, options?: any): Promise<any>;
}