import { default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler } from './community-created-create-default-roles-member';
import { default as RegisterRoleDeletedReassignMemberNewRoleHandler } from './role-deleted-reassign-member-new-role';
import { default as RegisterCommunityCreatedCreateBlobContainerHandler } from './community-created-create-blob-container';
import { default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler } from './community-domain-updated-update-domain-blob';
import { default as RegisterCommunityDomainUpdatedUpdateVercel } from './community-domain-updated-update-vercel';
import { default as RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler } from './community-white-label-domain-updated-update-domain-blob';
import { default as RegisterPropertyDeletedUpdateSearchIndexHandler } from './property-deleted-update-search-index';
import { default as RegisterPropertyUpdatedUpdateSearchIndexHandler } from './service-ticket-updated-update-search-index';

import { Services } from '../../../infrastructure/services';

const services = new Services();

const RegisterHandlers = () => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler();
  RegisterRoleDeletedReassignMemberNewRoleHandler();
  RegisterCommunityCreatedCreateBlobContainerHandler(services.blobStorage);
  RegisterCommunityDomainUpdatedUpdateDomainBlobHandler(services.blobStorage);
  RegisterCommunityDomainUpdatedUpdateVercel(services.vercel);
  RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler(services.blobStorage);
  RegisterPropertyDeletedUpdateSearchIndexHandler(services.cognitiveSearch);
  RegisterPropertyUpdatedUpdateSearchIndexHandler(services.cognitiveSearch);
};

export default RegisterHandlers;