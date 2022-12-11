import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { Vercel } from '../../../infrastructure/services/vercel';

export class VercelDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  private _context: Context;
  private _vercel: Vercel;
  
  public get context(): Context { return this._context;}

  public async withVercel(func:(passport:Passport, vercel:Vercel) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    await func(passport, this._vercel);
  }

  public initialize(config: DataSourceConfig<Context>): void {
    this._context = config.context;  
    this._vercel = new Vercel();  
  }  
}