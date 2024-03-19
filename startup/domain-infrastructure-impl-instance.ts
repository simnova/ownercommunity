import { DomainInfrastructure } from '../domain/infrastructure';
import { ContentModerator } from '../infrastructure-impl/content-moderator';
import { IContentModerator } from '../domain/infrastructure/content-moderator/interfaces';
import { Vercel } from '../infrastructure-impl/vercel';
import { IVercel } from '../domain/infrastructure/vercel/interfaces';
import { AzCognitiveSearchImpl } from '../infrastructure-impl/cognitive-search/az/infrastructure';
import { CognitiveSearchInfrastructure } from '../infrastructure-impl/cognitive-search/interfaces';
import { BlobStorage } from '../infrastructure-impl/blob-storage';
import { IBlobStorage } from '../domain/infrastructure/blob-storage/interfaces';
import { DataStoreInfrastructure } from '../infrastructure-impl/datastore/interfaces';
import { MongoCommunityUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/community.mongo-uow';
import { MongoMemberUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/member.mongo-uow';
import { MongoRoleUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/role.mongo-uow';
import { MongoPropertyUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/property.mongo-uow';

class DomainInfrastructureImpl implements DomainInfrastructure{
  private _vercel: IVercel;
  private _contentModerator: IContentModerator;
  private _cognitiveSearch: CognitiveSearchInfrastructure;
  private _blobStorage: IBlobStorage;
  private _dataStore: DataStoreInfrastructure;
  
  private constructor() {
    this._vercel = this.InitVercel();
    this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = this.InitCognitiveSearch();
    this._blobStorage = this.InitBlobStorage();
    this._dataStore = this.InitDataStore();
  }

  public get vercel(): IVercel {
    return this._vercel;
  }
  public get contentModerator(): IContentModerator {
    return this._contentModerator;
  }
  public get cognitiveSearch(): CognitiveSearchInfrastructure {
    return this._cognitiveSearch;
  }
  public get blobStorage(): IBlobStorage {
    return this._blobStorage;
  }

  public get dataStore(): DataStoreInfrastructure {
    return this._dataStore;
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

  private InitCognitiveSearch(): CognitiveSearchInfrastructure {
    const searchKey = this.tryGetEnvVar('SEARCH_API_KEY');
    const endpoint = this.tryGetEnvVar('SEARCH_API_ENDPOINT');
    return new AzCognitiveSearchImpl(searchKey, endpoint);
  }

  private InitBlobStorage(): IBlobStorage {
    const storageAccount = this.tryGetEnvVar('BLOB_ACCOUNT_NAME');
    const storageKey = this.tryGetEnvVar('BLOB_ACCOUNT_KEY');
    return new BlobStorage(storageAccount, storageKey);
  }

  private InitDataStore(): DataStoreInfrastructure {
    return {
      communityUnitOfWork: MongoCommunityUnitOfWork,
      memberUnitOfWork: MongoMemberUnitOfWork,
      roleUnitOfWork: MongoRoleUnitOfWork,
      propertyUnitOfWork: MongoPropertyUnitOfWork
    };
  }

  private static instance: DomainInfrastructureImpl;
  public static getInstance(): DomainInfrastructureImpl {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

export const DomainInfrastructureImplInstance = DomainInfrastructureImpl.getInstance();