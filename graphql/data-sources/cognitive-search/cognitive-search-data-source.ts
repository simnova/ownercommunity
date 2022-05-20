/** @format */

import { DataSource, DataSourceConfig } from "apollo-datasource";
import { getPassport } from "../domain-data-utils";
import { Context as GraphQLContext } from "../../context";
import { Passport } from "../../../domain/contexts/iam/passport";
import { CognitiveSearch } from "../../../infrastructure/services/cognitive-search";

export class CognitiveSearchDataSource<
  Context extends GraphQLContext
> extends DataSource<Context> {
  private _context: Context;
  private _cognitiveSearchStorage: CognitiveSearch;

  public get context(): Context {
    return this._context;
  }

  public async withStorage(
    func: (passport: Passport, blobStorage: CognitiveSearch) => Promise<void>
  ): Promise<void> {
    let passport = this.context.passport; //await getPassport(this.context);
    await func(passport, this._cognitiveSearchStorage);
  }

  public initialize(config: DataSourceConfig<Context>): void {
    this._context = config.context;
    this._cognitiveSearchStorage = new CognitiveSearch();
  }
}
