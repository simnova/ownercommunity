import { DataSource } from '../../seedwork/data-source-seedwork/data-source';
import { AppContext } from '../../src/app/init/app-context-builder';
import { Passport } from '../../src/app/init/passport';
import { VercelInfrastructureService } from '../infrastructure-services/vercel.infra.interface';

export class VercelDataSource<Context extends AppContext> extends DataSource<Context> {
  
  public async withVercel(func:(passport:Passport, vercel:VercelInfrastructureService) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    let vercel = this._context.infrastructureServices.vercel;
    await func(passport, vercel);
  }
}