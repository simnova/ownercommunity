import { Task } from '@serenity-js/core/lib/screenplay';
import { Ensure, isTrue } from '@serenity-js/assertions';
import { PropertyInCommunityInDb } from '../questions/property-in-community-in-db';
import { ListPropertyInDb } from '../interactions/list-property-in-db';

export const ListProperty = {
  inCommunity: (communityName: string) => ({
    withProperty: (propertyName: string) => ({
      asForSale: async () => Task.where(`#actor lists ${propertyName} for sale`,
          ListPropertyInDb(communityName, propertyName),
          Ensure.eventually((await PropertyInCommunityInDb(communityName, propertyName)).listedForSale, isTrue())
        ),
    }),
  }),
};
