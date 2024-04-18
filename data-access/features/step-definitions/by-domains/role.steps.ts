import { When, DataTable } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { CreateProperty } from "../../../screenplay/tasks/create-property";
import { CreateRole } from "../../../screenplay/tasks/create-role";

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
