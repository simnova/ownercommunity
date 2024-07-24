import { MapsDataSource } from "../../data-sources/maps-data-source";
import { AppContext } from "../../init/app-context-builder";

export interface PropertyMapsApi {
  getSasToken(): Promise<string>;
}

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