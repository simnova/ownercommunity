import { IServices } from './test/IServices';
// import { ContentModerator, IContentModerator } from '../../../infrastructure/services/content-moderator';
// import { Vercel, IVercel } from '../../../infrastructure/services/vercel';
// import { CognitiveSearch, ICognitiveSearch } from '../../../infrastructure/services/cognitive-search';
// import { BlobStorage, IBlobStorage } from '../../../infrastructure/services/blob-storage';

import { CommunityUnitOfWork } from '../../../../domain/contexts/community/community.uow';
import { MemberUnitOfWork } from '../../../../domain/contexts/community/member.uow';
import { RoleUnitOfWork } from '../../../../domain/contexts/community/role.uow';
import { IMemoryDatabase } from '../../../../domain-impl/services/datastore/memorydb/infrastructure/memory-database';
import { IDataStore } from '../../../../domain/services/datastore/interfaces';

export class Services implements IServices{
  // private _vercel: IVercel;
  // private _contentModerator: IContentModerator;
  // private _cognitiveSearch: ICognitiveSearch;
  // private _blobStorage: IBlobStorage;
  private _dataStore: IDataStore
  private _database: IMemoryDatabase;
  constructor(
    database: IMemoryDatabase
  ) {
    // this._vercel = this.InitVercel();
    // this._contentModerator = this.InitContentModerator();
    // this._cognitiveSearch = this.InitCognitiveSearch();
    // this._blobStorage = this.InitBlobStorage();
    this._database = database;
    this._dataStore = this.InitDataStore();
  }

  /*
  public get vercel(): IVercel {
    return this._vercel;
  }
  public get contentModerator(): IContentModerator {
    return this._contentModerator;
  }
  public get cognitiveSearch(): ICognitiveSearch {
    return this._cognitiveSearch;
  }
  public get blobStorage(): IBlobStorage {
    return this._blobStorage;
  }

  private tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  private InitContentModerator(): IContentModerator {
    const subscriptionKey = this.tryGetEnvVar('CONTENT_MODERATOR_SUBSCRIPTION_KEY');
    const endpoint = this.tryGetEnvVar('CONTENT_MODERATOR_ENDPOINT');
    return new ContentModerator(endpoint, subscriptionKey);
  }

  private InitVercel(): IVercel {
    const vercelToken = this.tryGetEnvVar('VERCEL_TOKEN');
    const vercelProject = this.tryGetEnvVar('VERCEL_PROJECT');
    return new Vercel(vercelToken, vercelProject);
  }

  private InitCognitiveSearch(): ICognitiveSearch {
    const searchKey = this.tryGetEnvVar('SEARCH_API_KEY');
    const endpoint = this.tryGetEnvVar('SEARCH_API_ENDPOINT');
    return new CognitiveSearch(searchKey, endpoint);
  }

  private InitBlobStorage(): IBlobStorage {
    const storageAccount = this.tryGetEnvVar('BLOB_ACCOUNT_NAME');
    const storageKey = this.tryGetEnvVar('BLOB_ACCOUNT_KEY');
    return new BlobStorage(storageAccount, storageKey);
  }
  */

  public get communityUnitOfWork(): CommunityUnitOfWork {
    return this._database.CommunityUnitOfWork;
  }

  public get memberUnitOfWork(): MemberUnitOfWork {
    return this._database.MemberUnitOfWork;
  }

  public get roleUnitOfWork(): RoleUnitOfWork {
    return this._database.RoleUnitOfWork;
  }

  public get dataStore(): IDataStore {
    return this._dataStore;
  }

  private InitDataStore(): IDataStore {
    return {
      communityUnitOfWork: this.communityUnitOfWork,
      memberUnitOfWork: this.memberUnitOfWork,
      roleUnitOfWork: this.roleUnitOfWork
    }
  }
}
