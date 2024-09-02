import { DataSource } from "./data-source";
import { AppContext } from "../../src/app/init/app-context-builder";
import { Passport } from "../../src/app/init/passport";
import { CognitiveSearchInfrastructureService } from "../infrastructure-services/cognitive-search.infra.interface";

export class CognitiveSearchDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withSearch(func: (passport: Passport, search: CognitiveSearchInfrastructureService) => Promise<void>): Promise<void> {
    let passport = this._context.passport; 
    let cognitiveSearch = this._context.infrastructureServices.cognitiveSearch;
    await func(passport, cognitiveSearch);
  }
}
