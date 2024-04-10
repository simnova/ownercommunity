import { Task } from '@serenity-js/core/lib/screenplay';
import { CreatePropertyInDb } from '../interactions/create-property-in-db';
import { Ensure, isPresent } from '@serenity-js/assertions';
import { PropertyInCommunityInDb } from '../questions/property-in-community-in-db';

export const CreateProperty = ({
    inCommunity: (communityName: string) => ({
        asNewPropertyNamed: (propertyName: string) => Task.where(`#actor creates ${propertyName} property in ${communityName} community`,                
           CreatePropertyInDb(communityName, propertyName),
           Ensure.eventually(PropertyInCommunityInDb(communityName, propertyName), isPresent())
        ),
    }),
});

