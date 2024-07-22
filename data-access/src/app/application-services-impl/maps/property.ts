import { MapsDataSource } from '../../data-sources/maps-data-source';
import { PropertyMapsApi } from '../../application-services/maps';
import { AppContext } from '../../init/app-context-builder';

export class PropertyMapsApiImpl
  extends MapsDataSource<AppContext> 
  implements PropertyMapsApi
{

  public async getSasToken(): Promise<string> {
    let sasToken: string = '';
    await this.withMaps(async (_passport, maps) => {
      sasToken = await maps.generateSharedKey();
    });
    return sasToken;
  }
  
}
