import { ApplicationServices } from "../core/application-services";
import { DomainExecutionContext } from "../core/domain/contexts/domain-execution-context";
import { Passport } from "../core/domain/contexts/iam/passport";
import { InfrastructureServices } from "../core/infrastructure-services";
import { VerifiedUser } from "../core/app-context";

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
