import { DataSource } from '../data-source';
import { GraphqlContext as GraphQLContext } from '../../graphql-context';
import { Passport } from '../../../app/domain/contexts/iam/passport';
import { BlobStorageDomain } from '../../../app/domain/infrastructure/blob-storage/interfaces';

export class BlobDataSource<Context extends GraphQLContext> extends DataSource<Context> {

  public get context(): Context {
    return this._context;
  }

  public async withStorage(func: (passport: Passport, blobStorage: BlobStorageDomain) => Promise<void>): Promise<void> {
    let passport = this.context.passport;
    let blobStorage = this.context.services.blobStorage;
    await func(passport, blobStorage);
  }
}
