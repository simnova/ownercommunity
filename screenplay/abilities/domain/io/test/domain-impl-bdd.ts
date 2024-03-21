import { default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler } from '../../../../../domain/events/handlers/community-created-create-default-roles-member';
import { default as RegisterRoleDeletedReassignMemberNewRoleHandler } from '../../../../../domain/events/handlers/role-deleted-reassign-member-new-role';
import { default as RegisterCommunityCreatedCreateBlobContainerHandler } from '../../../../../domain/events/handlers/community-created-create-blob-container';
import { default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler } from '../../../../../domain/events/handlers/community-domain-updated-update-domain-blob';
import { default as RegisterCommunityDomainUpdatedUpdateVercel } from '../../../../../domain/events/handlers/community-domain-updated-update-vercel';
import { default as RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler } from '../../../../../domain/events/handlers/community-white-label-domain-updated-update-domain-blob';
import { default as RegisterPropertyDeletedUpdateSearchIndexHandler } from '../../../../../domain/events/handlers/property-deleted-update-search-index';
import { default as RegisterPropertyUpdatedUpdateSearchIndexHandler } from '../../../../../domain/events/handlers/property-updated-update-search-index';
import { default as RegisterServiceTicketUpdatedUpdateSearchIndexHandler } from '../../../../../domain/events/handlers/service-ticket-updated-update-search-index';
import { default as RegisterServiceTicketDeletedUpdateSearchIndexHandler } from '../../../../../domain/events/handlers/service-ticket-deleted-update-search-index';
import { DatastoreDomain, DatastoreDomainInitializeable } from '../../../../../domain/infrastructure/datastore/interfaces';
import { CognitiveSearchDomain, CognitiveSearchDomainInitializeable } from '../../../../../domain/infrastructure/cognitive-search/interfaces';
import { NodeEventBusInstance } from '../../../../../event-bus-seedwork-node';
import { BlobStorageDomain } from '../../../../../domain/infrastructure/blob-storage/interfaces';
import { VercelDomain } from '../../../../../domain/infrastructure/vercel/interfaces';

const RegisterEventHandlers = (
  datastore: DatastoreDomain,
  cognitiveSearch: CognitiveSearchDomain,
  // blobStorage: BlobStorageDomain,
  // vercel: VercelDomain
) => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler(
    datastore.communityUnitOfWork,
    datastore.roleUnitOfWork,
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
DatastoreImpl extends DatastoreDomain & DatastoreDomainInitializeable,
CognitiveSearchImpl extends CognitiveSearchDomain & CognitiveSearchDomainInitializeable
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

  public get datastore():  Omit<DatastoreImpl, keyof DatastoreDomainInitializeable> {
    return this._datastoreImpl;
  }

  public get search(): Omit<CognitiveSearchImpl, keyof CognitiveSearchDomainInitializeable> {
    return this._cognitiveSearchImpl;
  }
}