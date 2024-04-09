import { SearchIndex } from '../../../external-dependencies/cognitive-search';

export interface CognitiveSearchDomain {
  createIndexIfNotExists(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  createOrUpdateIndex(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  deleteDocument(indexName: string, document: any): Promise<void>;
  indexDocument(indexName: string, document: any): Promise<void>;
}

export interface CognitiveSearchDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}