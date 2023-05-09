import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { IVercel } from '../../../infrastructure/services/vercel';
import { DataSource, DataSourceConfig } from '../data-source';
import { Services } from '../../../infrastructure/services';

export class VercelDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  
  public get context(): Context { return this._context;}

  public async withVercel(func:(passport:Passport, vercel:IVercel) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    let vercel = this.context.services.vercel;
    await func(passport, vercel);
  }
}