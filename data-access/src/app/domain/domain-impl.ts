import { default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler } from './events/handlers/community-created-create-default-roles-member';
import { default as RegisterRoleDeletedReassignMemberNewRoleHandler } from './events/handlers/role-deleted-reassign-member-new-role';
import { default as RegisterCommunityCreatedCreateBlobContainerHandler } from './events/handlers/community-created-create-blob-container';
import { default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler } from './events/handlers/community-domain-updated-update-domain-blob';
import { default as RegisterCommunityDomainUpdatedUpdateVercel } from './events/handlers/community-domain-updated-update-vercel';
import { default as RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler } from './events/handlers/community-white-label-domain-updated-update-domain-blob';
import { default as RegisterPropertyDeletedUpdateSearchIndexHandler } from './events/handlers/property-deleted-update-search-index';
import { default as RegisterPropertyUpdatedUpdateSearchIndexHandler } from './events/handlers/property-updated-update-search-index';
import { default as RegisterStaffUserCreatedCreateDefaultStaffRoleHandler } from './events/handlers/staff-user-created-create-default-staff-role';
import { default as RegisterServiceTicketV1UpdatedUpdateSearchIndexHandler } from './events/handlers/service-ticket-v1-updated-update-search-index';
import { default as RegisterServiceTicketV1DeletedUpdateSearchIndexHandler } from './events/handlers/service-ticket-v1-deleted-update-search-index';
import { default as RegisterViolationTicketV1UpdatedUpdateSearchIndexHandler } from './events/handlers/violation-ticket-v1-updated-update-search-index';
import { default as RegisterViolationTicketV1DeletedUpdateSearchIndexHandler } from './events/handlers/violation-ticket-v1-deleted-update-search-index';
import { DatastoreDomain, DatastoreDomainInitializeable } from './infrastructure/datastore/interfaces';
import { CognitiveSearchDomain, CognitiveSearchDomainInitializeable } from './infrastructure/cognitive-search/interfaces';
import { NodeEventBusInstance } from '../../../seedwork/event-bus-seedwork-node';
import { BlobStorageDomain } from './infrastructure/blob-storage/interfaces';
import { VercelDomain } from './infrastructure/vercel/interfaces';
import { PaymentDomain } from './infrastructure/cybersource/interfaces';

const RegisterEventHandlers = (
  datastore: DatastoreDomain,
  cognitiveSearch: CognitiveSearchDomain,
  blobStorage: BlobStorageDomain,
  payment: PaymentDomain,
  vercel: VercelDomain
) => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler(
    datastore.communityUnitOfWork,
    datastore.endUserRoleUnitOfWork,
    datastore.memberUnitOfWork
  );
  RegisterRoleDeletedReassignMemberNewRoleHandler();
  RegisterCommunityCreatedCreateBlobContainerHandler(blobStorage);
  RegisterCommunityDomainUpdatedUpdateDomainBlobHandler(blobStorage);
  RegisterCommunityDomainUpdatedUpdateVercel(vercel);
  RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler(blobStorage);
  RegisterPropertyDeletedUpdateSearchIndexHandler(cognitiveSearch);
  RegisterPropertyUpdatedUpdateSearchIndexHandler(cognitiveSearch, datastore.propertyUnitOfWork);
  RegisterStaffUserCreatedCreateDefaultStaffRoleHandler(datastore.staffRoleUnitOfWork, datastore.staffUserUnitOfWork);
  RegisterServiceTicketV1UpdatedUpdateSearchIndexHandler(cognitiveSearch, datastore.serviceTicketV1UnitOfWork);
  RegisterServiceTicketV1DeletedUpdateSearchIndexHandler(cognitiveSearch);
  RegisterViolationTicketV1UpdatedUpdateSearchIndexHandler(cognitiveSearch, datastore.violationTicketV1UnitOfWork);
  RegisterViolationTicketV1DeletedUpdateSearchIndexHandler(cognitiveSearch);
};

const StopEventHandlers = () => {
  NodeEventBusInstance.removeAllListeners();
}



export class DomainImpl<
DatastoreImpl extends DatastoreDomain & DatastoreDomainInitializeable,
CognitiveSearchImpl extends CognitiveSearchDomain & CognitiveSearchDomainInitializeable
>{
  constructor(
    private _datastoreImpl: DatastoreImpl,
    private _cognitiveSearchImpl: CognitiveSearchImpl,
    private _blobStorageImpl: BlobStorageDomain,
    private _paymentImpl: PaymentDomain,
    private _vercelImpl: VercelDomain,
  ) {}

  public async startup(): Promise<void> {
    console.log('custom-log | DomainImpl | startup');
    this._datastoreImpl.startup();
    this._cognitiveSearchImpl.startup();
    // event handler should be started at the end
    RegisterEventHandlers(
      this._datastoreImpl,
      this._cognitiveSearchImpl,
      this._blobStorageImpl,
      this._paymentImpl,
      this._vercelImpl
    );
    
  }

  public async shutdown(): Promise<void> {
    // event handler should be stopped at the beginning
    StopEventHandlers();
    // remaining services should be stopped in the reverse order of startup
    this._cognitiveSearchImpl.shutdown();
    this._datastoreImpl.shutdown();
    console.log('custom-log | DomainImpl | shutdown');
  }

  public get datastore():  Omit<DatastoreImpl, keyof DatastoreDomainInitializeable> {
    return this._datastoreImpl;
  }

  public get cognitiveSearch(): Omit<CognitiveSearchImpl, keyof CognitiveSearchDomainInitializeable> {
    return this._cognitiveSearchImpl;
  }
}