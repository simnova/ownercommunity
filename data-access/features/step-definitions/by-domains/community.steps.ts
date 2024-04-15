import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { CreateCommunity } from '../../../screenplay/tasks/create-community';
import { Actor } from '@serenity-js/core';
import { Ensure, isPresent, equals } from '@serenity-js/assertions';
import { CommunityInDb } from '../../../screenplay/questions/community-in-db';
import { MemberInDb } from '../../../screenplay/questions/member-in-db';
import { ViewCommunities } from '../../../screenplay/tasks/view-community';
import { Register } from '../../../screenplay/tasks/register';

Given('{pronoun} is a member of a community named {word}', async function (actor: Actor, communityName: string) {
  if (!communityName || typeof communityName !== 'string' || communityName.trim() === '') {
    throw new Error('Invalid community name provided');
  }
  await actor.attemptsTo(CreateCommunity.named(communityName));
});

Given('{actor} creates {word} community', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(
    Register.asUser(),
    CreateCommunity.named(communityName)
    // , LogDataSources()
  );
});

Given('{actor} is member of the following communities:', async function (actor: Actor, dataTable: DataTable) {
  // Write code here that turns the phrase above into concrete actions
  dataTable.hashes().forEach(async (row) => {
    await actor.attemptsTo(CreateCommunity.named(row['Community Name']));
  });
});

When('{actor} creates a new community named {word}', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(CreateCommunity.named(communityName));
});

Then('{pronoun} should see that the {word} community was created by her', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(
    Ensure.that(await CommunityInDb(communityName), isPresent()),
    Ensure.that((await CommunityInDb(communityName)).createdBy.externalId, equals((await MemberInDb(actor.name)).community.createdBy.externalId))
  );
});

When('{pronoun} views his communities', function (actor) {
  // Write code here that turns the phrase above into concrete actions
  actor.attemptsTo(ViewCommunities.ownedBy(actor));
});

Then('{pronoun} should see the following communities:', async function (actor, dataTable) {
  // Write code here that turns the phrase above into concrete actions
  dataTable.hashes().forEach(async (row) => {
    actor.attemptsTo(Ensure.that((await CommunityInDb(row['Community Name'])).name, equals(row['Community Name'])));
  });
});
