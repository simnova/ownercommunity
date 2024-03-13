import { Actor, Cast, Notepad, TakeNotes } from '@serenity-js/core';
import { InteractWithTheDomain } from './domain/abilities/interactWithTheDomain';
import { ReadOnlyContext } from '../../domain/infrastructure/execution-context';
import { v4 as uuidV4 } from 'uuid';

interface NotepadType {
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

    InteractWithTheDomain.using(ReadOnlyContext).actOnUser(async (repo) => {
      const user = await repo.getNewInstance(externalId, firstName, lastName);
      await repo.save(user);
    });

    return actor.whoCan(
      TakeNotes.using(Notepad.with<NotepadType>({
        user: {
          firstName,
          lastName,
          externalId
        }
      }))
    );
  }
}