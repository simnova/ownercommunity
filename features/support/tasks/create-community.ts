import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../domain/abilities/interactWithTheDomain';
import { getOrCreateUserForActor } from '../helpers/get-or-create-user-for-actor';

export const CreateCommunity = ({
    asNew: (communityName: string) => Task.where(`#actor creates ${communityName} community`,
        Interaction.where(`#actor creates ${communityName} community`, async (actor:Actor) => {
            await InteractWithTheDomain.asSystem().actOnCommunity(async (repo) => {
            const community = await repo.getNewInstance(communityName, await getOrCreateUserForActor(actor));
            await repo.save(community);
            });
        })
    )
});


