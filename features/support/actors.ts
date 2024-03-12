import { Actor, Cast, TakeNotes } from '@serenity-js/core';
import { InteractWithTheDomain } from './domain/abilities/interactWithTheDomain';
import { SystemExecutionContext } from '../../domain/infrastructure/execution-context';
import { DomainExecutionContext } from '../../domain/contexts/context';
import { IMemoryDatabase, MemoryDatabase } from './domain/adapter/infrastructure/persistance/memory-database';


export class Actors implements Cast {

    private readonly database: IMemoryDatabase;    // <aggregateRoot, collection>
    constructor(
        private readonly domainExecutionContext: DomainExecutionContext
    ) {
        this.database = new MemoryDatabase();
    }

  prepare(actor: Actor): Actor {
    switch (actor.name) {
      case 'system':
      case 'SYSTEM':
      case 'System':
        return actor.whoCan([
          InteractWithTheDomain.using(SystemExecutionContext, this.database),
          TakeNotes.usingAnEmptyNotepad(),
        ]);
      default:
        return actor.whoCan([
          InteractWithTheDomain.using(this.domainExecutionContext, this.database),
          TakeNotes.usingAnEmptyNotepad(),
        ]);
    }
  }
}