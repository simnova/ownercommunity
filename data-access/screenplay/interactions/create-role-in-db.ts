import { Actor, Interaction } from "@serenity-js/core";
import { InteractWithTheDomain } from "../abilities/domain/interact-with-the-domain";
import { CommunityInDb } from "../questions/community-in-db";
import { CommunityEntityReference } from "../../src/components/domain/contexts/community/community/community";
import { EndUserRole, EndUserRoleProps } from "../../src/components/domain/contexts/community/roles/end-user-role/end-user-role";

export const CreateRoleInDb = (
  communityName: string,
  roleName: string,
  inputPermissions: Record<string, string>
) => {
    return Interaction.where(`#actor creates role`, async (actor:Actor) => {
      const community = await (await CommunityInDb(communityName)).answeredBy(actor) as CommunityEntityReference;
      (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnRole(async (repo) => { // [MG-TBD] - change to user context
        const newRole = await repo.getNewInstance(roleName, community);
        const inputPermissionTypes = Object.keys(inputPermissions);
        const allowedPermissionTypes = getEverySetterOnObjectThatEndsWithPermissions(newRole, inputPermissionTypes);
        allowedPermissionTypes?.forEach((permissionType) => {
          const permissionsInPermissionType = getEverySetterOnObjectThatStartsWithCan(newRole, permissionType);
          updateRolePermissions(newRole.permissions[permissionType], permissionsInPermissionType, inputPermissions[permissionType]);
        });
        await repo.save(newRole);
    });
  })

  function updateRolePermissions(permissionType: string, permissionsInPermissionType: string[], inputPermissionsCommaSeparated: string) {
    permissionsInPermissionType?.forEach((key) => {
      permissionType[key] = inputPermissionsCommaSeparated?.split(', ').includes(key) === true;
    });
  }
}
  

function getEverySetterOnObjectThatStartsWithCan(newRole: EndUserRole<EndUserRoleProps>, permissionType: string): string[] {
  return listSetters(newRole.permissions[permissionType])?.filter(k => k.startsWith('can'));
}

function getEverySetterOnObjectThatEndsWithPermissions(newRole: EndUserRole<EndUserRoleProps>, inputPermissionTypes: string[]): string[] {
    return listGetters(newRole.permissions)?.filter(p => p.endsWith('Permissions'))?.filter(p => inputPermissionTypes.includes(p));
}

function listSetters (instance) {
  return Object.entries(
    Object.getOwnPropertyDescriptors(
      Reflect.getPrototypeOf(instance)
    )
  )
  .filter(e => typeof e[1].set === 'function' && e[0] !== '__proto__')
  .map(e => e[0]);
}

function listGetters (instance) {
  return Object.entries(
    Object.getOwnPropertyDescriptors(
      Reflect.getPrototypeOf(instance)
    )
  )
  .filter(e => typeof e[1].get === 'function' && e[0] !== '__proto__')
  .map(e => e[0]);
}