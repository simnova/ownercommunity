import { DomainInfrastructureBDD_NOTINUSE } from './test/domain-infrastructure';
// import { ContentModerator, IContentModerator } from '../../../infrastructure/services/content-moderator';
// import { Vercel, IVercel } from '../../../infrastructure/services/vercel';
// import { CognitiveSearch, ICognitiveSearch } from '../../../infrastructure/services/cognitive-search';
// import { BlobStorage, IBlobStorage } from '../../../infrastructure/services/blob-storage';

import { CommunityUnitOfWork } from '../../../../src/app/domain/contexts/community/community.uow';
import { MemberUnitOfWork } from '../../../../src/app/domain/contexts/community/member.uow';
import { RoleUnitOfWork } from '../../../../src/app/domain/contexts/community/role.uow';
import { PropertyUnitOfWork } from '../../../../src/app/domain/contexts/property/property.uow';
import { ServiceUnitOfWork } from '../../../../src/app/domain/contexts/service-ticket/service.uow';
import { ServiceTicketUnitOfWork } from '../../../../src/app/domain/contexts/service-ticket/service-ticket.uow';
import { IMemoryDatabase } from '../../../../src/infrastructure-services-impl/datastore/memorydb/memory-database';
import { DatastoreInfrastructureService } from '../../../../src/app/infrastructure-services/datastore';
import { CognitiveSearchInfrastructureService } from '../../../../src/app/infrastructure-services/cognitive-search';

export class DomainInfrastructureImplBDD_NOTINUSE implements DomainInfrastructureBDD_NOTINUSE{
  // private _vercel: IVercel;
  // private _contentModerator: IContentModerator;
  private _cognitiveSearch: CognitiveSearchInfrastructureService;
  // private _blobStorage: IBlobStorage;
  // private _database: IMemoryDatabase;
  private _datastore: DatastoreInfrastructureService;
  constructor(
    datastore: DatastoreInfrastructureService,
    cognitiveSearch: CognitiveSearchInfrastructureService
  ) {
    // this._vercel = this.InitVercel();
    // this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = cognitiveSearch; //this.InitCognitiveSearch();
    // this._blobStorage = this.InitBlobStorage();
    this._datastore = datastore; //this.InitDataStore();
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
  // private InitCognitiveSearch(): CognitiveSearchInfrastructure {
  //   return MemoryCognitiveSearchImpl.getInstance();
  // }
  public get cognitiveSearch(): CognitiveSearchInfrastructureService {
    return this._cognitiveSearch;
  }

  public get datastore(): DatastoreInfrastructureService {
    return this._datastore;
  }


  // public get communityUnitOfWork(): CommunityUnitOfWork {
  //   return this._database.CommunityUnitOfWork;
  // }
  // public get memberUnitOfWork(): MemberUnitOfWork {
  //   return this._database.MemberUnitOfWork;
  // }
  // public get roleUnitOfWork(): RoleUnitOfWork {
  //   return this._database.RoleUnitOfWork;
  // }
  // public get propertyUnitOfWork(): PropertyUnitOfWork {
  //   return this._database.PropertyUnitOfWork;
  // }
  // public get serviceUnitOfWork(): ServiceUnitOfWork {
  //   return this._database.ServiceUnitOfWork;
  // }
  // public get serviceTicketUnitOfWork(): ServiceTicketUnitOfWork {
  //   return this._database.ServiceTicketUnitOfWork;
  // }
  // private InitDataStore(): DataStoreInfrastructure {
  //   return {
  //     communityUnitOfWork: this.communityUnitOfWork,
  //     memberUnitOfWork: this.memberUnitOfWork,
  //     roleUnitOfWork: this.roleUnitOfWork,
  //     propertyUnitOfWork: this.propertyUnitOfWork,
  //     serviceUnitOfWork: this.serviceUnitOfWork,
  //     serviceTicketUnitOfWork: this.serviceTicketUnitOfWork
  //   }
  // }
  // public get datastore(): DatastoreInfrastructure {
  //   return {
  //     communityUnitOfWork: this._database.communityUnitOfWork,
  //     memberUnitOfWork: this._database.memberUnitOfWork,
  //     roleUnitOfWork: this._database.roleUnitOfWork,
  //     propertyUnitOfWork: this._database.propertyUnitOfWork,
  //     serviceUnitOfWork: this._database.serviceUnitOfWork,
  //     serviceTicketUnitOfWork: this._database.serviceTicketUnitOfWork
  //   };
  // }

  // private static instance: DomainInfrastructureImplBDD;
  // public static getInstance(
  //   database: IMemoryDatabase,
  //   cognitiveSearch: CognitiveSearchInfrastructure
  // ): DomainInfrastructureImplBDD {
  //   if (!this.instance) {
  //     this.instance = new this(database, cognitiveSearch);
  //   }
  //   return this.instance;
  // }
}

// export const getDomainInfrastructureImplInstanceBDD = (
//   database: IMemoryDatabase,
//   cognitiveSearch: CognitiveSearchInfrastructure
// ) => DomainInfrastructureImplBDD.getInstance(
//   database,
//   cognitiveSearch
// );