import { Context } from '../../startup/context';
import { MapsApplicationServiceImpl } from './_maps.application-service';

export class PropertyMapsApplicationServiceImpl extends MapsApplicationServiceImpl<Context> {

  public async getSasToken(): Promise<string> {
    let sasToken: string = '';
    await this.withMaps(async (_passport, maps) => {
      sasToken = await maps.generateSharedKey();
    });
    return sasToken;
  }
  
}
