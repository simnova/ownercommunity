import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { EndUserRoleProps } from '../../src/components/domain/contexts/community/roles/end-user-role/end-user-role';

export const RoleForCommunityInDb = async (communityName: string, roleName: string) =>
  Question.about(`read ${roleName} role in ${communityName} community`, async (actor) => {
    let role: EndUserRoleProps;
    await InteractWithTheDomain.asReadOnly().readRoleDb(async (db) => {
      role = db.getAll().find((r) => r.community.name === communityName && r.roleName === roleName);
    });
    return role;
  });
