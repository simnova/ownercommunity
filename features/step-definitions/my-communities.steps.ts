import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { ViewCommunities } from '../../screenplay/tasks/view-community';
import { Ensure, equals } from '@serenity-js/assertions';
import { CommunityInDb } from '../../screenplay/questions/community-in-db';

Given('{actor} is member of the following communities:', async function (actor: Actor, dataTable: DataTable) {
  // Write code here that turns the phrase above into concrete actions
  dataTable.hashes().forEach(async (row) => {
    await actor
    .attemptsTo(
      CreateCommunity.named(row['Community Name'])
      );
  });
});

When('{pronoun} views his communities', function (actor) {
  // Write code here that turns the phrase above into concrete actions
  actor
  .attemptsTo(
    ViewCommunities.ownedBy(actor)
    );
});

Then('{pronoun} should see the following communities:', async function (actor, dataTable) {
  // Write code here that turns the phrase above into concrete actions
  dataTable.hashes().forEach(async (row) => {
    actor
    .attemptsTo(
      Ensure.that((await CommunityInDb(row['Community Name'])).name, equals(row['Community Name']))
      );
  });
});
