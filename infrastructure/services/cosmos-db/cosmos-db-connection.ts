import mongoose from 'mongoose';
import { CosmosDbConnectionString } from './cosmos-db-connection-string';

export class CosmosDbConnection {
  private static instance: CosmosDbConnection;

  private _azureTenantId: string;
  private _azureSubscriptionId: string;
  private _azureResourceGroupName: string;
  private _azureCosmosDbAccountName: string;
  private _cosmosDbName: string;
  private _autoIndex: boolean;
  private _autoCreate: boolean;
  private _minPoolSize: number;
  private _maxPoolSize: number;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(
    azureTenantId: string, 
    azureSubscriptionId: string, 
    azureResourceGroupName: string, 
    azureCosmosDbAccountName: string,
    dbName: string,
    autoIndex: boolean = false,
    autoCreate: boolean = false,
    minPoolSize: number = 10,
    maxPoolSize: number = 100,
  ): CosmosDbConnection {
    if (!CosmosDbConnection.instance) {
      CosmosDbConnection.instance = new CosmosDbConnection();
      CosmosDbConnection.instance._azureTenantId = azureTenantId;
      CosmosDbConnection.instance._azureSubscriptionId = azureSubscriptionId;
      CosmosDbConnection.instance._azureResourceGroupName = azureResourceGroupName;
      CosmosDbConnection.instance._azureCosmosDbAccountName = azureCosmosDbAccountName;
      CosmosDbConnection.instance._cosmosDbName = dbName;
      CosmosDbConnection.instance._autoIndex = autoIndex;
      CosmosDbConnection.instance._autoCreate = autoCreate;
      CosmosDbConnection.instance._minPoolSize = minPoolSize;
      CosmosDbConnection.instance._maxPoolSize = maxPoolSize;
    } else {
      throw new Error('You can only create one instance of CosmosDbConnection');
    }
    return CosmosDbConnection.instance;
  }

  private getReadWriteConnectionString = async (): Promise<string> => {
    let cosmosDbConnectionString = new CosmosDbConnectionString(
      this._azureTenantId,
      this._azureSubscriptionId,
      this._azureResourceGroupName,
      this._azureCosmosDbAccountName
    );
    let readWriteConnectionString = await cosmosDbConnectionString.getReadWriteConnectionString();
    return readWriteConnectionString;
  }

  public disconnect = async () => {
    await mongoose.connection.close();
  };

  public connect = async () => {
    mongoose.connection.on('open', () => {
      console.log('open');
    });
  
    mongoose.connection.on('close', () => {
      console.log('close');
    });
  
    mongoose.connection.on('disconnected', () => {
      console.log('disconnected');
    });
  
    mongoose.connection.on('connected', () => {
      console.log('connected');
    });
  
    mongoose.connection.on('connecting', () => {
      console.log('connecting');
    });
  
    mongoose.connection.on('reconnected', () => {
      console.log('reconnected');
    });
  
    mongoose.connection.on('error', (err) => {
      console.error('error', err);
    });
  
    mongoose.connection.on('fullsetup', () => {
      console.log('fullsetup');
    });
  
    mongoose.connection.on('all', () => {
      console.log('all');
    });
  
    mongoose.connection.on('reconnectFailed', (err) => {
      console.error('reconnectFailed', err);
    });
  
    let connectionString: string = await this.getReadWriteConnectionString();
    try {
      mongoose.set('strictQuery', false);
      await mongoose
        .connect(connectionString, {
          //  useNewUrlParser: true,
          //  useUnifiedTopology: true,
          //  useFindAndModify: false,
          useUnifiedTopology: true,
          tlsInsecure: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test', //only true for local development - required for Azure Cosmos DB emulator
          dbName: this._cosmosDbName,
          keepAlive: true,
          keepAliveInitialDelay: 300000,
          autoIndex: this._autoIndex, //Enables automatic index creation for all schemas.
          autoCreate: this._autoCreate, //Enables automatic collection creation for all models.
          minPoolSize: this._minPoolSize, //believe the default is 0 - having something higher than 0 helps with performance
          maxPoolSize: this._maxPoolSize, // default is 100
        } as mongoose.ConnectOptions)
        .then(() => console.log(`🗄️ Successfully connected Mongoose to ${mongoose.connection.name} 🗄️`));
  
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        mongoose.set('debug', { shell: true });
      }
    } catch (error) {
      console.log(`🔥 An error ocurred when trying to connect Mongoose with ${mongoose.connection.name} 🔥`);
      throw error;
    }
  };

}



