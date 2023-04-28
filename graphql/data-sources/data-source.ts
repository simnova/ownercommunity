export abstract class DataSource<TContext = any> {
  initialize?(context: TContext): void;
}