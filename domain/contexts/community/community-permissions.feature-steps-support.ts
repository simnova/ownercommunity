import { defineParameterType } from '@cucumber/cucumber';
import { generateEnumRegexFromInterface, generatePermissions } from "../feature-steps-helper";
import { CommunityPermissions } from "./community-permissions.spec";

interface Permissions extends CommunityPermissions {
  [key: string]: boolean; // Index signature
}

const permissionsRegex = generateEnumRegexFromInterface({} as Permissions);

const defaultPermissions: CommunityPermissions = {
  canManageRolesAndPermissions: false,
  canManageCommunitySettings: false,
  canManageSiteContent: false,
  canManageMembers: false,
  canEditOwnMemberProfile: false,
  canEditOwnMemberAccounts: false,
  isEditingOwnMemberAccount: false,
  isSystemAccount: false,
};

defineParameterType({
  name: 'communityPermissionsType',
  regexp: permissionsRegex,
  transformer: name => {
    const permissionsList = JSON.parse(name.replace(/'/g, '"'));
    const permissions = generatePermissions<CommunityPermissions>(permissionsList, defaultPermissions);
    return permissions
  }
});

