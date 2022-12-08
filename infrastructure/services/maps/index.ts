import { AzureMapsManagementClient } from '@azure/arm-maps';
import { AccountSasParameters } from '@azure/arm-maps';
import { useIdentityPlugin,ManagedIdentityCredential, TokenCredential, DefaultAzureCredential} from '@azure/identity';
import { vsCodePlugin } from "@azure/identity-vscode";
import dayjs from 'dayjs';
import { setLogLevel } from '@azure/logger';

export class Maps {

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
          useIdentityPlugin(vsCodePlugin)
          credentials = new DefaultAzureCredential( );
        }else{
          credentials = new ManagedIdentityCredential();
        }

        console.log('mapCredentials:',credentials);
        
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
            
            let sasParams : AccountSasParameters = {
              expiry : dayjs().add(10, 'minutes').toISOString(), 
              maxRatePerSecond: 10, 
              principalId: this._principalId, 
              start: dayjs().subtract(5, 'minutes').toISOString(), 
              signingKey: "primaryKey"
            }
            var sasToken = await this._azureMapsClient.accounts.listSas(this._resourceGroup, this._mapsAccountName, sasParams); // ,  { expiry : dayjs().add(10, 'minutes').toISOString(), maxRatePerSecond: 10, principalId: "", start: dayjs().subtract(5, 'minutes').toISOString()} as AccountSasParameters
            var tokenString = sasToken.accountSasToken ?? "" ;
            console.log('tokenString:',tokenString);
            return tokenString;
        } catch (error) {
            console.log(error);
            return JSON.stringify(error);
        }
    }
}