import { AppContext } from "@framework/main/app-context-builder";
import { Passport } from "@framework/main/passport";
import { DataSource } from "library/data-source-seedwork/data-source";
import { VercelInfrastructureService } from "library/services-seedwork-vercel-api/interfaces";

export class VercelDataSource<Context extends AppContext> extends DataSource<Context> {
  
  public async withVercel(func:(passport:Passport, vercel:VercelInfrastructureService) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    let vercel = this._context.infrastructureServices.vercel;
    await func(passport, vercel);
  }
}