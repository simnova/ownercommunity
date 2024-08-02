import { SearchIndex } from "@azure/search-documents";
export { SearchDocumentsResult, SearchIndex, GeographyPoint } from '@azure/search-documents';


export interface CognitiveSearchBase {
  createIndexIfNotExists(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  createOrUpdateIndex(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  deleteDocument(indexName: string, document: any): Promise<void>;
  indexDocument(indexName: string, document: any): Promise<void>;
}