import { TokenCredential, AzureCliCredential, ManagedIdentityCredential} from '@azure/identity';

export class AzureCredential {

  //There is a problem with VSCode Authentication as of 2022-12-07 
  // https://github.com/Azure/azure-sdk-for-js/issues/22904
  
  private _azureCredential : TokenCredential;
  private readonly _azureTenantId: string;
  private readonly _azureCredentialTokenScope = "https://management.azure.com/.default";

  constructor(
    azureTenantId: string, 
    azureResourceId: string
  ){
    this._azureTenantId = azureTenantId;

    if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"){
      this._azureCredential = new AzureCliCredential();
    } else {
      this._azureCredential = new ManagedIdentityCredential({resourceId: azureResourceId});
    }
  }


  async getAccessToken(scopes?: string | string[]): Promise<string> {
    const scope = scopes || this._azureCredentialTokenScope;
    const accessToken = await this._azureCredential.getToken(scope,{tenantId: this._azureTenantId});
    return accessToken.token;
  }

}
