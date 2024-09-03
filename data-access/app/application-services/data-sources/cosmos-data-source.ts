import { AppContext } from "@app/main/app-context-builder";
import { MongoDataSource, MongoDataSourceConfig } from "apollo-datasource-mongodb";

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