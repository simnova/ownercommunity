import { DataSource, DataSourceConfig } from '../../seedwork/data-source-seedwork/data-source';
import { AppContext } from '../../src/app/init/app-context-builder';
import { Passport } from '../../src/app/init/passport';
import { MapsInfrastructureService } from '../infrastructure-services/maps.infra.interface';

export class MapsDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withMaps(func:(passport:Passport, maps:MapsInfrastructureService) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    let maps = this._context.infrastructureServices.maps;
    await func(passport, maps);
  }
}