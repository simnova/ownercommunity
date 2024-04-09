import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { RoleProps } from '../../src/app/domain/contexts/community/role';

export const RoleForCommunityInDb = async (communityName: string, roleName: string) =>
  Question.about(`read ${roleName} role in ${communityName} community`, async (actor) => {
    let role: RoleProps;
    await InteractWithTheDomain.asReadOnly().readRoleDb(async (db) => {
      role = db.getAll().find((r) => r.community.name === communityName && r.roleName === roleName);
    });
    return role;
  });
