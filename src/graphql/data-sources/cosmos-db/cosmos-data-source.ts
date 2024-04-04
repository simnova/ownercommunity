import { MongoDataSource, MongoDataSourceConfig } from "apollo-datasource-mongodb";
import { GraphqlContext as GraphQLContext } from "../../graphql-context";

export class CosmosDataSource<TData, Context extends GraphQLContext> extends MongoDataSource<TData> {
  protected context: Context;

  constructor(options: { context: Context } & MongoDataSourceConfig<TData>) {
    super(options);
    this.context = options.context;
  }
}