import { MongoDataSource, MongoDataSourceConfig } from "apollo-datasource-mongodb";
import { Context as GraphQLContext } from "../../context";

export class CosmosDataSource<TData, Context extends GraphQLContext> extends MongoDataSource<TData> {
  protected context: Context;

  constructor(options: { context: Context } & MongoDataSourceConfig<TData>) {
    super(options);
    this.context = options.context;
  }
}