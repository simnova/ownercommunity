import { IServices } from '../domain/services';
import { ContentModerator } from '../services-impl/content-moderator';
import { IContentModerator } from '../domain/services/content-moderator/interfaces';
import { Vercel } from '../services-impl/vercel';
import { IVercel } from '../domain/services/vercel/interfaces';
import { CognitiveSearch } from '../services-impl/cognitive-search';
import { ICognitiveSearch } from '../domain/services/cognitive-search/interfaces';
import { BlobStorage } from '../services-impl/blob-storage';
import { IBlobStorage } from '../domain/services/blob-storage/interfaces';
import { IDataStore } from '../domain/services/datastore/interfaces';
import { MongoCommunityUnitOfWork } from '../services-impl/datastore/mongodb/infrastructure/community.mongo-uow';
import { MongoMemberUnitOfWork } from '../services-impl/datastore/mongodb/infrastructure/member.mongo-uow';
import { MongoRoleUnitOfWork } from '../services-impl/datastore/mongodb/infrastructure/role.mongo-uow';
import { MongoPropertyUnitOfWork } from '../services-impl/datastore/mongodb/infrastructure/property.mongo-uow';

class Services implements IServices{
  private _vercel: IVercel;
  private _contentModerator: IContentModerator;
  private _cognitiveSearch: ICognitiveSearch;
  private _blobStorage: IBlobStorage;
  private _dataStore: IDataStore;
  
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
  public get cognitiveSearch(): ICognitiveSearch {
    return this._cognitiveSearch;
  }
  public get blobStorage(): IBlobStorage {
    return this._blobStorage;
  }

  public get dataStore(): IDataStore {
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

  private InitDataStore(): IDataStore {
    return {
      communityUnitOfWork: MongoCommunityUnitOfWork,
      memberUnitOfWork: MongoMemberUnitOfWork,
      roleUnitOfWork: MongoRoleUnitOfWork,
      propertyUnitOfWork: MongoPropertyUnitOfWork
    };
  }

  private static instance: Services;
  public static getInstance(): Services {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

export const ServicesInstance = Services.getInstance();