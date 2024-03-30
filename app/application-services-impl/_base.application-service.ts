import { ApplicationServices } from "../application-services";
import { DomainExecutionContext } from "../domain/contexts/domain-execution-context";
import { Passport } from "../domain/contexts/iam/passport";
import { InfrastructureServices } from "../infrastructure-services";
import { VerifiedUser } from "../startup/context";

export interface BaseApplicationServiceExecutionContext extends DomainExecutionContext {
  passport: Passport;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
  verifiedUser: VerifiedUser;
  community: string;
}

export interface ApplicationServiceConfig<Context extends BaseApplicationServiceExecutionContext> {
  context: Context;
}
export abstract class BaseApplicationService<Context extends BaseApplicationServiceExecutionContext> {
  protected _context: Context;

  public get context(): Context {
    return this._context;
  }

  constructor(config : ApplicationServiceConfig<Context>) {
    if (config.context) {
      this._context = config.context;
    }
  }
}
