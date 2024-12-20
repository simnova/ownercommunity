import mongoose from 'mongoose';

export const disconnect = async () => {
  await mongoose.connection.close();
};

export const connect = async () => {
  mongoose.connection.on('open', () => {
    console.log('custom-log | mongoose | open');
  });

  mongoose.connection.on('close', () => {
    console.log('custom-log | mongoose | close');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('custom-log | mongoose | disconnected');
  });

  mongoose.connection.on('connected', () => {
    console.log('custom-log | mongoose | connected');
  });

  mongoose.connection.on('connecting', () => {
    console.log('custom-log | mongoose | connecting');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('custom-log | mongoose | reconnected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('custom-log | mongoose | error | ', err);
  });

  mongoose.connection.on('fullsetup', () => {
    console.log('custom-log | mongoose | fullsetup');
  });

  mongoose.connection.on('all', () => {
    console.log('custom-log | mongoose | all');
  });

  mongoose.connection.on('reconnectFailed', (err) => {
    console.error('custom-log | mongoose | reconnectFailed | ', err);
  });

  if (!process.env.COSMOSDB || process.env.COSMOSDB.length === 0) throw new Error('CosmosDB connection string not found.');
  if (!process.env.COSMOSDB_DBNAME || process.env.COSMOSDB_DBNAME.length === 0) throw new Error('CosmosDB name not found.');

  let connectionString: string;
  if (process.env.NODE_ENV === 'test') {
    connectionString = `${process.env.COSMOSDB}/admin?ssl=true&retrywrites=false`;
    console.log('custom-log | mongoose | Connecting to CosmosDB in test mode');
  } else {
    connectionString = `${process.env.COSMOSDB}/?ssl=true&replicaSet=globaldb&retrywrites=false&appName=@sharethrift@`;
    console.log('custom-log | mongoose | Connecting to CosmosDB in Dev / Prod Mode');
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose
      .connect(connectionString, {
        //  useNewUrlParser: true,
        //  useUnifiedTopology: true,
        //  useFindAndModify: false,
        useUnifiedTopology: true,
        tlsInsecure: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test', //only true for local developent - required for Azure Cosmos DB emulator
        dbName: process.env.COSMOSDB_DBNAME,
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        autoIndex: true, //Enables automatic index creation for all schemas.
        autoCreate: true, //Enables automatic collection creation for all models.
        minPoolSize: 10, //believe the default is 0 - having something higher than 0 helps with performance
        maxPoolSize: 100, // default is 100
        //   poolSize: Number(process.env.COSMOSDB_POOL_SIZE)
      } as mongoose.ConnectOptions)
      .then(() => console.log(`custom-log | mongoose | 🗄️ Successfully connected Mongoose to ${mongoose.connection.name} 🗄️`));

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      mongoose.set('debug', { shell: true });
    }
  } catch (error) {
    console.log(`custom-log | mongoose | 🔥 An error ocurred when trying to connect Mongoose with ${mongoose.connection.name} 🔥`);
    throw error;
  }
};
