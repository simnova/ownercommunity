import { Given, When, Then } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight, notes } from '@serenity-js/core';
import { CreateProperty } from '../../screenplay/tasks/create-property';
import { Ensure, equals } from '@serenity-js/assertions';
import { ListProperty } from '../../screenplay/tasks/list-property';
import { PropertyInCommunityInDb } from '../../screenplay/questions/property-in-community-in-db';

interface StepNotes {
  communityName: string;
  propertyName: string;
}

Given('{actor} creates a property {word} in the {word} community', async function (actor: Actor, propertyName: string, communityName: string) {
  await actor.attemptsTo(
    notes<StepNotes>().set('communityName', communityName).set('propertyName', propertyName),
    CreateProperty.inCommunity(communityName).asNewPropertyNamed(propertyName)
  );
});

When('{pronoun} lists the property {word} for Sale', async function (actor: Actor, propertyName: string) {
  await actor.attemptsTo(
    await ListProperty
      .inCommunity(await notes<StepNotes>().get('communityName').answeredBy(actorInTheSpotlight()))
      .withProperty(propertyName)
      .asForSale()
  );
});

When('{pronoun} lists the property {word} for Rent', async function (actor: Actor, propertyName: string) {
  await actor.attemptsTo(
    await ListProperty
      .inCommunity(await notes<StepNotes>().get('communityName').answeredBy(actorInTheSpotlight()))
      .withProperty(propertyName)
      .asForRent()
  );
});

When('{pronoun} lists the property {word} for Lease', async function (actor: Actor, propertyName: string) {
  await actor.attemptsTo(
    await ListProperty
      .inCommunity(await notes<StepNotes>().get('communityName').answeredBy(actorInTheSpotlight()))
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