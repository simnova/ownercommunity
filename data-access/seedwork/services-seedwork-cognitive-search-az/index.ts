import { DefaultAzureCredential, DefaultAzureCredentialOptions, TokenCredential } from '@azure/identity';
import { SearchIndexClient, SearchClient, SearchIndex, SearchDocumentsResult, AzureKeyCredential } from '@azure/search-documents';
import { CognitiveSearchBase } from '../services-seedwork-cognitive-search-interfaces';

export class AzCognitiveSearch implements CognitiveSearchBase {
  private client: SearchIndexClient;
  private searchClients: Map<string, SearchClient<unknown>> = new Map<string, SearchClient<unknown>>();

  tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  constructor(endpoint: string) {
    let credentials: TokenCredential;
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      credentials = new DefaultAzureCredential();
    } else if (process.env.MANAGED_IDENTITY_CLIENT_ID !== undefined) {
      credentials = new DefaultAzureCredential({ ManangedIdentityClientId: process.env.MANAGED_IDENTITY_CLIENT_ID } as DefaultAzureCredentialOptions);
    } else {
      credentials = new DefaultAzureCredential();
    }
    this.client = new SearchIndexClient(endpoint, credentials);
  }

  private getSearchClient(indexName: string): SearchClient<unknown> {
    let client = this.searchClients.get(indexName);
    if (!client) {
      client = this.client.getSearchClient(indexName);
      this.searchClients.set(indexName, client);
    }
    return client;
  }

  // check if index exists
  async indexExists(indexName: string): Promise<boolean> {
    return this.searchClients.has(indexName);
  }

  async createIndexIfNotExists(indexDefinition: SearchIndex): Promise<void> {
    const indexExists = this.indexExists(indexDefinition.name);
    if (!indexExists) {
      try {
        await this.client.createIndex(indexDefinition);
        this.searchClients.set(indexDefinition.name, this.client.getSearchClient(indexDefinition.name));
        console.log(`Index ${indexDefinition.name} created`);
      } catch (error) {
        throw new Error(`Failed to create index ${indexDefinition.name}: ${error.message}`);
      }
    }
  }

  async createOrUpdateIndexDefinition(indexName: string, indexDefinition: SearchIndex): Promise<void> {
    try {
      const indexExists = this.indexExists(indexName);
      if (!indexExists) {
        await this.client.createIndex(indexDefinition);
        this.searchClients.set(indexDefinition.name, this.client.getSearchClient(indexDefinition.name));
      } else {
        await this.client.createOrUpdateIndex(indexDefinition);
        console.log(`Index ${indexName} updated`);
      }
    } catch (error) {
      throw new Error(`Failed to create or update index ${indexName}: ${error.message}`);
    }
  }

  async search(indexName: string, searchText: string, options?: any): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const startTime = new Date();
    const result = await this.getSearchClient(indexName).search(searchText, options);
    console.log(`SearchLibrary took ${new Date().getTime() - startTime.getTime()}ms`);
    return result;
  }

  async deleteDocument(indexName: string, document: any): Promise<void> {
    try {
      await this.searchClients.get(indexName).deleteDocuments([document]);
    } catch (error) {
      throw new Error(`Failed to delete document from index ${indexName}: ${error.message}`);
    }
  }

  async indexDocument(indexName: string, document: any): Promise<void> {
    try {
      await this.searchClients.get(indexName).mergeOrUploadDocuments([document]);
    } catch (error) {
      throw new Error(`Failed to index document in index ${indexName}: ${error.message}`);
    }
  }

  async deleteIndex(indexName: string): Promise<void> {
    try {
      await this.client.deleteIndex(indexName);
      this.searchClients.delete(indexName);
      console.log(`Index ${indexName} deleted`);
    } catch (error) {
      throw new Error(`Failed to delete index ${indexName}: ${error.message}`);
    }
  }

  // async updateIndex(indexName: string) {
  //   const index = await this.client.getIndex(indexName);
  //   this.client.createOrUpdateIndex(index);
  // }
}
