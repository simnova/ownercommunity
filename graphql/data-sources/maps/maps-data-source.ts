import { DataSource,DataSourceConfig } from 'apollo-datasource';
import { getPassport } from '../domain-data-utils';
import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { Maps } from '../../../infrastructure/services/maps';

export class MapsDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  private _context: Context;
  private _maps: Maps;
  
  public get context(): Context { return this._context;}

  public async withMaps(func:(passport:Passport, maps:Maps) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; //await getPassport(this.context);
    await func(passport, this._maps);
  }

  public initialize(config: DataSourceConfig<Context>): void {
    this._context = config.context;  
    this._maps = new Maps();  
  }  
}