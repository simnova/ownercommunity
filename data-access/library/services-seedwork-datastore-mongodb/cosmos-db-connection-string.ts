
import axios from 'axios';
import {AzureCredential} from '../services-seedwork-identity/azure-credential';

export class CosmosDbConnectionString {
  
  private _azureCredential : AzureCredential;
  private readonly _azureTenantId: string;
  private readonly _azureSubscriptionId: string;
  private readonly _azureResourceGroupName: string;
  private readonly _azureCosmosDbAccountName: string;
  private readonly _azureCredentialTokenScope = "https://management.azure.com/.default";
  private _cosmosDbListConnectionStringUrl: string;

  constructor(
    azureTenantId: string, 
    azureSubscriptionId: string, 
    azureResourceGroupName: string, 
    azureCosmosDbAccountName: string
  ){
    this._azureTenantId = azureTenantId;
    this._azureSubscriptionId = azureSubscriptionId;
    this._azureResourceGroupName = azureResourceGroupName;
    this._azureCosmosDbAccountName = azureCosmosDbAccountName;
    this._cosmosDbListConnectionStringUrl = `https://management.azure.com/subscriptions/${this._azureSubscriptionId}/resourceGroups/${this._azureResourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${this._azureCosmosDbAccountName}/listConnectionStrings?api-version=2021-04-15`;
  }

  private getAccessToken = async (scopes?: string | string[]): Promise<string> => {
    const scope = scopes || this._azureCredentialTokenScope;
    this._azureCredential = new AzureCredential(
      this._azureTenantId,
      `/subscriptions/${this._azureSubscriptionId}/resourceGroups/${this._azureResourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${this._azureCosmosDbAccountName}`
      );
    const accessToken = await this._azureCredential.getAccessToken(scope);
    return accessToken;
  }

  private getConnectionStrings = async (): Promise<{connectionString: string, description: string}[]> => {
    const accessToken = await this.getAccessToken();
    const config = {
      method: 'post',
      url: this._cosmosDbListConnectionStringUrl,
      headers: { 
        'Authorization': `Bearer ${accessToken}`
      }
    };
    const response = await axios(config);
    const keysDict = response.data;
    return keysDict?.connectionStrings;
    /**
     * Possible values in ConnectionString Description:-
     * Primary MongoDB Connection String
     * Secondary MongoDB Connection String
     * Primary Read-Only MongoDB Connection String
     * Secondary Read-Only MongoDB Connection String
    */
  }

  public getReadWriteConnectionString = async (): Promise<string> => {
    const connectionStrings = await this.getConnectionStrings();
    const connectionStringToSelect = "Primary MongoDB Connection String";
    const connectionString = connectionStrings?.filter(rec => rec.description === connectionStringToSelect)?.[0]?.connectionString;
    return connectionString;
  };

}

