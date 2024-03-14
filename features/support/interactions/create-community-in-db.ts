import { Actor, Interaction, notes } from "@serenity-js/core";
import { InteractWithTheDomain } from "../domain/abilities/interactWithTheDomain";
import { GetUserByExternalId } from "../helpers/get-user-by-externalid";
import { NotepadType } from "../actors";
import { SystemExecutionContext } from "../../../domain/infrastructure/execution-context";

export const CreateCommunityInDb = (communityName: string) => {
  return Interaction.where(`#actor creates ${communityName} community`, async (actor:Actor) => {
    await InteractWithTheDomain.using(SystemExecutionContext()).actOnCommunity(async (repo) => {
      const externalId = await notes<NotepadType>().get('user').externalId.answeredBy(actor);
      const community = await repo.getNewInstance(communityName, await GetUserByExternalId(externalId));
      await repo.save(community);
    });
  });
}