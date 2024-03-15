import { Actor, Interaction, notes } from "@serenity-js/core";
import { InteractWithTheDomain } from "../abilities/interact-with-the-domain";
import { NotepadType } from "../actors";

export const CreateUserInDb = () => {
  return Interaction.where(`#actor creates user`, async (actor:Actor) => {
    await InteractWithTheDomain.as(actor).actOnUser(async (repo) => {
      const externalId = await notes<NotepadType>().get('user').externalId.answeredBy(actor);
      const firstName = await notes<NotepadType>().get('user').firstName.answeredBy(actor);
      const lastName = await notes<NotepadType>().get('user').lastName.answeredBy(actor);
      const user = await repo.getNewInstance(externalId, firstName, lastName);
      await repo.save(user);
    });
  });
}