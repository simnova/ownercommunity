import { DataSource } from './data-source';
import { AppContext } from '../../src/app/init/app-context-builder';
import { Passport } from '../../src/app/init/passport';
import { BlobStorageInfrastructureService } from '../infrastructure-services/blob-storage.infra.interface';

export class BlobDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withStorage(func: (passport: Passport, blobStorage: BlobStorageInfrastructureService) => Promise<void>): Promise<void> {
    let passport = this._context.passport;
    let blobStorage = this._context.infrastructureServices.blobStorage;
    await func(passport, blobStorage);
  }
}
