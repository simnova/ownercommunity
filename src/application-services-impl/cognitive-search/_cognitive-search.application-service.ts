import { BaseApplicationService, BaseApplicationServiceExecutionContext } from "../_base.application-service";
import { Passport } from "../../app/domain/contexts/iam/passport";
import { CognitiveSearchInfrastructureService } from "../../app/infrastructure-services/cognitive-search";

export class CognitiveSearchApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> extends BaseApplicationService<Context> {

  public async withSearch(func: (passport: Passport, search: CognitiveSearchInfrastructureService) => Promise<void>): Promise<void> {
    await func(
      this.context.passport, 
      this.context.infrastructureServices.cognitiveSearch
    );
  }
}
