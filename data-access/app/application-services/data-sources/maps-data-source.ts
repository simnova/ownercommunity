import { AppContext } from "@app/main/app-context-builder";
import { Passport } from "@app/main/passport";
import { DataSource } from "@library/data-source-seedwork/data-source";
import { MapsInfrastructureService } from "@library/services-seedwork-maps-interfaces";

export class MapsDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withMaps(func:(passport:Passport, maps:MapsInfrastructureService) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    let maps = this._context.infrastructureServices.maps;
    await func(passport, maps);
  }
}