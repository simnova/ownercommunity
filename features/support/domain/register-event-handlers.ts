import { IServices } from '../services/IServices';
import { default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler } from '../../../domain/infrastructure/event-handlers/community-created-create-default-roles-member';
// import { default as RegisterRoleDeletedReassignMemberNewRoleHandler } from './role-deleted-reassign-member-new-role';
// import { default as RegisterCommunityCreatedCreateBlobContainerHandler } from './community-created-create-blob-container';
// import { default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler } from './community-domain-updated-update-domain-blob';
// import { default as RegisterCommunityDomainUpdatedUpdateVercel } from './community-domain-updated-update-vercel';
// import { default as RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler } from './community-white-label-domain-updated-update-domain-blob';
// import { default as RegisterPropertyDeletedUpdateSearchIndexHandler } from './property-deleted-update-search-index';
// import { default as RegisterPropertyUpdatedUpdateSearchIndexHandler } from './property-updated-update-search-index';
// import { default as RegisterServiceTicketUpdatedUpdateSearchIndexHandler } from './service-ticket-updated-update-search-index';
// import { default as RegisterServiceTicketDeletedUpdateSearchIndexHandler } from './service-ticket-deleted-update-search-index';

const RegisterHandlers = (services: IServices) => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler(
    services.communityUnitOfWork,
    services.roleUnitOfWork,
    services.memberUnitOfWork
  );
  // RegisterRoleDeletedReassignMemberNewRoleHandler();
  // RegisterCommunityCreatedCreateBlobContainerHandler(services.blobStorage);
  // RegisterCommunityDomainUpdatedUpdateDomainBlobHandler(services.blobStorage);
  // RegisterCommunityDomainUpdatedUpdateVercel(services.vercel);
  // RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler(services.blobStorage);
  // RegisterPropertyDeletedUpdateSearchIndexHandler(services.cognitiveSearch);
  // RegisterPropertyUpdatedUpdateSearchIndexHandler(services.cognitiveSearch);
  // RegisterServiceTicketUpdatedUpdateSearchIndexHandler(services.cognitiveSearch);
  // RegisterServiceTicketDeletedUpdateSearchIndexHandler(services.cognitiveSearch);
};

export default RegisterHandlers;