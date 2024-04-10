import { Actor, Interaction } from '@serenity-js/core';
import { CommunityEntityReference } from '../../src/app/domain/contexts/community/community';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { CommunityInDb } from '../questions/community-in-db';

export const CreateMemberInDb = (memberName: string, communityName: string) => {
  return Interaction.where(`#actor creates a new member`, async (actor: Actor) => {
    const community = (await (await CommunityInDb(communityName)).answeredBy(actor)) as CommunityEntityReference;
    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnMember(async (repo) => {
      const newMember = await repo.getNewInstance(memberName, community);
      await repo.save(newMember);
    });
  });
};
