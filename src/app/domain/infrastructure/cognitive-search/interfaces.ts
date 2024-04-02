import { SearchIndex } from './base-types';
export * from './base-types';

export interface CognitiveSearchDomain {
  createIndexIfNotExists(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  createOrUpdateIndex(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  // search(indexName: string, searchText: string, options?: any): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  deleteDocument(indexName: string, document: any): Promise<void>;
  indexDocument(indexName: string, document: any): Promise<void>;
}

export interface CognitiveSearchDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}