import { default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler } from '../../../../../src/app/community/domain/events/handlers/community-created-create-default-roles-member';
import { default as RegisterRoleDeletedReassignMemberNewRoleHandler } from '../../../../../src/app/domain/events/handlers/role-deleted-reassign-member-new-role';
import { default as RegisterCommunityCreatedCreateBlobContainerHandler } from '../../../../../src/app/community/domain/events/handlers/community-created-create-blob-container';
import { default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler } from '../../../../../src/app/community/domain/events/handlers/community-domain-updated-update-domain-blob';
import { default as RegisterCommunityDomainUpdatedUpdateVercel } from '../../../../../src/app/community/domain/events/handlers/community-domain-updated-update-vercel';
import { default as RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler } from '../../../../../src/app/community/domain/events/handlers/community-white-label-domain-updated-update-domain-blob';
import { default as RegisterPropertyDeletedUpdateSearchIndexHandler } from '../../../../../src/app/domain/events/handlers/property-deleted-update-search-index';
import { default as RegisterPropertyUpdatedUpdateSearchIndexHandler } from '../../../../../src/app/domain/events/handlers/property-updated-update-search-index';
import { default as RegisterServiceTicketUpdatedUpdateSearchIndexHandler } from '../../../../../src/app/domain/events/handlers/service-ticket-v1-updated-update-search-index';
import { default as RegisterServiceTicketDeletedUpdateSearchIndexHandler } from '../../../../../src/app/domain/events/handlers/service-ticket-v1-deleted-update-search-index';
import { DatastoreDomain, DatastoreInitializeable } from '../../../../../framework/domain/infrastructure/datastore.domain-infra.interface';
import { CognitiveSearchDomain, CognitiveSearchInitializeable } from '../../../../../src/app/domain/infrastructure/cognitive-search/interfaces';
import { NodeEventBusInstance } from '../../../../../framework/seedwork/event-bus-seedwork-node';
import { BlobStorageDomain } from '../../../../../src/app/domain/infrastructure/blob-storage/interfaces';
import { VercelDomain } from '../../../../../framework/domain/infrastructure/vercel.domain-infra.interface';

const RegisterEventHandlers = (
  datastore: DatastoreDomain,
  cognitiveSearch: CognitiveSearchDomain,
  // blobStorage: BlobStorageDomain,
  // vercel: VercelDomain
) => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler(
    datastore.communityUnitOfWork,
    datastore.endUserRoleUnitOfWork,
    datastore.memberUnitOfWork
  );
  // RegisterRoleDeletedReassignMemberNewRoleHandler();
  // RegisterCommunityCreatedCreateBlobContainerHandler(blobStorage);
  // RegisterCommunityDomainUpdatedUpdateDomainBlobHandler(blobStorage);
  // RegisterCommunityDomainUpdatedUpdateVercel(vercel);
  // RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler(blobStorage);
  // RegisterPropertyDeletedUpdateSearchIndexHandler(cognitiveSearch);
  RegisterPropertyUpdatedUpdateSearchIndexHandler(cognitiveSearch, datastore.propertyUnitOfWork);
  // RegisterServiceTicketUpdatedUpdateSearchIndexHandler(cognitiveSearch, datastore.serviceTicketUnitOfWork);
  // RegisterServiceTicketDeletedUpdateSearchIndexHandler(cognitiveSearch);
};

const StopEventHandlers = () => {
  NodeEventBusInstance.removeAllListeners();
}



export class DomainImplBDD<
DatastoreImpl extends DatastoreDomain & DatastoreInitializeable,
CognitiveSearchImpl extends CognitiveSearchDomain & CognitiveSearchInitializeable
>{
  constructor(
    private _datastoreImpl: DatastoreImpl,
    private _cognitiveSearchImpl: CognitiveSearchImpl,
    // private _blobStorageImpl: BlobStorageDomain,
    // private _vercelImpl: VercelDomain,
  ) {}

  public async startup(): Promise<void> {
    this._datastoreImpl.startup();
    this._cognitiveSearchImpl.startup();
    // event handler should be started at the end
    RegisterEventHandlers(
      this._datastoreImpl,
      this._cognitiveSearchImpl,
      // this._blobStorageImpl,
      // this._vercelImpl
    );
    
  }

  public async shutdown(): Promise<void> {
    // event handler should be stopped at the beginning
    StopEventHandlers();
    // remaining services should be stopped in the reverse order of startup
    this._cognitiveSearchImpl.shutdown();
    this._datastoreImpl.shutdown();
  }

  public get datastore():  Omit<DatastoreImpl, keyof DatastoreInitializeable> {
    return this._datastoreImpl;
  }

  public get search(): Omit<CognitiveSearchImpl, keyof CognitiveSearchInitializeable> {
    return this._cognitiveSearchImpl;
  }
}