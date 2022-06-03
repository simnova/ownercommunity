import { AzureKeyCredential } from "@azure/search-documents";
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { AccountInfo } from "./account-info";
import { throws } from "assert";
import { AccountSasParameters } from "@azure/arm-maps";


export class Maps {
    private readonly mapKeyEnvVar =  'MAPS_KEY';
    private readonly _mapKey: string;
    private readonly _azureSubscriptionIDEnvVar: string =  'AZURE_SUBSCRIPTION_ID';
    private readonly _azureSubscriptionID: string;
    private readonly _azureMapsClient: AzureMapsManagementClient;

    private readonly _accountName: string;

    tryGetEnvVar(envVar: string): string {
        const value = process.env[envVar];
        if (value === undefined) {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
        return value;
    }

    constructor(){
        const {accountName, accountKey} = AccountInfo.getInstance().getSettings();
        this._mapKey = this.tryGetEnvVar(this.mapKeyEnvVar);
        this._azureSubscriptionID = this.tryGetEnvVar(this._azureSubscriptionIDEnvVar);
        //this._azureMapsClient = new AzureMapsManagementClient(this.azureKeyCredential, this._azureSubscriptionID );
    }

    public get mapKey(): string {
        return this._mapKey;
    }

    // For AzureMapsManagementClient
    // This is a parameter for ^
    public get azureKeyCredential(): AzureKeyCredential {
        return new AzureKeyCredential(this._mapKey);
    }

    public get accountName(): string {
        return this._accountName;
    }

    public generateSharedKey(resourceGroupName: string, accountName: string, mapsAccountSasParameters: AccountSasParameters): string {
        //var mapRequest = (new )
        return "";
    }
}