import { defineParameterType } from '@cucumber/cucumber';
import { Community, CommunityProps } from "./community";
import { CommunityPermissions } from "./community-permissions.spec";
import { DomainExecutionContext } from "../context";
import { CommunityVisa } from "../iam/community-visa";
import { Passport } from "../iam/passport";
import { UserEntityReference, UserProps } from "../user/user";
// import { createUser } from "../user/user.feature-steps-support";
// import { createMember } from "./member.feature-steps-support";
// import { addAccount } from "./account.feature-steps-support";

const communityContext = (permissions: CommunityPermissions) => {
  return ({
    passport: <Passport>(
      ({
        forCommunity:() => {
          return {
              determineIf: (func:((permissions:CommunityPermissions) => boolean)) => {
                  return func(permissions);
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
const createCommunity = (name: string): Community<CommunityProps> => {
  return Community.getNewInstance(
    communityProps,
    name,
    userEntityReference,
    communityContext({
      isSystemAccount: true,
      canManageRolesAndPermissions: false,
      canManageCommunitySettings: false,
      canManageSiteContent: false,
      canManageMembers: false,
      canEditOwnMemberProfile: false,
      canEditOwnMemberAccounts: false,
      isEditingOwnMemberAccount: false
    })
  );
}
defineParameterType({
  name: 'communityType',
  regexp: /.*/,
  transformer: name => createCommunity(name)
});

// export const addMemberToCommunity = (
//   communityName: string,
//   userName: string,
// ) => {
//   const community = createCommunity(communityName);
//   const user = createUser(userName);
//   const member = createMember('owner-member', community);
//   addAccount(member,user);
// }

