import { Actor, Interaction } from "@serenity-js/core";
import { InteractWithTheDomain } from "../domain/abilities/interactWithTheDomain";
import { CommunityEntityReference } from "../../../domain/contexts/community/community";

export const CreateRoleInDb = (name: string, community: CommunityEntityReference) => {
  return Interaction.where(`#actor creates user`, async (actor:Actor) => {
    await InteractWithTheDomain.as(actor).actOnRole(async (repo) => {
      const role = await repo.getNewInstance(name, community);
      console.log('===>role in db: ', role);
      await repo.save(role);
    });
  });
}