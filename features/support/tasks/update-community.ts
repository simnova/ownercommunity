import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../domain/abilities/interactWithTheDomain';
import { getCommunityByName } from '../helpers/get-community-by-name';

export const UpdateCommunity = (communityName: string) => ({
    setDomain: (domainName: string) => Task.where(`#actor updates ${communityName} community domain`,
        Interaction.where(`#actor creates ${communityName} community`, async (actor:Actor) => {
            await InteractWithTheDomain.asSystem().actOnCommunity(async (repo) => {
                const community = await repo.get((await getCommunityByName(communityName)).id); 
                community.Domain = domainName;
                await repo.save(community);
            });
        })
    )
});



