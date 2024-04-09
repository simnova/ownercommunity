import { DataSource } from '../data-source';
import { Passport } from '../../domain/contexts/iam/passport';
import { BlobStorageDomain } from '../../domain/infrastructure/blob-storage/interfaces';
import { AppContext } from '../../init/app-context-builder';

export class BlobDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withStorage(func: (passport: Passport, blobStorage: BlobStorageDomain) => Promise<void>): Promise<void> {
    let passport = this.context.passport;
    let blobStorage = this.context.infrastructureServices.blobStorage;
    await func(passport, blobStorage);
  }
}
