import { DomainInfrastructure } from '../domain/infrastructure';
import { VercelInfrastructure } from '../infrastructure-impl/vercel/interfaces';
import { VercelApiImpl } from '../infrastructure-impl/vercel/api/impl';
import { CognitiveSearchInfrastructure } from '../infrastructure-impl/cognitive-search/interfaces';
import { AzCognitiveSearchImpl } from '../infrastructure-impl/cognitive-search/az/impl';
import { DatastoreInfrastructure } from '../infrastructure-impl/datastore/interfaces';
import { MongodbDatastoreImpl } from '../infrastructure-impl/datastore/mongodb/impl';
import { BlobStorageInfrastructure } from '../infrastructure-impl/blob-storage/interfaces';
import { AzBlobStorageImpl } from '../infrastructure-impl/blob-storage/az/impl';
import { ContentModeratorInfrastructure } from '../infrastructure-impl/content-moderator/interfaces';
import { AzContentModeratorImpl } from '../infrastructure-impl/content-moderator/az/impl';
// import { MongoCommunityUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/community.mongo-uow';
// import { MongoMemberUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/member.mongo-uow';
// import { MongoRoleUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/role.mongo-uow';
// import { MongoPropertyUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/property.mongo-uow';
// import { MongoServiceUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/service.uow';
// import { MongoServiceTicketUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/service-ticket.uow';

export class DomainInfrastructureImpl implements DomainInfrastructure{
  private _vercel: VercelInfrastructure;
  private _contentModerator: ContentModeratorInfrastructure;
  private _cognitiveSearch: CognitiveSearchInfrastructure;
  private _blobStorage: BlobStorageInfrastructure;
  private _datastore: DatastoreInfrastructure;
  
  constructor() {
    this._vercel = this.InitVercel();
    this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = this.InitCognitiveSearch();
    this._blobStorage = this.InitBlobStorage();
    this._datastore = this.InitDataStore();
  }

  public get vercel(): VercelInfrastructure {
    return this._vercel;
  }
  public get contentModerator(): ContentModeratorInfrastructure {
    return this._contentModerator;
  }
  public get cognitiveSearch(): CognitiveSearchInfrastructure {
    return this._cognitiveSearch;
  }
  public get blobStorage(): BlobStorageInfrastructure {
    return this._blobStorage;
  }

  public get datastore(): DatastoreInfrastructure {
    return this._datastore;
  }

  private tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  private InitContentModerator(): ContentModeratorInfrastructure {
    const subscriptionKey = this.tryGetEnvVar('CONTENT_MODERATOR_SUBSCRIPTION_KEY');
    const endpoint = this.tryGetEnvVar('CONTENT_MODERATOR_ENDPOINT');
    return new AzContentModeratorImpl(endpoint, subscriptionKey);
  }

  private InitVercel(): VercelInfrastructure {
    const vercelToken = this.tryGetEnvVar('VERCEL_TOKEN');
    const vercelProject = this.tryGetEnvVar('VERCEL_PROJECT');
    return new VercelApiImpl(vercelToken, vercelProject);
  }

  private InitCognitiveSearch(): CognitiveSearchInfrastructure {
    const searchKey = this.tryGetEnvVar('SEARCH_API_KEY');
    const endpoint = this.tryGetEnvVar('SEARCH_API_ENDPOINT');
    return new AzCognitiveSearchImpl(searchKey, endpoint);
  }

  private InitBlobStorage(): BlobStorageInfrastructure {
    const storageAccount = this.tryGetEnvVar('BLOB_ACCOUNT_NAME');
    const storageKey = this.tryGetEnvVar('BLOB_ACCOUNT_KEY');
    return new AzBlobStorageImpl(storageAccount, storageKey);
  }

  private InitDataStore(): DatastoreInfrastructure {
    return new MongodbDatastoreImpl();
    // return {
    //   communityUnitOfWork: MongoCommunityUnitOfWork,
    //   memberUnitOfWork: MongoMemberUnitOfWork,
    //   roleUnitOfWork: MongoRoleUnitOfWork,
    //   propertyUnitOfWork: MongoPropertyUnitOfWork,
    //   serviceUnitOfWork: MongoServiceUnitOfWork,
    //   serviceTicketUnitOfWork: MongoServiceTicketUnitOfWork,
    //   startup: 
    // };
  }

  // private static instance: DomainInfrastructureImpl;
  // public static getInstance(): DomainInfrastructureImpl {
  //   if (!this.instance) {
  //     this.instance = new this();
  //   }
  //   return this.instance;
  // }
}

// export const DomainInfrastructureImplInstance = DomainInfrastructureImpl.getInstance();