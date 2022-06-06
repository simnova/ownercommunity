import { MapsDataSource } from './maps-data-source';
import { Context } from '../../context';

export class Properties extends MapsDataSource<Context> {

	public async getSasToken(): Promise<string> {
        return this.getSasToken();
    }

}