import { DefaultAzureCredential, DefaultAzureCredentialOptions, TokenCredential } from "@azure/identity";
import { SearchIndexClient, SearchClient, SearchIndex, SearchDocumentsResult, AzureKeyCredential } from "@azure/search-documents";
import { CognitiveSearchBase } from "../services-seedwork-cognitive-search-interfaces";

export class AzCognitiveSearch implements CognitiveSearchBase {
  private client: SearchIndexClient;

  tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  constructor(searchKey: string, endpoint: string) {
    let credentials: TokenCredential;
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
      credentials = new DefaultAzureCredential();
    } else if (process.env.MANAGED_IDENTITY_CLIENT_ID !== undefined) {
      credentials = new DefaultAzureCredential({ ManangedIdentityClientId: process.env.MANAGED_IDENTITY_CLIENT_ID } as DefaultAzureCredentialOptions);
    } else {
      credentials = new DefaultAzureCredential();
    }
    this.client = new SearchIndexClient(endpoint, credentials);
  }

  // check if index exists
  async indexExists(indexName: string): Promise<boolean> {
    const indexes = await this.client.listIndexesNames();
    for await (const name of indexes) {
      if (name === indexName) {
        return true;
      }
    }
    return false;
  }

  async createIndexIfNotExists(indexName: string, indexDefinition: SearchIndex): Promise<void> {
    const indexExists = await this.indexExists(indexName);
    if (!indexExists) {
      await this.client.createIndex(indexDefinition);
      console.log(`Index ${indexName} created`);
    }
  }

  async createOrUpdateIndexDefinition(indexName: string, indexDefinition: SearchIndex): Promise<void> {
    try {
      const indexExists = await this.indexExists(indexName);
      if (!indexExists) {
        await this.client.createIndex(indexDefinition);
      } else {
        await this.client.createOrUpdateIndex(indexDefinition);
        console.log(`Index ${indexName} updated`);
      }
    } catch (error) {
      throw new Error(`Failed to create or update index ${indexName}: ${error.message}`);
    }
  }

  async search(indexName: string, searchText: string, options?: any): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    let searchClient = this.client.getSearchClient(indexName);
    const result = await searchClient.search(searchText, options);
    console.log("search result", result);
    return result;
  }

  async deleteDocument(indexName: string, document: any): Promise<void> {
    await this.client.getSearchClient(indexName).deleteDocuments([document]);
  }

  async indexDocument(indexName: string, document: any): Promise<void> {
    const searchClient = this.client.getSearchClient(indexName);
    searchClient.mergeOrUploadDocuments([document]);
  }

  async deleteIndex(indexName: string): Promise<void> {
    return this.client.deleteIndex(indexName);
  }

  // async updateIndex(indexName: string) {
  //   const index = await this.client.getIndex(indexName);
  //   this.client.createOrUpdateIndex(index);
  // }
}
