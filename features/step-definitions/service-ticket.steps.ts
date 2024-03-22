import { Given, When, DataTable } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { CreateRole } from '../../screenplay/tasks/create-role';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { Register } from '../../screenplay/tasks/register';
import { CreateProperty } from '../../screenplay/tasks/create-property';
import { LogDataSources } from '../../screenplay/tasks/log-data-sources';

Given('test setup', async function () {});

Given('{actor} creates {word} community', async function (actor: Actor, communityName: string) {
  await actor.attemptsTo(
    Register.asUser(),
    CreateCommunity.named(communityName)
    // , LogDataSources()
  );
});

When(
  '{pronoun} creates {word} role in {word} community with following permissions:',
  async function (actor: Actor, roleName: string, communityName: string, dataTable: DataTable) {
    await actor.attemptsTo(
      CreateRole.inCommunity(communityName).asNewRoleNamed(roleName).withPermissions(dataTable.rowsHash()),
      CreateProperty.inCommunity(communityName).asNewPropertyNamed('property1')
      // , LogDataSources()
    );
  }
);
