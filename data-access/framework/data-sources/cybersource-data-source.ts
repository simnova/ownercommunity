import { DataSource } from './data-source';
import { AppContext } from '../../src/app/init/app-context-builder';
import { Passport } from '../../src/app/init/passport';
import { CybersourceInfrastructureService } from '../infrastructure-services/cybersource.infra.interface';

export class CybersourceDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withCybersource(func:(passport:Passport, cybersource:CybersourceInfrastructureService) => Promise<void>): Promise<void> {
    let passport =  this._context.passport; 
    let cybersource = this._context.infrastructureServices.cybersource;
    await func(passport, cybersource);
  }
}
