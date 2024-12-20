import { SearchIndex } from "@azure/search-documents";
export { SearchDocumentsResult, SearchIndex, GeographyPoint } from '@azure/search-documents';


export interface CognitiveSearchBase {
  createIndexIfNotExists(indexDefinition: SearchIndex): Promise<void>;
  createOrUpdateIndexDefinition(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  deleteDocument(indexName: string, document: any): Promise<void>;
  indexDocument(indexName: string, document: any): Promise<void>;
  deleteIndex(indexName: string): Promise<void>;
  indexExists(indexName: string): boolean;
  initializeSearchClients(): Promise<void>
}