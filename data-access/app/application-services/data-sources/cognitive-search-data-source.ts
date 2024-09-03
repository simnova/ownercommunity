import { AppContext } from "@framework/main/app-context-builder";
import { Passport } from "@framework/main/passport";
import { DataSource } from "library/data-source-seedwork/data-source";
import { CognitiveSearchInfrastructureService } from "library/services-seedwork-cognitive-search-interfaces";

export class CognitiveSearchDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withSearch(func: (passport: Passport, search: CognitiveSearchInfrastructureService) => Promise<void>): Promise<void> {
    let passport = this._context.passport; 
    let cognitiveSearch = this._context.infrastructureServices.cognitiveSearch;
    await func(passport, cognitiveSearch);
  }
}
