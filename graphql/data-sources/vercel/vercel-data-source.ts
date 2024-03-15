import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { IVercel } from '../../../domain/services/IVercel';
import { DataSource } from '../data-source';

export class VercelDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  
  public get context(): Context { return this._context;}

  public async withVercel(func:(passport:Passport, vercel:IVercel) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    let vercel = this.context.services.vercel;
    await func(passport, vercel);
  }
}