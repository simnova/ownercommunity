// description is in this format: DuyTheOwner{actor} creates a new community named Community1{word}.

import { RoleProps } from "../../src/app/domain/contexts/community/role";

// remove strings before {'s. for example, description will be conerted into "{actor} creates a new community named {word}."
export const DescriptionParser = (description: string) => {
  const values = description.match(/(\w+)\{/g);
  // delete values
  let newDescription = description;
  values?.forEach((value) => {
    newDescription = newDescription.replace(value, '{');
  });
  return newDescription;
};

export const isAdminRole = (role: RoleProps) => {
  let result = false;
  if (
    role.roleName === 'admin' &&
    role.isDefault &&
    role.permissions.communityPermissions.canManageRolesAndPermissions &&
    role.permissions.communityPermissions.canManageCommunitySettings &&
    role.permissions.communityPermissions.canManageSiteContent &&
    role.permissions.communityPermissions.canManageMembers &&
    role.permissions.communityPermissions.canEditOwnMemberProfile &&
    role.permissions.communityPermissions.canEditOwnMemberAccounts &&
    role.permissions.propertyPermissions.canManageProperties &&
    role.permissions.propertyPermissions.canEditOwnProperty &&
    role.permissions.serviceTicketPermissions.canCreateTickets &&
    role.permissions.serviceTicketPermissions.canManageTickets &&
    role.permissions.serviceTicketPermissions.canAssignTickets &&
    role.permissions.serviceTicketPermissions.canWorkOnTickets
  ) {
    result = true;
  }
  return result;
};