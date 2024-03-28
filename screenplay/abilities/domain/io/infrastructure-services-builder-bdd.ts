// interface to implement
import { InfrastructureServices } from '../../../../infrastructure-services';
// vercel
import { VercelInfrastructureService } from '../../../../infrastructure-services/vercel';
import { VercelApiImpl } from '../../../../infrastructure-impl/vercel/api/impl';
// cognitive-search
import { CognitiveSearchInfrastructureService } from '../../../../infrastructure-services/cognitive-search';
import { AzCognitiveSearchImpl } from '../../../../infrastructure-impl/cognitive-search/az/impl';
// blob-storage
import { BlobStorageInfrastructureService } from '../../../../infrastructure-services/blob-storage';
import { AzBlobStorageImpl } from '../../../../infrastructure-impl/blob-storage/az/impl';
// content-moderator
import { ContentModeratorInfrastructureService } from '../../../../infrastructure-services/content-moderator';
import { AzContentModeratorImpl } from '../../../../infrastructure-impl/content-moderator/az/impl';
// maps
import { MapsInfrastructureService } from '../../../../infrastructure-services/maps';
import { AzMapsImpl } from '../../../../infrastructure-impl/maps/az/impl';
// datastore
import { DatastoreInfrastructureService } from '../../../../infrastructure-services/datastore';
import { MemorydbDatastoreImpl } from '../../../../infrastructure-impl/datastore/memorydb/impl';
import { IMemoryDatabase } from '../../../../infrastructure-impl/datastore/memorydb/memory-database';
// import { MongoCommunityUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/community.mongo-uow';
// import { MongoMemberUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/member.mongo-uow';
// import { MongoRoleUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/role.mongo-uow';
// import { MongoPropertyUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/property.mongo-uow';
// import { MongoServiceUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/service.uow';
// import { MongoServiceTicketUnitOfWork } from '../infrastructure-impl/datastore/mongodb/infrastructure/service-ticket.uow';

export class InfrastructureServicesBuilderBDD implements InfrastructureServices{
  private _vercel: VercelInfrastructureService;
  private _contentModerator: ContentModeratorInfrastructureService;
  private _cognitiveSearch: CognitiveSearchInfrastructureService;
  private _blobStorage: BlobStorageInfrastructureService;
  private _datastore: DatastoreInfrastructureService;
  private _maps: MapsInfrastructureService;
  
  constructor(
    datastore: IMemoryDatabase,
    cognitiveSearch: CognitiveSearchInfrastructureService
  ) {
    // this._vercel = this.InitVercel();
    // this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = this.InitCognitiveSearch(cognitiveSearch);
    // this._blobStorage = this.InitBlobStorage();
    this._datastore = this.InitDataStore(datastore);
    // this._maps = this.InitMaps();
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

  private InitCognitiveSearch(cognitiveSearch: CognitiveSearchInfrastructureService): CognitiveSearchInfrastructureService {
    // const searchKey = this.tryGetEnvVar('SEARCH_API_KEY');
    // const endpoint = this.tryGetEnvVar('SEARCH_API_ENDPOINT');
    // return new AzCognitiveSearchImpl(searchKey, endpoint);
    return cognitiveSearch;
  }

  private InitBlobStorage(): BlobStorageInfrastructureService {
    const storageAccount = this.tryGetEnvVar('BLOB_ACCOUNT_NAME');
    const storageKey = this.tryGetEnvVar('BLOB_ACCOUNT_KEY');
    return new AzBlobStorageImpl(storageAccount, storageKey);
  }

  private InitDataStore(db: IMemoryDatabase): DatastoreInfrastructureService {
    return new MemorydbDatastoreImpl(db);
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