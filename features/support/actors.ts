import { Actor, Cast, Notepad, TakeNotes } from '@serenity-js/core';


export class Actors implements Cast {
    constructor(
        
    ) {
    }

    prepare(actor: Actor): Actor {
        return actor.whoCan(
            
            TakeNotes.using(
                Notepad.with({
                    travelerDetails: {key: 'value'},
                })
            )
        );
    }
}