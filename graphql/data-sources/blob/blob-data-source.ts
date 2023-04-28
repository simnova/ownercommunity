import { DataSource } from '../data-source';
import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { IBlobStorage } from '../../../infrastructure/services/blob-storage';

export class BlobDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  private _context: Context;
  private _blobStorage: IBlobStorage;

  constructor(blobStorage: IBlobStorage) {
    super();
    this._blobStorage = blobStorage;
  }

  public get context(): Context {
    return this._context;
  }

  public async withStorage(func: (passport: Passport, blobStorage: IBlobStorage) => Promise<void>): Promise<void> {
    let passport = this.context.passport;
    await func(passport, this._blobStorage);
  }

  public initialize(context: Context): void {
    this._context = context;
  }
}
