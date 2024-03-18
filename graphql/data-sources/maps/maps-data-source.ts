import { DataSource, DataSourceConfig } from '../data-source';
import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { Maps } from '../../../services-seedwork-maps';

export class MapsDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  private _maps: Maps;

  constructor(options: DataSourceConfig<Context>) {
    super(options);
    this._maps = new Maps();
  }
  
  public get context(): Context { return this._context;}

  public async withMaps(func:(passport:Passport, maps:Maps) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    await func(passport, this._maps);
  }
}