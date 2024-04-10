import { AccountSasParameters, AzureMapsManagementClient } from '@azure/arm-maps';
import { TokenCredential, DefaultAzureCredential, DefaultAzureCredentialOptions, AzureCliCredential} from '@azure/identity';
import dayjs from 'dayjs';
import { setLogLevel } from '@azure/logger';

export class AzMaps {

    //There is a problem with VSCode Authentication as of 2022-12-07 
    // https://github.com/Azure/azure-sdk-for-js/issues/22904

    private readonly _azureSubscriptionIDEnvVar: string =  'MAPS_AZURE_SUBSCRIPTION_ID';
    private readonly _azureSubscriptionID: string;

    private readonly _resourceGroupKey: string = "MAPS_RESOURCE_GROUP";
    private readonly _resourceGroup: string;

    private readonly _principalIdKey: string = "MAPS_OBJECT_PRINCIPAL_ID";
    private readonly _principalId: string;

    private readonly _mapsAccountNameKey:string = "MAPS_ACCOUNT_NAME";
    private readonly _mapsAccountName: string;

    private readonly _mapsClientIdKey:string = "MAPS_USER_ASSIGNED_FUNCTION_IDENTITY_CLIENT_ID";
    private readonly _mapsClientId: string;

    private readonly _azureMapsClient: AzureMapsManagementClient;
    
    private tryGetEnvVar(envVar: string): string {
        const value = process.env[envVar];
        if (value === undefined) {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
        return value;
    }
    /**
     * Constructor
     * requires the following environment variables:
     * AZURE_SUBSCRIPTION_ID
     * RESOURCE_GROUP - the resource group that contains the Azure Maps account
     * OBJECT_PRINCIPAL_ID - object ID of the Identity assigned to the Azure Maps account
     * MAPS_ACCOUNT_NAME - the name of the Azure Maps account
     */
    constructor(){
      try {
        setLogLevel("info");

        this._azureSubscriptionID = this.tryGetEnvVar(this._azureSubscriptionIDEnvVar);
        let credentials : TokenCredential;

        if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"){
          credentials = new AzureCliCredential();
        } else if (process.env.MANAGED_IDENTITY_CLIENT_ID !== undefined) {
          credentials = new DefaultAzureCredential({ ManangedIdentityClientId: process.env.MANAGED_IDENTITY_CLIENT_ID } as DefaultAzureCredentialOptions);
        } else {
          credentials = new DefaultAzureCredential();
        }
        
        this._azureMapsClient = new AzureMapsManagementClient(credentials, this._azureSubscriptionID);
        this._resourceGroup = this.tryGetEnvVar(this._resourceGroupKey);
        this._principalId = this.tryGetEnvVar(this._principalIdKey);
        this._mapsAccountName = this.tryGetEnvVar(this._mapsAccountNameKey);
      } catch (error) {
        console.error('Error in Maps constructor: ', error);
      }
    }
    
    /**
     * Generate a SAS token for the Azure Maps account
     * @returns {Promise<string>} The SAS token
     * uses the Azure Maps SDK for JS - management client
     **/  
    public async generateSharedKey(): Promise<string> {
      try {
        const sasParams : AccountSasParameters = {
          expiry : dayjs().add(10, 'minutes').toISOString(), 
          maxRatePerSecond: 10, 
          principalId: this._principalId, 
          start: dayjs().subtract(5, 'minutes').toISOString(), 
          signingKey: "primaryKey"
        }
        const sasToken = await this._azureMapsClient.accounts.listSas(this._resourceGroup, this._mapsAccountName, sasParams); // ,  { expiry : dayjs().add(10, 'minutes').toISOString(), maxRatePerSecond: 10, principalId: "", start: dayjs().subtract(5, 'minutes').toISOString()} as AccountSasParameters
        const tokenString = sasToken.accountSasToken ?? "" ;
        console.log('tokenString:',tokenString);
        return tokenString;
      } catch (error) {
        console.log(error);
        return JSON.stringify(error);
      }
    }
}