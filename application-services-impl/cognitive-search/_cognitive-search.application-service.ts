import { BaseApplicationService, BaseApplicationServiceExecutionContext } from "../_base.application-service";
import { Passport } from "../../domain/contexts/iam/passport";
import { CognitiveSearchInfrastructureService } from "../../infrastructure-services/cognitive-search";

export class CognitiveSearchApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> extends BaseApplicationService<Context> {

  public async withSearch(func: (passport: Passport, search: CognitiveSearchInfrastructureService) => Promise<void>): Promise<void> {
    await func(
      this._context.passport, 
      this._context.infrastructureServices.cognitiveSearch
    );
  }
}
