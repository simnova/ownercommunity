import { AppContext } from '../../init/app-context-builder';
import { Passport } from '../../domain/contexts/iam/passport';
import { VercelDomain } from '../../domain/infrastructure/vercel/interfaces';
import { DataSource } from '../data-source';

export class VercelDataSource<Context extends AppContext> extends DataSource<Context> {
  
  public get context(): Context { return this._context;}

  public async withVercel(func:(passport:Passport, vercel:VercelDomain) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    let vercel = this.context.infrastructureServices.vercel;
    await func(passport, vercel);
  }
}