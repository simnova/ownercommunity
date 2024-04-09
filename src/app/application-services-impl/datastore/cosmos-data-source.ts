import { MongoDataSource, MongoDataSourceConfig } from "apollo-datasource-mongodb";
import { AppContext } from "../../init/app-context-builder";

export class CosmosDataSource<TData, Context extends AppContext> extends MongoDataSource<TData> {
  protected context: Context;

  constructor(options: { context: Context } & MongoDataSourceConfig<TData>) {
    super(options);
    this.context = options.context;
  }
}