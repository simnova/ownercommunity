import { default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler } from './community-created-create-default-roles-member';
import { default as RegisterRoleDeletedReassignMemberNewRoleHandler } from './role-deleted-reassign-member-new-role';
import { default as RegisterCommunityCreatedCreateBlobContainerHandler } from './community-created-create-blob-container';
import { default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler } from './community-domain-updated-update-domain-blob';
import { default as RegisterPropertyCreatedUpdateSearchIndexHandler } from './property-created-update-search-index';
import { default as RegisterPropertyDeletedUpdateSearchIndexHandler } from './property-deleted-update-search-index';

var RegisterHandlers = () => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler();
  RegisterRoleDeletedReassignMemberNewRoleHandler();
  RegisterCommunityCreatedCreateBlobContainerHandler();
  RegisterCommunityDomainUpdatedUpdateDomainBlobHandler();
  RegisterPropertyCreatedUpdateSearchIndexHandler();
  RegisterPropertyDeletedUpdateSearchIndexHandler();
};

export default RegisterHandlers;