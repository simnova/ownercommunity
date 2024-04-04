import { Actor, Interaction } from '@serenity-js/core';
import { RoleEntityReference } from '../../src/app/domain/contexts/community/role';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { RoleForCommunityInDb } from '../questions/role-for-community-in-db';

export const AssignRoleToMember = (roleName: string, memberName: string, communityName: string) => {
  return Interaction.where(`#actor assign role to member`, async (actor: Actor) => {
    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnMember(async (repo) => {
      const adminRole = (await (await RoleForCommunityInDb(communityName, roleName)).answeredBy(actor)) as RoleEntityReference;
      const members = (await repo.getAll())
      const member = members.find((m) => m.memberName === memberName);
      member.Role = adminRole;
      await repo.save(member);
    });
  });
};
