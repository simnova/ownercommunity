import { VercelInfrastructureService } from '../app/infrastructure-services/vercel';
import { VercelApiImpl } from '../infrastructure-services-impl/vercel/api/impl';
import { CognitiveSearchInfrastructureService } from '../app/infrastructure-services/cognitive-search';
import { AzCognitiveSearchImpl } from '../infrastructure-services-impl/cognitive-search/az/impl';
import { DatastoreInfrastructureService } from '../app/infrastructure-services/datastore';
import { MongodbDatastoreImpl } from '../infrastructure-services-impl/datastore/mongodb/impl';
import { BlobStorageInfrastructureService } from '../app/infrastructure-services/blob-storage';
import { AzBlobStorageImpl } from '../infrastructure-services-impl/blob-storage/az/impl';
import { ContentModeratorInfrastructureService } from '../app/infrastructure-services/content-moderator';
import { AzContentModeratorImpl } from '../infrastructure-services-impl/content-moderator/az/impl';
import { InfrastructureServices } from '../app/infrastructure-services';
import { AzMapsImpl } from '../infrastructure-services-impl/maps/az/impl';
import { MapsInfrastructureService } from '../app/infrastructure-services/maps';
// import { MongoCommunityUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/community.mongo-uow';
// import { MongoMemberUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/member.mongo-uow';
// import { MongoRoleUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/role.mongo-uow';
// import { MongoPropertyUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/property.mongo-uow';
// import { MongoServiceUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/service.uow';
// import { MongoServiceTicketUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/service-ticket.uow';

export class InfrastructureServicesBuilder implements InfrastructureServices{
  private _vercel: VercelInfrastructureService;
  private _contentModerator: ContentModeratorInfrastructureService;
  private _cognitiveSearch: CognitiveSearchInfrastructureService;
  private _blobStorage: BlobStorageInfrastructureService;
  private _datastore: DatastoreInfrastructureService;
  private _maps: MapsInfrastructureService;
  
  constructor() {
    this._vercel = this.InitVercel();
    this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = this.InitCognitiveSearch();
    this._blobStorage = this.InitBlobStorage();
    this._datastore = this.InitDataStore();
    this._maps = this.InitMaps();
  }

  public get vercel(): VercelInfrastructureService {
    return this._vercel;
  }
  public get contentModerator(): ContentModeratorInfrastructureService {
    return this._contentModerator;
  }
  public get cognitiveSearch(): CognitiveSearchInfrastructureService {
    return this._cognitiveSearch;
  }
  public get blobStorage(): BlobStorageInfrastructureService {
    return this._blobStorage;
  }

  public get datastore(): DatastoreInfrastructureService {
    return this._datastore;
  }

  public get maps(): MapsInfrastructureService {
    return this._maps;
  }

  private tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  private InitContentModerator(): ContentModeratorInfrastructureService {
    const subscriptionKey = this.tryGetEnvVar('CONTENT_MODERATOR_SUBSCRIPTION_KEY');
    const endpoint = this.tryGetEnvVar('CONTENT_MODERATOR_ENDPOINT');
    return new AzContentModeratorImpl(endpoint, subscriptionKey);
  }

  private InitVercel(): VercelInfrastructureService {
    const vercelToken = this.tryGetEnvVar('VERCEL_TOKEN');
    const vercelProject = this.tryGetEnvVar('VERCEL_PROJECT');
    return new VercelApiImpl(vercelToken, vercelProject);
  }

  private InitCognitiveSearch(): CognitiveSearchInfrastructureService {
    const searchKey = this.tryGetEnvVar('SEARCH_API_KEY');
    const endpoint = this.tryGetEnvVar('SEARCH_API_ENDPOINT');
    return new AzCognitiveSearchImpl(searchKey, endpoint);
  }

  private InitBlobStorage(): BlobStorageInfrastructureService {
    const storageAccount = this.tryGetEnvVar('BLOB_ACCOUNT_NAME');
    const storageKey = this.tryGetEnvVar('BLOB_ACCOUNT_KEY');
    return new AzBlobStorageImpl(storageAccount, storageKey);
  }

  private InitDataStore(): DatastoreInfrastructureService {
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

  private InitMaps(): MapsInfrastructureService {
    return new AzMapsImpl();
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