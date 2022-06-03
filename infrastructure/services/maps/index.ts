import { AzureKeyCredential } from "@azure/search-documents";
import { throws } from "assert";


export class Maps {
    private readonly mapKeyEnvVar =  'MAPS_KEY';
    private readonly _mapKey: string;
    private readonly _azureSubscriptionKeyEnvVar: string =  'AZURE_SUBSCRIPTION_KEY';
    private readonly _azureSubscriptionKey: string;

    tryGetEnvVar(envVar: string): string {
        const value = process.env[envVar];
        if (value === undefined) {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
        return value;
    }

    constructor(){
        this._mapKey = this.tryGetEnvVar(this.mapKeyEnvVar);
        this._azureSubscriptionKey = this.tryGetEnvVar(this._azureSubscriptionKeyEnvVar);
    }

    public get mapKey(): string {
        return this._mapKey;
    }

    public get azureKeyCredential(): AzureKeyCredential {
        return new AzureKeyCredential(this._mapKey);
    }
}