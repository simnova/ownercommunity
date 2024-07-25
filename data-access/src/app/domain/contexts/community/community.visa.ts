import { Visa } from "../../../../../seedwork/passport-seedwork/visa";

export interface CommunityPermissions {
  canManageRolesAndPermissions: boolean;
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
  canManageMembers: boolean;
  canEditOwnMemberProfile: boolean;
  canEditOwnMemberAccounts: boolean;
  isEditingOwnMemberAccount: boolean;
  isSystemAccount: boolean;
}

export interface CommunityVisa extends Visa {
  determineIf(func: ((permissions: CommunityPermissions) => boolean)): boolean;
}

