import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';

export const ViewCommunities = {
  ownedBy: (actorName: string) => Task.where(`#actor views his communities`,
      Interaction.where(`#actor views his communities`, async (actor: Actor) => {
        (await InteractWithTheDomain.asUser(actor)).getMyCommunities();
      })
    ),
};
