import { Actor, notes } from "@serenity-js/core";
import { UserEntityReference } from "../../../domain/contexts/user/user";
import { InteractWithTheDomain } from "../domain/abilities/interactWithTheDomain";
import { NotepadType } from "../actors";

export async function getOrCreateUserForActor(actor: Actor): Promise<UserEntityReference> {
  const externalId = await notes<NotepadType>().get('user').externalId.answeredBy(actor);
  const firstName = await notes<NotepadType>().get('user').firstName.answeredBy(actor);
  const lastName = await notes<NotepadType>().get('user').lastName.answeredBy(actor);

  let user: UserEntityReference;
  await InteractWithTheDomain.asSystem().readUserDb(async (db) => {
    user = db?.getAll()?.find(user => user.externalId === externalId);
  });
  if(user) {
    return user;
  }
  
  let newUser: UserEntityReference;
  await InteractWithTheDomain.as(actor).actOnUser(async (repo) => {
    const user = await repo.getNewInstance(externalId, firstName, lastName);
    newUser = await repo.save(user);
  });
  return newUser;
}
