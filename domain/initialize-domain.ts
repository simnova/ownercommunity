import { DomainInfrastructure } from './infrastructure';
import { default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler } from './events/handlers/community-created-create-default-roles-member';
import { default as RegisterRoleDeletedReassignMemberNewRoleHandler } from './events/handlers/role-deleted-reassign-member-new-role';
import { default as RegisterCommunityCreatedCreateBlobContainerHandler } from './events/handlers/community-created-create-blob-container';
import { default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler } from './events/handlers/community-domain-updated-update-domain-blob';
import { default as RegisterCommunityDomainUpdatedUpdateVercel } from './events/handlers/community-domain-updated-update-vercel';
import { default as RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler } from './events/handlers/community-white-label-domain-updated-update-domain-blob';
import { default as RegisterPropertyDeletedUpdateSearchIndexHandler } from './events/handlers/property-deleted-update-search-index';
import { default as RegisterPropertyUpdatedUpdateSearchIndexHandler } from './events/handlers/property-updated-update-search-index';
import { default as RegisterServiceTicketUpdatedUpdateSearchIndexHandler } from './events/handlers/service-ticket-updated-update-search-index';
import { default as RegisterServiceTicketDeletedUpdateSearchIndexHandler } from './events/handlers/service-ticket-deleted-update-search-index';

const InitializeDomain = (infrastructure: DomainInfrastructure) => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler(
    infrastructure.dataStore.communityUnitOfWork,
    infrastructure.dataStore.roleUnitOfWork,
    infrastructure.dataStore.memberUnitOfWork
  );
  RegisterRoleDeletedReassignMemberNewRoleHandler();
  RegisterCommunityCreatedCreateBlobContainerHandler(infrastructure.blobStorage);
  RegisterCommunityDomainUpdatedUpdateDomainBlobHandler(infrastructure.blobStorage);
  RegisterCommunityDomainUpdatedUpdateVercel(infrastructure.vercel);
  RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler(infrastructure.blobStorage);
  RegisterPropertyDeletedUpdateSearchIndexHandler(infrastructure.cognitiveSearch);
  RegisterPropertyUpdatedUpdateSearchIndexHandler(infrastructure.cognitiveSearch, infrastructure.dataStore.propertyUnitOfWork);
  RegisterServiceTicketUpdatedUpdateSearchIndexHandler(infrastructure.cognitiveSearch, infrastructure.dataStore.serviceTicketUnitOfWork);
  RegisterServiceTicketDeletedUpdateSearchIndexHandler(infrastructure.cognitiveSearch);
};

export default InitializeDomain;