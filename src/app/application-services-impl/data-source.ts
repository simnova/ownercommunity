import { KeyValueCache } from "@apollo/utils.keyvaluecache";

export interface DataSourceConfig<TContext> {
  context: TContext;
  cache?: KeyValueCache;
}
export abstract class DataSource<TContext = any> {
  protected _context: TContext;

  public get context(): TContext {
    return this._context;
  }

  constructor({ context, cache }: DataSourceConfig<TContext>) {
    if (context) {
      this._context = context;
    }
  }
}