import { Then, When } from '@cucumber/cucumber';
import { Ensure, equals, not } from '@serenity-js/assertions';
import { Actor, actorInTheSpotlight, notes } from '@serenity-js/core';
import { PropertyInCommunityInDb } from '../../../screenplay/questions/property-in-community-in-db';
import { PropertyInDb } from '../../../screenplay/questions/property-in-db';
import { CreateProperty } from '../../../screenplay/tasks/create-property';
import { ListProperty } from '../../../screenplay/tasks/list-property';

interface StepNotes {
  communityName: string;
  propertyName: string;
}

When('{actor} creates a property named {word} in community {word}', async function (actor: Actor, propertyName: string, communityName: string) {
  await actor.attemptsTo(
    notes<StepNotes>().set('communityName', communityName).set('propertyName', propertyName),
    CreateProperty.inCommunity(communityName).asNewPropertyNamed(propertyName)
  );
});

When('{pronoun} lists the property {word} for Sale', async function (actor: Actor, propertyName: string) {
  await actor.attemptsTo(
    await ListProperty.inCommunity(await notes<StepNotes>().get('communityName').answeredBy(actorInTheSpotlight()))
      .withProperty(propertyName)
      .asForSale()
  );
});

When('{pronoun} lists the property {word} for Rent', async function (actor: Actor, propertyName: string) {
  await actor.attemptsTo(
    await ListProperty.inCommunity(await notes<StepNotes>().get('communityName').answeredBy(actorInTheSpotlight()))
      .withProperty(propertyName)
      .asForRent()
  );
});

When('{pronoun} lists the property {word} for Lease', async function (actor: Actor, propertyName: string) {
  await actor.attemptsTo(
    await ListProperty.inCommunity(await notes<StepNotes>().get('communityName').answeredBy(actorInTheSpotlight()))
      .withProperty(propertyName)
      .asForLease()
  );
});

Then('the property should be listed for Sale in the {word} community Listings', async function (communityName: string) {
  // Eventually this will be verified against Search listing but for now we will just use Question to verify the property is listed for sale
  Ensure.that((await PropertyInCommunityInDb(communityName, await notes<StepNotes>().get('propertyName').answeredBy(actorInTheSpotlight()))).listedForSale, equals(true));
});

Then('the property should be listed for Rent in the {word} community Listings', async function (communityName: string) {
  // Eventually this will be verified against Search listing but for now we will just use Question to verify the property is listed for sale
  Ensure.that((await PropertyInCommunityInDb(communityName, await notes<StepNotes>().get('propertyName').answeredBy(actorInTheSpotlight()))).listedForRent, equals(true));
});

Then('the property should be listed for Lease in the {word} community Listings', async function (communityName: string) {
  // Eventually this will be verified against Search listing but for now we will just use Question to verify the property is listed for sale
  Ensure.that((await PropertyInCommunityInDb(communityName, await notes<StepNotes>().get('propertyName').answeredBy(actorInTheSpotlight()))).listedForLease, equals(true));
});

Then('the property {word} created by {pronoun} exists in community {word}', async function (propertyName: string, actor: Actor, communityName: string) {
  await actor.attemptsTo(Ensure.that((await PropertyInDb(propertyName)).community.name, equals(communityName)));
});

Then("the property {word} created by {pronoun} does not exist in {word}", async function (propertyName: string, actor: Actor, communityName: string) {
  await actor.attemptsTo(Ensure.that((await PropertyInDb(propertyName)).community.name, not(equals(communityName))));
})