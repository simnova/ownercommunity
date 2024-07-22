import { DataSource } from "./data-source";
import { CognitiveSearchInfrastructureService } from "../infrastructure-services/cognitive-search";
import { AppContext } from "../init/app-context-builder";
import { Passport } from "../init/passport";

export class CognitiveSearchDataSource<Context extends AppContext> extends DataSource<Context> {

  public get context(): Context {
    return this._context;
  }

  public async withSearch(func: (passport: Passport, search: CognitiveSearchInfrastructureService) => Promise<void>): Promise<void> {
    let passport = this._context.passport; 
    let cognitiveSearch = this._context.infrastructureServices.cognitiveSearch;
    await func(passport, cognitiveSearch);
  }
}
