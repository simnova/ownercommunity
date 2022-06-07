import { MapsDataSource } from './maps-data-source';
import { Context } from '../../context';

export class Properties extends MapsDataSource<Context> {

	public async getSasToken(): Promise<string> {
        let sasToken: string = "";
        await this.withMaps(async (passport, maps) => {
            sasToken = await maps.generateSharedKey();
        });
        return sasToken;
    }

}