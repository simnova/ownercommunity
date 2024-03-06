import { defineParameterType } from '@cucumber/cucumber';
import { Community, CommunityProps } from "./community";
import { CommunityPermissions } from "./community-permissions.spec";
import { DomainExecutionContext } from "../context";
import { CommunityVisa } from "../iam/community-visa";
import { Passport } from "../iam/passport";
import { UserEntityReference, UserProps } from "../user/user";

const domainExecutionContext = (communityPermissions: CommunityPermissions) => {
  return ({
    passport: <Passport>(
      ({
        forCommunity:() => {
          return {
              determineIf: (func:((permissions:CommunityPermissions) => boolean)) => {
                  return func(communityPermissions);
              }
          } as CommunityVisa;
        }
    } as Partial<Passport>) as any)
  } as DomainExecutionContext);
};
const communityProps = <CommunityProps>(
  ({
    name: 'valid-name',
    domain: 'valid-domain',
    whiteLabelDomain: 'valid-white-label-domain',
    handle: 'valid-handle',
    createdAt: new Date(),
    updatedAt: new Date(),
    schemaVersion: 'valid-schema-version',
    createdBy: <UserProps>({id: 'valid-id'} as any),
    setCreatedByRef: () => {}
  } as Partial<CommunityProps>) as any
);
const userEntityReference = {} as UserEntityReference;
const createCommunity = (name: string, communityPermissions: CommunityPermissions): Community<CommunityProps> => {
  return Community.getNewInstance(
    communityProps,
    name,
    userEntityReference,
    domainExecutionContext(communityPermissions)
  );
}
const defaultCommunityPermissions =  <CommunityPermissions>{
  isSystemAccount: true,
  canManageRolesAndPermissions: false,
  canManageCommunitySettings: false,
  canManageSiteContent: false,
  canManageMembers: false,
  canEditOwnMemberProfile: false,
  canEditOwnMemberAccounts: false,
  isEditingOwnMemberAccount: false
};
defineParameterType({
  name: 'communityType',
  regexp: /.*/,
  transformer: name => createCommunity(name, defaultCommunityPermissions)
});

