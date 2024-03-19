import { DomainInfrastructureBDD } from './test/domain-infrastructure';
// import { ContentModerator, IContentModerator } from '../../../infrastructure/services/content-moderator';
// import { Vercel, IVercel } from '../../../infrastructure/services/vercel';
// import { CognitiveSearch, ICognitiveSearch } from '../../../infrastructure/services/cognitive-search';
// import { BlobStorage, IBlobStorage } from '../../../infrastructure/services/blob-storage';

import { CommunityUnitOfWork } from '../../../../domain/contexts/community/community.uow';
import { MemberUnitOfWork } from '../../../../domain/contexts/community/member.uow';
import { RoleUnitOfWork } from '../../../../domain/contexts/community/role.uow';
import { IMemoryDatabase } from '../../../../infrastructure-impl/datastore/memorydb/memory-database';
import { DataStoreInfrastructure } from '../../../../infrastructure-impl/datastore/interfaces';
import { CognitiveSearchInfrastructure } from '../../../../infrastructure-impl/cognitive-search/interfaces';
import { MemoryCognitiveSearchImpl } from '../../../../infrastructure-impl/cognitive-search/in-memory/infrastructure';

class DomainInfrastructureImplBDD implements DomainInfrastructureBDD{
  // private _vercel: IVercel;
  // private _contentModerator: IContentModerator;
  private _cognitiveSearch: CognitiveSearchInfrastructure;
  // private _blobStorage: IBlobStorage;
  private _dataStore: DataStoreInfrastructure
  private _database: IMemoryDatabase;
  private constructor(
    database: IMemoryDatabase
  ) {
    // this._vercel = this.InitVercel();
    // this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = this.InitCognitiveSearch();
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

  
  private InitBlobStorage(): IBlobStorage {
    const storageAccount = this.tryGetEnvVar('BLOB_ACCOUNT_NAME');
    const storageKey = this.tryGetEnvVar('BLOB_ACCOUNT_KEY');
    return new BlobStorage(storageAccount, storageKey);
  }
  */
  private InitCognitiveSearch(): CognitiveSearchInfrastructure {
    return MemoryCognitiveSearchImpl.getInstance();
  }
  public get cognitiveSearch(): CognitiveSearchInfrastructure {
    return this._cognitiveSearch;
  }

  public get communityUnitOfWork(): CommunityUnitOfWork {
    return this._database.CommunityUnitOfWork;
  }
  public get memberUnitOfWork(): MemberUnitOfWork {
    return this._database.MemberUnitOfWork;
  }
  public get roleUnitOfWork(): RoleUnitOfWork {
    return this._database.RoleUnitOfWork;
  }
  private InitDataStore(): DataStoreInfrastructure {
    return {
      communityUnitOfWork: this.communityUnitOfWork,
      memberUnitOfWork: this.memberUnitOfWork,
      roleUnitOfWork: this.roleUnitOfWork
    }
  }
  public get dataStore(): DataStoreInfrastructure {
    return this._dataStore;
  }

  private static instance: DomainInfrastructureImplBDD;
  public static getInstance(database: IMemoryDatabase): DomainInfrastructureImplBDD {
    if (!this.instance) {
      this.instance = new this(database);
    }
    return this.instance;
  }
}

export const getDomainInfrastructureImplInstanceBDD = (database: IMemoryDatabase) => DomainInfrastructureImplBDD.getInstance(database);