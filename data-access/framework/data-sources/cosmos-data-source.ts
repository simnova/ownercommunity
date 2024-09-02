import { MongoDataSource, MongoDataSourceConfig } from "apollo-datasource-mongodb";
import { AppContext } from "../../src/app/init/app-context-builder";

export class CosmosDataSource<TData, Context extends AppContext> extends MongoDataSource<TData> {
  private _context: Context;

  public get context(): Context {
    return this._context;
  }

  constructor(options: { context: Context } & MongoDataSourceConfig<TData>) {
    super(options);
    this._context = options.context;
  }
}