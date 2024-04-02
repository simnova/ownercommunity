import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Actor, actorInTheSpotlight } from '@serenity-js/core';
import { RoleProps } from '../../src/app/domain/contexts/community/role';
import { MemberInDb } from '../../screenplay/questions/member-in-db';
import { RoleForCommunityInDb } from '../../screenplay/questions/role-for-community-in-db';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { LogDataSources } from '../../screenplay/tasks/log-data-sources';
import { Register } from '../../screenplay/tasks/register';
import { CreateMember } from './../../screenplay/tasks/create-member';
import { AssignRole } from '../../screenplay/tasks/assign-role';
import { CreateAccount } from '../../screenplay/tasks/create-account';

Given('{actor} is the admin member of {word}', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(Register.asUser(), CreateCommunity.named(communityName));
});

When('{pronoun} adds a new member named {word} to {word}', async function (actor: Actor, memberName: string, communityName: string) {
  await actor.attemptsTo(
    CreateMember.inCommunity(communityName).asNewMemberNamed(memberName), 
    LogDataSources());
});

When('{pronoun} creates a new community named {word}', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(
    CreateCommunity.named(communityName)
    );
});

When('{pronoun} assigns {word} role to {word} in {word}', async function (actor: Actor, roleName:string, memberName: string, communityName: string) {
  await actor.attemptsTo(
    AssignRole.named(roleName).toMember(memberName).inCommunity(communityName)
    );
});

When("{pronoun} creates an account with first name {word}, last name {word} for {word} using userId of {word} in {word}", async function (
  actor: Actor, firstName: string, lastName: string, memberName: string, userName: string, communityName: string) {
  
  await actor.attemptsTo(
    CreateAccount.withFirstName(firstName).andLastName(lastName).forMember(memberName).usingUserName(userName).inCommunity(communityName)
  )
})



Then('{pronoun} should be the admin member of {word}', async function (actor: Actor, communityName: string) {
  const roleQuestion = await RoleForCommunityInDb(communityName, 'admin');
  const role = await roleQuestion.answeredBy(actor);
  await actor.attemptsTo(Ensure.that(isAdminRole(role), equals(true)));
});

Then('{word} should have the admin role in TestCommunity3', async function (memberName: string) {
  await actorInTheSpotlight().attemptsTo(Ensure.that((await MemberInDb(memberName)).role.roleName, equals('admin')));
});

Then('{word} should be the member of {word}', async function (memberName: string, communityName: string) {
  await actorInTheSpotlight().attemptsTo(Ensure.that((await MemberInDb(memberName)).community.name, equals(communityName)));
});

Then('{word} should have the {word} role in {word} with the following permissions:', async function (memberName: string, roleName: string, communityName: string,  dataTable: DataTable) {
  const roleQuestion = await RoleForCommunityInDb(communityName, roleName);
  const role = await roleQuestion.answeredBy(actorInTheSpotlight());
  const member = await MemberInDb(memberName);
  await actorInTheSpotlight().attemptsTo(Ensure.that(member.role, equals(role)));
});

const isAdminRole = (role: RoleProps) => {
  let result = false;
  if (
    role.roleName === 'admin' &&
    role.isDefault &&
    role.permissions.communityPermissions.canManageRolesAndPermissions &&
    role.permissions.communityPermissions.canManageCommunitySettings &&
    role.permissions.communityPermissions.canManageSiteContent &&
    role.permissions.communityPermissions.canManageMembers &&
    role.permissions.communityPermissions.canEditOwnMemberProfile &&
    role.permissions.communityPermissions.canEditOwnMemberAccounts &&
    role.permissions.propertyPermissions.canManageProperties &&
    role.permissions.propertyPermissions.canEditOwnProperty &&
    role.permissions.serviceTicketPermissions.canCreateTickets &&
    role.permissions.serviceTicketPermissions.canManageTickets &&
    role.permissions.serviceTicketPermissions.canAssignTickets &&
    role.permissions.serviceTicketPermissions.canWorkOnTickets
  ) {
    result = true;
  }
  return result;
};
