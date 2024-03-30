import { MongoDataSource, MongoDataSourceConfig } from "apollo-datasource-mongodb";

export class BaseMongoDatastore<TData> extends MongoDataSource<TData> {
  constructor(options: MongoDataSourceConfig<TData>) {
    super(options);
  }
}