import { DefaultAzureCredential, DefaultAzureCredentialOptions, TokenCredential } from '@azure/identity';
import { SearchIndexClient, SearchClient, AzureKeyCredential, SearchIndex, SearchDocumentsResult } from '@azure/search-documents';
import { CognitiveSearchDomain } from '../../src/app/domain/infrastructure/cognitive-search/interfaces';

export class AzCognitiveSearch implements CognitiveSearchDomain {
  private client: SearchIndexClient;
  private searchClients: Map<string, SearchClient<unknown>> = new Map<string, SearchClient<unknown>>();

  tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }
  constructor(searchKey: string, endpoint: string) {
    let credentials : TokenCredential;
    
    if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"){
      credentials = new DefaultAzureCredential();
    } else if (process.env.MANAGED_IDENTITY_CLIENT_ID !== undefined) {
      credentials = new DefaultAzureCredential({ ManangedIdentityClientId: process.env.MANAGED_IDENTITY_CLIENT_ID } as DefaultAzureCredentialOptions);
    } else {
      credentials = new DefaultAzureCredential();
    }

    this.client = new SearchIndexClient(endpoint, credentials);
  }

  async createIndexIfNotExists(indexName: string, indexDefinition: SearchIndex): Promise<void> {
    if (this.searchClients.has(indexName)) return;
    let index : SearchIndex;
    try {
      index = await this.client.getIndex(indexName);
      console.log(`Index ${index.name} already exists`);
    } catch (err) {
      console.log(`Index ${indexName} does not exist error ${JSON.stringify(err)} thrown, creating it...`);
      index = await this.client.createIndex(indexDefinition);
      console.log(`Index ${index.name} created`);
    }
    this.searchClients.set(indexName, this.client.getSearchClient(indexName));
  }

  async createOrUpdateIndex(indexName: string, indexDefinition: SearchIndex): Promise<void> {
    if (this.searchClients.has(indexName)) return;
    let index : SearchIndex;
    try{
      index = await this.client.getIndex(indexName);
    } catch (err) {
      console.log(`Index ${indexName} does not exist error ${JSON.stringify(err)} thrown, creating it...`);
      index = await this.client.createIndex(indexDefinition);
      console.log(`Index ${index.name} created`);
    }
   
    index = await this.client.createOrUpdateIndex(indexDefinition);
    console.log(`Index ${index.name} updated`);
 
    this.searchClients.set(indexName, this.client.getSearchClient(indexName));
  }

  async search(indexName: string, searchText: string, options?: any): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const result = await this.client.getSearchClient(indexName).search(searchText, options);
    console.log('search result', result);
    return result;
  }

  async deleteDocument(indexName: string, document: any): Promise<void> {
    await this.client.getSearchClient(indexName).deleteDocuments([document]);
  }

  async indexDocument(indexName: string, document: any): Promise<void> {
    //return this.searchClients.get(indexName)!.indexDocuments([document]);
    const searchClient = this.searchClients.get(indexName);

    searchClient.mergeOrUploadDocuments([document]);
  }

  // async updateIndex(indexName: string) {
  //   const index = await this.client.getIndex(indexName);
  //   this.client.createOrUpdateIndex(index);
  // }
}
