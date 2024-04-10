import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { Ensure, isPresent } from '@serenity-js/assertions';
import { CommunityInDb } from '../questions/community-in-db';

export const CreateCommunity = ({
    named: (communityName: string) => Task.where(`#actor creates ${communityName} community`,
        Interaction.where(`#actor creates ${communityName} community`, async (actor:Actor) => {
            (await InteractWithTheDomain.asUser(actor)).createCommunity(communityName);
        }),
        //Ensure.eventually(CommunityInDb(communityName), isPresent())
    )
});


