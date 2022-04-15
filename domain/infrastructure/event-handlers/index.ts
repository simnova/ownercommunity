import {default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler} from './community-created-create-default-roles-member';
import {default as RegisterRoleDeletedReassignMemberNewRoleHandler} from './role-deleted-reassign-member-new-role';
import {default as RegisterCommunityCreatedCreateBlobContainerHandler} from './community-created-create-blob-container';
import {default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler} from './community-domain-updated-update-domain-blob';

var RegisterHandlers = () => {
    // Register all event handlers
    RegisterCommunityCreatedCreateDefaultRolesMemberHandler(); 
    RegisterRoleDeletedReassignMemberNewRoleHandler();   
    RegisterCommunityCreatedCreateBlobContainerHandler();
    RegisterCommunityDomainUpdatedUpdateDomainBlobHandler();
}

export default RegisterHandlers;