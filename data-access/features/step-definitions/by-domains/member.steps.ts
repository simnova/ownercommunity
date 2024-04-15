import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight } from '@serenity-js/core';
import { CreateMember } from '../../../screenplay/tasks/create-member';
import { LogDataSources } from '../../../screenplay/tasks/log-data-sources';
import { CreateCommunity } from '../../../screenplay/tasks/create-community';
import { Register } from '../../../screenplay/tasks/register';
import { AssignRole } from '../../../screenplay/tasks/assign-role';
import { Ensure, equals } from '@serenity-js/assertions';
import { RoleForCommunityInDb } from '../../../screenplay/questions/role-for-community-in-db';
import { IsAdminRole } from '../../support/helpers';
import { MemberInDb } from '../../../screenplay/questions/member-in-db';

Given('{actor} is the admin member of {word}', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(
    Register.asUser(), 
    CreateCommunity.named(communityName));
});

When('{actor} adds a new member named {word} to {word}', async function (actor: Actor, memberName: string, communityName: string) {
  await actor.attemptsTo(
    CreateMember.inCommunity(communityName).asNewMemberNamed(memberName), 
    LogDataSources());
});

When('{actor} assigns {word} role to {word} in {word}', async function (actor: Actor, roleName: string, memberName: string, communityName: string) {
  await actor.attemptsTo(
    AssignRole.named(roleName).toMember(memberName).inCommunity(communityName));
});

Then('{actor} should be the admin member of {word}', async function (actor: Actor, communityName: string) {
  const roleQuestion = await RoleForCommunityInDb(communityName, 'admin');
  const role = await roleQuestion.answeredBy(actor);
  await actor.attemptsTo(Ensure.that(IsAdminRole(role), equals(true)));
});

Then('{word} should be the member of {word}', async function (memberName: string, communityName: string) {
  await actorInTheSpotlight().attemptsTo(Ensure.that((await MemberInDb(memberName)).community.name, equals(communityName)));
});

Then('{pronoun} is a member of {word}', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(Ensure.that((await MemberInDb(actor.name)).community.name, equals(communityName)));
});

Then('{word} should have the {word} role in {word}', async function (memberName: string, roleName: string, communityName: string) {
  const roleQuestion = await RoleForCommunityInDb(communityName, roleName);
  const role = await roleQuestion.answeredBy(actorInTheSpotlight());
  const member = await MemberInDb(memberName);
  await actorInTheSpotlight().attemptsTo(Ensure.that(member.role, equals(role)));
});

Then('{pronoun} member role is {word}', async function (actor: Actor, role: string) {
  await actor.attemptsTo(Ensure.that((await MemberInDb(actor.name)).role.roleName, equals(role)));
});
