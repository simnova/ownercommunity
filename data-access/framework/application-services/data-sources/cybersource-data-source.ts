import { AppContext } from "@framework/main/app-context-builder";
import { Passport } from "@framework/main/passport";
import { DataSource } from "library/data-source-seedwork/data-source";
import { CybersourceInfrastructureService } from "library/services-seedwork-payment-cybersource-interfaces";

export class CybersourceDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withCybersource(func:(passport:Passport, cybersource:CybersourceInfrastructureService) => Promise<void>): Promise<void> {
    let passport =  this._context.passport; 
    let cybersource = this._context.infrastructureServices.cybersource;
    await func(passport, cybersource);
  }
}
