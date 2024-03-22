import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { Actor, Duration, Wait, WaitUntil } from '@serenity-js/core';
import { Ensure, isPresent, equals, includes } from '@serenity-js/assertions';
import { Register } from '../../screenplay/tasks/register';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { MemberInDb } from '../../screenplay/questions/member-in-db';
import { CommunityInDb } from '../../screenplay/questions/community-in-db';

When('{pronoun} creates a new community called {word}', async function (actor: Actor, communityName: string) {
  await actor
    .attemptsTo(
      CreateCommunity.named(communityName)
    );
});

Then('{pronoun} should see that the {word} community was created by her', async function (actor: Actor, communityName: string) {
  await actor
    .attemptsTo(
      Ensure.that((await CommunityInDb(communityName)), isPresent()),
      Ensure.that((await CommunityInDb(communityName)).createdBy.externalId, equals((await MemberInDb(actor.name)).community.createdBy.externalId))
    )
});

Then('{pronoun} is a member of {word}', async function (actor: Actor, communityName: string) {
  
  await actor
    .attemptsTo(
      Ensure.that((await MemberInDb(actor.name)).community.name, equals(communityName))
    )
});

Then('{pronoun} member role is {word}', async function (actor: Actor, role: string) {
  await actor
    .attemptsTo(
      Ensure.that((await MemberInDb(actor.name)).role.roleName, equals(role))
    )
});