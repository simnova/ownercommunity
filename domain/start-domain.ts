import { IServices } from './services';
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

const StartDomain = (services: IServices) => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler(
    services.dataStore.communityUnitOfWork,
    services.dataStore.roleUnitOfWork,
    services.dataStore.memberUnitOfWork
  );
  RegisterRoleDeletedReassignMemberNewRoleHandler();
  RegisterCommunityCreatedCreateBlobContainerHandler(services.blobStorage);
  RegisterCommunityDomainUpdatedUpdateDomainBlobHandler(services.blobStorage);
  RegisterCommunityDomainUpdatedUpdateVercel(services.vercel);
  RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler(services.blobStorage);
  RegisterPropertyDeletedUpdateSearchIndexHandler(services.cognitiveSearch);
  RegisterPropertyUpdatedUpdateSearchIndexHandler(services.cognitiveSearch, services.dataStore.propertyUnitOfWork);
  RegisterServiceTicketUpdatedUpdateSearchIndexHandler(services.cognitiveSearch, services.dataStore.serviceTicketUnitOfWork);
  RegisterServiceTicketDeletedUpdateSearchIndexHandler(services.cognitiveSearch);
};

export default StartDomain;