import { Given, Then, When } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Actor, actorInTheSpotlight, notes } from '@serenity-js/core';
import { NotepadType } from '../../screenplay/actors';
import { MemberInDb } from '../../screenplay/questions/member-in-db';
import { RoleForCommunityInDb } from '../../screenplay/questions/role-for-community-in-db';
import { AssignRole } from '../../screenplay/tasks/assign-role';
import { CreateAccount } from '../../screenplay/tasks/create-account';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { LogDataSources } from '../../screenplay/tasks/log-data-sources';
import { Register } from '../../screenplay/tasks/register';
import { CreateMember } from './../../screenplay/tasks/create-member';
import { DescriptionParser, isAdminRole as IsAdminRole } from './helpers';

Given('{actor} is the admin member of {word}', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(Register.asUser(), CreateCommunity.named(communityName));
});

When('{actor} adds a new member named {word} to {word}', async function (actor: Actor, memberName: string, communityName: string) {
  await actor.attemptsTo(CreateMember.inCommunity(communityName).asNewMemberNamed(memberName), LogDataSources());
});

When('{actor} creates a new community named {word}', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(CreateCommunity.named(communityName));
});

When('{actor} assigns {word} role to {word} in {word}', async function (actor: Actor, roleName: string, memberName: string, communityName: string) {
  await actor.attemptsTo(AssignRole.named(roleName).toMember(memberName).inCommunity(communityName));
});

When(
  'An account with first name {word}, last name {word} for {word} using externalId of {actor} in {word} is created by {actor}',
  async function (firstName: string, lastName: string, memberName: string, actor1: Actor, communityName: string, actor2: Actor) {
    const externalId = await notes<NotepadType>().get('user').externalId.answeredBy(actor1);

    await actor2.attemptsTo(CreateAccount.withFirstName(firstName).andLastName(lastName).forMember(memberName).usingUserExternalId(externalId).inCommunity(communityName));
  }
);

Then('{actor} should be the admin member of {word}', async function (actor: Actor, communityName: string) {
  const roleQuestion = await RoleForCommunityInDb(communityName, 'admin');
  const role = await roleQuestion.answeredBy(actor);
  await actor.attemptsTo(Ensure.that(IsAdminRole(role), equals(true)));
});


Then('{word} should be the member of {word}', async function (memberName: string, communityName: string) {
  await actorInTheSpotlight().attemptsTo(Ensure.that((await MemberInDb(memberName)).community.name, equals(communityName)));
});

Then('{word} should have the {word} role in {word}', async function (memberName: string, roleName: string, communityName: string) {
  const roleQuestion = await RoleForCommunityInDb(communityName, roleName);
  const role = await roleQuestion.answeredBy(actorInTheSpotlight());
  const member = await MemberInDb(memberName);
  await actorInTheSpotlight().attemptsTo(Ensure.that(member.role, equals(role)));
});

Then('{actor} should be a member of {word} under member named {word}', async function (actor: Actor, communityName: string, memberName: string) {
  const user = await notes<NotepadType>().get('user').answeredBy(actor);
  const member = await (await MemberInDb(memberName)).answeredBy(actor);
  const accounts = member.accounts.items.map((item) => item.user).filter((u) => u.externalId === user.externalId);
  await actor.attemptsTo(Ensure.that(accounts.length, equals(1)));  
});
