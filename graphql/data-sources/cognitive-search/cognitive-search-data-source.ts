import { DataSource } from "../data-source";
import { Context as GraphQLContext } from "../../context";
import { Passport } from "../../../domain/contexts/iam/passport";
import { ICognitiveSearch } from "../../../infrastructure/services/cognitive-search";

export class CognitiveSearchDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  private _context: Context;
  private _cognitiveSearch: ICognitiveSearch;

  constructor(cognitiveSearch: ICognitiveSearch) {
    super();
    this._cognitiveSearch = cognitiveSearch;
  }

  public get context(): Context {
    return this._context;
  }

  public async withSearch(func: (passport: Passport, search: ICognitiveSearch) => Promise<void>): Promise<void> {
    let passport = this._context.passport; 
    await func(passport, this._cognitiveSearch);
  }

  public initialize(context: Context): void {
    this._context = context;
  }
}
