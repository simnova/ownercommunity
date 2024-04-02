import { DataSource, DataSourceConfig } from '../data-source';
import { GraphqlContext as GraphQLContext } from '../../graphql-context';
import { Passport } from '../../../app/domain/contexts/iam/passport';
import { AzMaps } from '../../../../seedwork/services-seedwork-maps-az';

export class MapsDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  private _maps: AzMaps;

  constructor(options: DataSourceConfig<Context>) {
    super(options);
    this._maps = new AzMaps();
  }
  
  public get context(): Context { return this._context;}

  public async withMaps(func:(passport:Passport, maps:AzMaps) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    await func(passport, this._maps);
  }
}