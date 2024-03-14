import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../domain/abilities/interactWithTheDomain';
import { SystemExecutionContext } from '../../../domain/infrastructure/execution-context';
import { GetCommunityByName } from '../helpers/get-community-by-name';

export const UpdateCommunity = (communityName: string) => ({
    setDomain: (domainName: string) => Task.where(`#actor updates ${communityName} community domain`,
        Interaction.where(`#actor creates ${communityName} community`, async (actor:Actor) => {
            await InteractWithTheDomain.using(SystemExecutionContext()).actOnCommunity(async (repo) => {
                const community = await repo.get((await GetCommunityByName(communityName)).id); 
                community.Domain = domainName;
                await repo.save(community);
            });
        })
    )
});



