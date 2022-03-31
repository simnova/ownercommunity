import { DataSource,DataSourceConfig } from 'apollo-datasource';
import { getPassport } from '../domain-data-utils';
import { Context as GraphQLContext } from '../../context';
import { Passport } from '../../../domain/contexts/iam/passport';
import { BlobStorage } from '../../../infrastructure/services/blob-storage';

export class BlobDataSource<Context extends GraphQLContext> extends DataSource<Context> {
  private _context: Context;
  private _blobStorage: BlobStorage;
  
  public get context(): Context { return this._context;}

  public async withStorage(func:(passport:Passport, blobStorage:BlobStorage) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; //await getPassport(this.context);
    await func(passport, this._blobStorage);
  }

  public initialize(config: DataSourceConfig<Context>): void {
    this._context = config.context;  
    this._blobStorage = new BlobStorage();  
  }  
}