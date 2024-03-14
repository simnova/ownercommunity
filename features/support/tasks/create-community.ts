import { Task } from '@serenity-js/core/lib/screenplay';
import { CreateCommunityInDb} from '../interactions/create-community-in-db';

export const CreateCommunity = ({
    asNew: (communityName: string) => Task.where(`#actor creates ${communityName} community`,
        CreateCommunityInDb(communityName),
    )
});


