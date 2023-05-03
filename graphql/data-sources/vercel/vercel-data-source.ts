import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { IVercel } from '../../../infrastructure/services/vercel';
import { DataSource, DataSourceConfig } from '../data-source';

export class VercelDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  private _vercel: IVercel;

  constructor(vercel: IVercel) {
    super();
    this._vercel = vercel;
  }
  
  public get context(): Context { return this._context;}

  public async withVercel(func:(passport:Passport, vercel:IVercel) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    await func(passport, this._vercel);
  }

  public initialize(config: DataSourceConfig<Context>): void {
    this._context = config?.context;
  }
}