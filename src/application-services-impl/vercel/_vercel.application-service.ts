import { BaseApplicationService, BaseApplicationServiceExecutionContext } from "../_base.application-service";
import { Passport } from "../../app/domain/contexts/iam/passport";
import { VercelInfrastructureService } from "../../app/infrastructure-services/vercel";

export class VercelApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> extends BaseApplicationService<Context> {

  public async withVercel(func: (passport: Passport, vercel: VercelInfrastructureService) => Promise<void>): Promise<void> {
    await func(
      this.context.passport, 
      this.context.infrastructureServices.vercel
    );
  }
}