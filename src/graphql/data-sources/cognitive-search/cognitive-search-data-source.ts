import { DataSource } from "../data-source";
import { GraphqlContext as GraphQLContext } from "../../graphql-context";
import { Passport } from "../../../app/domain/contexts/iam/passport";
import { CognitiveSearchInfrastructureService } from "../../../app/infrastructure-services/cognitive-search";

export class CognitiveSearchDataSource<Context extends GraphQLContext> extends DataSource<Context> {

  public get context(): Context {
    return this._context;
  }

  public async withSearch(func: (passport: Passport, search: CognitiveSearchInfrastructureService) => Promise<void>): Promise<void> {
    let passport = this._context.passport; 
    let cognitiveSearch = this._context.services.cognitiveSearch;
    await func(passport, cognitiveSearch);
  }
}
