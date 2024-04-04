import { ApplicationServices } from "../app/application-services";
import { DomainExecutionContext } from "../app/domain/contexts/domain-execution-context";
import { Passport } from "../app/domain/contexts/iam/passport";
import { InfrastructureServices } from "../app/infrastructure-services";
import { VerifiedUser } from "../app/app-context";

export interface BaseApplicationServiceExecutionContext extends DomainExecutionContext {
  passport: Passport;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
  verifiedUser: VerifiedUser;
  communityId: string;
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
