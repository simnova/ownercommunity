import { DataSource } from '../data-source';
import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { IBlobStorage } from '../../../domain/services/blob-storage/interfaces';

export class BlobDataSource<Context extends GraphQLContext> extends DataSource<Context> {

  public get context(): Context {
    return this._context;
  }

  public async withStorage(func: (passport: Passport, blobStorage: IBlobStorage) => Promise<void>): Promise<void> {
    let passport = this.context.passport;
    let blobStorage = this.context.services.blobStorage;
    await func(passport, blobStorage);
  }
}
