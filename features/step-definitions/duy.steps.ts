import { Given, Then } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Actor } from '@serenity-js/core';
import { RoleProps } from '../../domain/contexts/community/role';
import { RoleForCommunityInDb } from '../../screenplay/questions/role-for-community-in-db';
import { CreateCommunity } from '../../screenplay/tasks/create-community';

Given('{pronoun} creates a new community named {word}', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(CreateCommunity.named(communityName));
});

Then('{pronoun} should be the admin member of {word}', async function (actor: Actor, communityName: string) {
  const roleQuestion = await RoleForCommunityInDb(communityName, 'admin');
  const role = await roleQuestion.answeredBy(actor);
  await actor.attemptsTo(Ensure.that(isAdminRole(role), equals(true)));
});

const isAdminRole = (role: RoleProps) => {
  let result = false;
  if (
    role.roleName === "admin" &&
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
