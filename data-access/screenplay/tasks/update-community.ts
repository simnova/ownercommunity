import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { CommunityEntityReference } from '../../src/app/domain/contexts/community/community';

export const UpdateCommunity = (communityName: string) => ({
    setDomain: (domainName: string) => Task.where(`#actor updates ${communityName} community domain`,
        Interaction.where(`#actor creates ${communityName} community`, async (actor:Actor) => {
            const interaction = InteractWithTheDomain.as(actor);
            let community: CommunityEntityReference;
            await interaction.readCommunityDb(async (db) => {
                community = db?.getAll()?.find(c => c.name === communityName);
              });
            await interaction.actOnCommunity(async (repo) => {
                const communityDo = await repo.get(community.id); 
                communityDo.Domain = domainName;
                await repo.save(communityDo);
            });
        })
    )
});



