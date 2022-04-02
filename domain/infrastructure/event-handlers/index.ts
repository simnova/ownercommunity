import {default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler} from './community-created-create-default-roles-member';
import {default as RegisterRoleDeletedReassignMemberNewRoleHandler} from './role-deleted-reassign-member-new-role';

var RegisterHandlers = () => {
    // Register all event handlers
    RegisterCommunityCreatedCreateDefaultRolesMemberHandler(); 
    RegisterRoleDeletedReassignMemberNewRoleHandler();   
}

export default RegisterHandlers;