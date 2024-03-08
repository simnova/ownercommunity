import { SystemExecutionContext } from '../feature-steps-helper';
import { CommunityEntityReference } from "./community";
// import { CommunityPermissions } from "./community-permissions.spec";
import { Member, MemberProps } from "./member";
// import { DomainExecutionContext } from "../context";
// import { CommunityVisa } from "../iam/community-visa";
// import { Passport } from "../iam/passport";

// const domainExecutionContext = (communityPermissions: CommunityPermissions) => {
//   return ({
//     passport: <Passport>(
//       ({
//         forMember: () => {
//           return {
//               determineIf: (func:((permissions:CommunityPermissions) => boolean)) => {
//                   return func(communityPermissions);
//               }
//           } as CommunityVisa;
//         }
//     } as Partial<Passport>) as any)
//   } as DomainExecutionContext);
// };

// const memberProps = <MemberProps>(
//   ({
//     id: 'valid-id',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     schemaVersion: 'valid-schema-version',
//     setCreatedByRef: () => {}
//   } as Partial<MemberProps>) as any
// );
// const defaultCommunityPermissions =  <CommunityPermissions>{
//   isSystemAccount: true,
//   canManageRolesAndPermissions: false,
//   canManageCommunitySettings: false,
//   canManageSiteContent: false,
//   canManageMembers: false,
//   canEditOwnMemberProfile: false,
//   canEditOwnMemberAccounts: false,
//   isEditingOwnMemberAccount: false
// };
const memberProps = {} as MemberProps;
export const createMemberInCommunity = (name: string, community: CommunityEntityReference): Member<MemberProps> => {
  return Member.getNewInstance(
    memberProps,
    name,
    community,
    SystemExecutionContext(),
  );
}
