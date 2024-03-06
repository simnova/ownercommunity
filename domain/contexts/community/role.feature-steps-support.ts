import { CommunityEntityReference } from "./community";
import { CommunityPermissions } from "./community-permissions.spec";
import { DomainExecutionContext } from "../context";
import { CommunityVisa } from "../iam/community-visa";
import { Passport } from "../iam/passport";
import { UserProps } from "../user/user";
import { Role, RoleProps } from './role';

const domainExecutionContext = (permissions: CommunityPermissions) => {
  return ({
    passport: <Passport>(
      ({
        forRole:() => {
          return {
              determineIf: (func:((permissions:CommunityPermissions) => boolean)) => {
                  return func(permissions);
              }
          } as CommunityVisa;
        }
    } as Partial<Passport>) as any)
  } as DomainExecutionContext);
};
const roleProps = <RoleProps>(
  ({
    name: 'valid-name',
    createdAt: new Date(),
    updatedAt: new Date(),
    schemaVersion: 'valid-schema-version',
    createdBy: <UserProps>({id: 'valid-id'} as any),
    setCreatedByRef: () => {}
  } as Partial<RoleProps>) as any
);
export const createRoleInCommunity = (name: string, community: CommunityEntityReference, communityPermissions: CommunityPermissions): Role<RoleProps> => {
  return Role.getNewInstance(
    roleProps,
    name,
    false,
    community,
    domainExecutionContext(communityPermissions)
  );
}

