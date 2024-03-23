import { Actor, Interaction } from '@serenity-js/core';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';

export const ListPropertyForSaleInDb = (communityName: string, propertyName: string) => {
  return Interaction.where(`#actor lists property for sale`, async (actor: Actor) => {
    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnProperty(async (repo) => {
      const properties = await repo.getAll();
      const property = properties.find((p) => p.propertyName === propertyName);
      property.ListedForSale = true;
      await repo.save(property);
    });
  });
};

export const ListPropertyForRentInDb = (communityName: string, propertyName: string) => {
  return Interaction.where(`#actor lists property for sale`, async (actor: Actor) => {
    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnProperty(async (repo) => {
      const properties = await repo.getAll();
      const property = properties.find((p) => p.propertyName === propertyName);
      property.ListedForRent = true;
      await repo.save(property);
    });
  });
};

export const ListPropertyForLeaseInDb = (communityName: string, propertyName: string) => {
  return Interaction.where(`#actor lists property for lease`, async (actor: Actor) => {
    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnProperty(async (repo) => {
      const properties = await repo.getAll();
      const property = properties.find((p) => p.propertyName === propertyName);
      property.ListedForLease = true;
      await repo.save(property);
    });
  });
}