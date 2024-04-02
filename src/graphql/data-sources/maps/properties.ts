import { MapsDataSource } from './maps-data-source';
import { GraphqlContext } from '../../graphql-context';

export class Properties extends MapsDataSource<GraphqlContext> {

  public async getSasToken(): Promise<string> {
    let sasToken: string = '';
    await this.withMaps(async (_passport, maps) => {
      sasToken = await maps.generateSharedKey();
    });
    return sasToken;
  }
  
}
