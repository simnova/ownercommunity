import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { Register } from '../../screenplay/tasks/register';
import { Actor } from '@serenity-js/core';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { CreateProperty } from '../../screenplay/tasks/create-property';
import { PropertyInDb } from '../../screenplay/questions/property-in-db';
import { Ensure, isPresent, equals} from '@serenity-js/assertions';

const communityName = 'myCommunity';

Given('{pronoun} is a member of a community', async function (actor: Actor) {
  await actor
    .attemptsTo(
      CreateCommunity.named(communityName)    
      );
});

When('{pronoun} creates the property {word} in the community', async function (actor: Actor, propertyName: string) {
  await actor
    .attemptsTo(
      CreateProperty.inCommunity(communityName).asNewPropertyNamed(propertyName)
      );
});

Then('the property {word} created by {pronoun} exists in the community', async function (propertyName: string, actor: Actor) {
  await actor
    .attemptsTo(
      Ensure.that((await PropertyInDb(propertyName)).community.name, equals(communityName))
    );
});