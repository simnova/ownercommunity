export class AccountInfo {
    private static instance: AccountInfo;

    private readonly mapAccountNameEnvKey = 'MAPS_ACCOUNT_NAME';
    private readonly mapAccountKeyEnvKey = 'MAPS_KEY';

    private readonly accountName: string;
    private readonly accountKey: string;

    private constructor() {
        this.accountName = this.tryGetEnvVar(this.mapAccountNameEnvKey);
        this.accountKey = this.tryGetEnvVar(this.mapAccountKeyEnvKey);
    }

    public getSettings()  {
        return {
          accountName: this.accountName,
          accountKey: this.accountKey
        }
    }

    static getInstance(): AccountInfo {
        if (!AccountInfo.instance) {
            AccountInfo.instance = new AccountInfo();
        }
        return AccountInfo.instance;
    }

    private tryGetEnvVar = (envVar:string):string =>{
        const value = process.env[envVar];
        if(value === undefined){
          throw new Error(`Environment variable: ${envVar} is not set`);
        }
        return value;
    }

}