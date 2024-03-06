import { CommunityEntityReference } from "./community";
import { CommunityPermissions } from "./community-permissions.spec";
import { Member, MemberProps } from "./member";
import { DomainExecutionContext } from "../context";
import { CommunityVisa } from "../iam/community-visa";
import { Passport } from "../iam/passport";

const memberContext = (mockPermissions: CommunityPermissions) => {
  return ({
    passport: <Passport>(
      ({
        forMember: () => {
          return {
              determineIf: (func:((permissions:CommunityPermissions) => boolean)) => {
                  return func(mockPermissions);
              }
          } as CommunityVisa;
        }
    } as Partial<Passport>) as any)
  } as DomainExecutionContext);
};

const memberProps = <MemberProps>(
  ({
    id: 'valid-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    schemaVersion: 'valid-schema-version',
    setCreatedByRef: () => {}
  } as Partial<MemberProps>) as any
);

export const createMemberInCommunity = (name: string, community: CommunityEntityReference): Member<MemberProps> => {
  return Member.getNewInstance(
    memberProps,
    name,
    community,
    memberContext({
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
