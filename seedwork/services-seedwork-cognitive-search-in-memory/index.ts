import { CognitiveSearchDomain, SearchIndex, BaseDocumentType } from "../../src/app/domain/infrastructure/cognitive-search/interfaces";

export interface IMemoryCognitiveSearchCollection<DocumentType extends BaseDocumentType> {
  indexDocument(document: DocumentType): Promise<void>;
  deleteDocument(document: DocumentType): Promise<void>;
}
export interface IMemoryCognitiveSearch {
  createIndexIfNotExists(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  createOrUpdateIndex(indexName: string, indexDefinition: SearchIndex): Promise<void>;
  deleteDocument(indexName: string, document: any): Promise<void>;
  indexDocument(indexName: string, document: any): Promise<void>;
  search(indexName: string, searchText: string, options?: any): Promise<any>;
  logSearchCollectionIndexMap(): void;
}


export class MemoryCognitiveSearchCollection<DocumentType extends BaseDocumentType> implements IMemoryCognitiveSearchCollection<DocumentType> {
  private searchCollection: DocumentType[] = [];

  constructor () {}
  
  async indexDocument(document: DocumentType): Promise<void> {
    const existingDocument = this.searchCollection.find((i) => i.id === document.id);
    if (existingDocument) {
      const index = this.searchCollection.indexOf(existingDocument);
      this.searchCollection[index] = document;
    } else {
      this.searchCollection.push(document);
    }
  }
  async deleteDocument(document: DocumentType): Promise<void> {
    this.searchCollection = this.searchCollection.filter((i) => i.id !== document.id);
  }
}


export class MemoryCognitiveSearch implements IMemoryCognitiveSearch, CognitiveSearchDomain {
  
  private searchCollectionIndexMap: Map<string, MemoryCognitiveSearchCollection<any>>;
  private searchCollectionIndexDefinitionMap: Map<string, SearchIndex>;

  constructor() {
    this.searchCollectionIndexMap = new Map<string, MemoryCognitiveSearchCollection<any>>();
    this.searchCollectionIndexDefinitionMap = new Map<string, SearchIndex>();
  }

  async createIndexIfNotExists(indexName: string, indexDefinition: SearchIndex): Promise<void> {
    if (this.searchCollectionIndexMap.has(indexName)) return;
    this.createNewIndex(indexName, indexDefinition);
  }
  private createNewIndex(indexName: string, indexDefinition: SearchIndex) {
    this.searchCollectionIndexDefinitionMap.set(indexName, indexDefinition);
    this.searchCollectionIndexMap.set(indexName, new MemoryCognitiveSearchCollection());
  }

  async createOrUpdateIndex(indexName: string, indexDefinition: SearchIndex): Promise<void> {
    if (this.searchCollectionIndexMap.has(indexName)) return;
    this.createNewIndex(indexName, indexDefinition);
  }
  async deleteDocument(indexName: string, document: any): Promise<void> {
    const collection = this.searchCollectionIndexMap.get(indexName);
    if (collection) {
      collection.deleteDocument(document);
    }
  }
  async indexDocument(indexName: string, document: any): Promise<void> {
    const collection = this.searchCollectionIndexMap.get(indexName);
    if (collection) {
      collection.indexDocument(document);
    }
  }

  async search(indexName: string, searchText: string, options?: any): Promise<any> {
    throw new Error('MemoryCognitiveSearch:search - Method not implemented.');
  }

  logSearchCollectionIndexMap() {
    for (const [key, value] of this.searchCollectionIndexMap.entries()) {
      console.log(`Index: ${key} |  Documents: ${JSON.stringify(value)}`);
    }
  } 
}