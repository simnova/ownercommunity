import { SearchIndex, SearchDocumentsResult } from '@azure/search-documents';


export interface ICognitiveSearch {
  createIndexIfNotExists(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  createOrUpdateIndex(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  search(indexName: string, searchText: string, options?: any): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  deleteDocument(indexName: string, document: any): Promise<void>;
  indexDocument(indexName: string, document: any): Promise<void>;
}
