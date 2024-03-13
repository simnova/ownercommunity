import { Actor, Cast, Notepad, TakeNotes } from '@serenity-js/core';
import { InteractWithTheDomain } from './domain/abilities/interactWithTheDomain';
import { ReadOnlyContext } from '../../domain/infrastructure/execution-context';
// import { DomainExecutionContext } from '../../domain/contexts/context';
import { IMemoryDatabase, MemoryDatabase } from './domain/adapter/infrastructure/persistance/memory-database';
import { v4 as uuidV4 } from 'uuid';

interface NotepadType {
  user: {
    firstName: string;
    lastName: string;
    externalId: string;
  }
}

export class Actors implements Cast {

    private readonly database: IMemoryDatabase;    // <aggregateRoot, collection>
    constructor(
        // private readonly domainExecutionContext: DomainExecutionContext
    ) {
        this.database = new MemoryDatabase();
        
    }

  prepare(actor: Actor): Actor {
    const [firstName, lastName] = actor.name.split("The");
    const externalId = uuidV4();

    InteractWithTheDomain.using(ReadOnlyContext, this.database).actOnUser(async (repo) => {
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