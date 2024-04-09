import { MapsDataSource } from './maps-data-source';
import { PropertyMapsApi } from '../../application-services/maps';
import { AppContext } from '../../app-context-builder';

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
