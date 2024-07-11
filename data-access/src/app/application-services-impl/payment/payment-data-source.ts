import { DataSource, DataSourceConfig } from '../data-source';
import { Cybersource } from '../../../../seedwork/services-seedwork-payment-cybersource';
import { AppContext } from '../../init/app-context-builder';
import { Passport } from '../../init/passport';

export class PaymentDataSource<Context extends AppContext> extends DataSource<Context> {
  private _cybersource: Cybersource;

  constructor(options: DataSourceConfig<Context>) {
    super(options);
    this._cybersource = new Cybersource();
  }
  
  public get context(): Context { return this._context;}

  public async withCybersource(func:(passport:Passport, cybersource:Cybersource) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    await func(passport, this._cybersource);
  }
}
