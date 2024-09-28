import { VercelInfrastructureService } from '../app/infrastructure-services/vercel';
import { VercelApiImpl } from './vercel/api/impl';
import { CognitiveSearchInfrastructureService } from '../app/infrastructure-services/cognitive-search';
import { AzCognitiveSearchImpl } from './cognitive-search/az/impl';
import { DatastoreInfrastructureService } from '../app/infrastructure-services/datastore';
import { MongodbDatastoreImpl } from './datastore/mongodb/impl';
import { BlobStorageInfrastructureService } from '../app/infrastructure-services/blob-storage';
import { AzBlobStorageImpl } from './blob-storage/az/impl';
import { ContentModeratorInfrastructureService } from '../app/infrastructure-services/content-moderator';
import { AzContentModeratorImpl } from './content-moderator/az/impl';
import { InfrastructureServices } from '../app/infrastructure-services';
import { AzMapsImpl } from './maps/az/impl';
import { MapsInfrastructureService } from '../app/infrastructure-services/maps';
import { tryGetEnvVar } from '../../seedwork/utils/get-env-var';
import { PaymentInfrastructureService } from '../app/infrastructure-services/payment';
import { CybersourceImpl } from './payment/cybersource/impl';

export class InfrastructureServicesBuilder implements InfrastructureServices{
  private _vercel: VercelInfrastructureService;
  private _contentModerator: ContentModeratorInfrastructureService;
  private _cognitiveSearch: CognitiveSearchInfrastructureService;
  private _blobStorage: BlobStorageInfrastructureService;
  private _payment: PaymentInfrastructureService;
  private _datastore: DatastoreInfrastructureService;
  private _maps: MapsInfrastructureService;
  
  private constructor() {
    this._vercel = this.InitVercel();
    this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = this.InitCognitiveSearch();
    this._blobStorage = this.InitBlobStorage();
    this._payment = this.InitPayment();
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

  public get payment(): PaymentInfrastructureService {
    return this._payment;
  } 

  public get datastore(): DatastoreInfrastructureService {
    return this._datastore;
  }

  public get maps(): MapsInfrastructureService {
    return this._maps;
  }


  private InitContentModerator(): ContentModeratorInfrastructureService {
    const subscriptionKey = tryGetEnvVar('CONTENT_MODERATOR_SUBSCRIPTION_KEY');
    const endpoint = tryGetEnvVar('CONTENT_MODERATOR_ENDPOINT');
    return new AzContentModeratorImpl(endpoint, subscriptionKey);
  }

  private InitVercel(): VercelInfrastructureService {
    const vercelToken = tryGetEnvVar('VERCEL_TOKEN');
    const vercelProject = tryGetEnvVar('VERCEL_PROJECT');
    return new VercelApiImpl(vercelToken, vercelProject);
  }

  private InitCognitiveSearch(): CognitiveSearchInfrastructureService {
    const searchKey = tryGetEnvVar('SEARCH_API_KEY');
    const endpoint = tryGetEnvVar('SEARCH_API_ENDPOINT');
    return new AzCognitiveSearchImpl(searchKey, endpoint);
  }

  private InitBlobStorage(): BlobStorageInfrastructureService {
    const storageAccount = tryGetEnvVar('BLOB_ACCOUNT_NAME');
    const storageKey = tryGetEnvVar('BLOB_ACCOUNT_KEY');
    return new AzBlobStorageImpl(storageAccount, storageKey);
  }

  private InitPayment(): PaymentInfrastructureService {
    return new CybersourceImpl();
  }

  private InitDataStore(): DatastoreInfrastructureService {
    return new MongodbDatastoreImpl();
  }

  private InitMaps(): MapsInfrastructureService {
    return new AzMapsImpl();
  }

  private static _instance: InfrastructureServicesBuilder;
  public static initialize(): void {
    if (InfrastructureServicesBuilder._instance) {
      throw new Error('InfrastructureServicesBuilder is already initialized');
    }
    InfrastructureServicesBuilder._instance = new InfrastructureServicesBuilder();
  }
  public static getInstance(): InfrastructureServicesBuilder {
    if (!InfrastructureServicesBuilder._instance) {
      throw new Error('InfrastructureServicesBuilder is not initialized');
    }
    return InfrastructureServicesBuilder._instance;
  }
}