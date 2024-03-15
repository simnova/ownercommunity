import { Actor, Cast, Notepad, TakeNotes } from '@serenity-js/core';
import { v4 as uuidV4 } from 'uuid';
import { InteractWithTheDomain } from './abilities/domain/interact-with-the-domain';

export interface NotepadType {
  user: {
    firstName: string;
    lastName: string;
    externalId: string;
  }
}

export class Actors implements Cast {
    constructor(
    ) {
    }

  prepare(actor: Actor): Actor {
    const [firstName, lastName] = actor.name.split("The");
    const externalId = uuidV4();

    return actor.whoCan(
      TakeNotes.using(Notepad.with<NotepadType>({user: {firstName, lastName, externalId}})),
      InteractWithTheDomain.asActor(actor)
    )
  }
}