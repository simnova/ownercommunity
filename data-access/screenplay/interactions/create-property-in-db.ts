import { Actor, Interaction } from "@serenity-js/core";
import { InteractWithTheDomain } from "../abilities/domain/interact-with-the-domain";
import { CommunityInDb } from "../questions/community-in-db";
import { CommunityEntityReference } from "../../src/app/domain/contexts/community/community";

export const CreatePropertyInDb = (
  communityName: string,
  propertyName: string,
) => {
    return Interaction.where(`#actor creates property`, async (actor:Actor) => {
      const community = await (await CommunityInDb(communityName)).answeredBy(actor) as CommunityEntityReference;
      (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnProperty(async (repo) => { // [MG-TBD] - change to user context
        const newProperty = await repo.getNewInstance(propertyName, community);
        await repo.save(newProperty);
    });
  })
}

