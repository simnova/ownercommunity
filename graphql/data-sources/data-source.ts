export interface DataSourceConfig<TContext> {
  context: TContext;
  cache?: any;
}
export abstract class DataSource<TContext = any> {
  protected _context: TContext;

  initialize?(config: DataSourceConfig<TContext>): void;
}