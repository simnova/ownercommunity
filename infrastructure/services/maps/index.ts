import { AzureKeyCredential } from "@azure/search-documents";
import { AccountsListKeysResponse, AzureMapsManagementClient, MapsAccount } from "@azure/arm-maps";
import { AccountInfo } from "./account-info";
import { throws } from "assert";
import { AccountSasParameters } from "@azure/arm-maps";
import { DefaultAzureCredential, DefaultAzureCredentialOptions, TokenCredential, useIdentityPlugin, VisualStudioCodeCredential } from "@azure/identity";
import dayjs from 'dayjs';
import { setLogLevel } from "@azure/logger";
import { vsCodePlugin } from "@azure/identity-vscode";
import { env } from "process";

export class Maps {
    private readonly mapKeyEnvVarKey =  'MAPS_KEY';
    private readonly _mapKey: string;
    private readonly _azureSubscriptionIDEnvVar: string =  'AZURE_SUBSCRIPTION_ID';
    private readonly _azureSubscriptionID: string;
    private readonly _azureMapsClient: AzureMapsManagementClient;
    private readonly _resourceGroupKey: string = "RESOURCE_GROUP";
    private readonly _resourceGroup: string;
    private readonly _principalIdKey: string = "OBJECT_PRINCIPAL_ID";
    private readonly _principalId: string;
    private readonly _mapsAccountNameKey: "MAPS_ACCOUNT_NAME";
    private readonly _mapsAccountName: string;

    // private readonly _accountName: string;

    private readonly _appIdentityKey: string = "AZURE_FUNCTION_APP_IDENTITY";
    // private readonly _credentials: TokenCredential; 

    tryGetEnvVar(envVar: string): string {
        const value = process.env[envVar];
        if (value === undefined) {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
        return value;
    }

    constructor(){
        setLogLevel("info");
        // const {accountName, accountKey} = AccountInfo.getInstance().getSettings();
        this._mapKey = this.tryGetEnvVar(this.mapKeyEnvVarKey);
        this._azureSubscriptionID = this.tryGetEnvVar(this._azureSubscriptionIDEnvVar);
        let credentials;
        if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"){
            useIdentityPlugin(vsCodePlugin)
            credentials = new DefaultAzureCredential( );

        }
        else {
            credentials = new DefaultAzureCredential( { ManangedIdentityClientId: this.tryGetEnvVar(this._appIdentityKey) } as DefaultAzureCredentialOptions);
        } 
        console.log(credentials);
        this._azureMapsClient = new AzureMapsManagementClient(credentials, this._azureSubscriptionID );
        this._resourceGroup = this.tryGetEnvVar(this._resourceGroupKey);
        this._principalId = this.tryGetEnvVar(this._principalIdKey);
        this._mapsAccountName = this.tryGetEnvVar("MAPS_ACCOUNT_NAME");
    }

    public get mapKey(): string {
        return this._mapKey;
    }

    // For AzureMapsManagementClient
    // This is a parameter for ^
    public get azureKeyCredential(): AzureKeyCredential {
        return new AzureKeyCredential(this._mapKey);
    }

    public async listKeys(): Promise<AccountsListKeysResponse> {
        return await this._azureMapsClient.accounts.listKeys(this._resourceGroup, this._mapsAccountName);
    }

    public async generateSharedKey(): Promise<string> {
        try {
            var primaryKey = (await this.listKeys()).primaryKey??"";
            var sasToken = await this._azureMapsClient.accounts.listSas(this._resourceGroup, this._mapsAccountName, { expiry : dayjs().add(10, 'minutes').toISOString(), maxRatePerSecond: 10, principalId: this._principalId, start: dayjs().subtract(5, 'minutes').toISOString(), signingKey: "primaryKey"} as AccountSasParameters); // ,  { expiry : dayjs().add(10, 'minutes').toISOString(), maxRatePerSecond: 10, principalId: "", start: dayjs().subtract(5, 'minutes').toISOString()} as AccountSasParameters
            return sasToken.accountSasToken ?? "" ;
        } catch (error) {
            console.log(error);
            return JSON.stringify(error);
        }
    }
}