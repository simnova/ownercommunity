import { Task } from '@serenity-js/core/lib/screenplay';
import { Ensure, isTrue } from '@serenity-js/assertions';
import { PropertyInCommunityInDb } from '../questions/property-in-community-in-db';
import { ListPropertyForLeaseInDb, ListPropertyForRentInDb, ListPropertyForSaleInDb } from '../interactions/list-property-in-db';

export const ListProperty = {
  inCommunity: (communityName: string) => ({
    withProperty: (propertyName: string) => ({
      asForSale: async () => Task.where(`#actor lists ${propertyName} for sale`,
          ListPropertyForSaleInDb(communityName, propertyName),
          Ensure.eventually((await PropertyInCommunityInDb(communityName, propertyName)).listedForSale, isTrue())
        ),
      asForRent: async () => Task.where(`#actor lists ${propertyName} for rent`,
          ListPropertyForRentInDb(communityName, propertyName),
          Ensure.eventually((await PropertyInCommunityInDb(communityName, propertyName)).listedForRent, isTrue())
        ),
      asForLease: async () => Task.where(`#actor lists ${propertyName} for lease`,
          ListPropertyForLeaseInDb(communityName, propertyName),
          Ensure.eventually((await PropertyInCommunityInDb(communityName, propertyName)).listedForLease, isTrue())
        ),
    }),
  }),
};
