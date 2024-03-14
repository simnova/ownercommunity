import { Before, Given, When, Then, DataTable, BeforeAll } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { InteractWithTheDomain } from '../support/domain/abilities/interactWithTheDomain';
import { SystemExecutionContext } from '../../domain/infrastructure/execution-context';
import { RegisterWithOwnerCommunity } from '../support/tasks/register-with-owner-community';
import { CreateRole } from '../support/tasks/create-role';
import { CreateCommunity } from '../support/tasks/create-community';
import { UpdateCommunity } from '../support/tasks/update-community';


Given('test setup', async function(){});

Given('{actor} creates {word} community', async function(actor: Actor, communityName: string){
  await actor
    .whoCan(
      InteractWithTheDomain.asSystem(),
    )
    .attemptsTo(
      RegisterWithOwnerCommunity.asNewUser(),
      CreateCommunity
        .asNew(communityName),
      CreateRole
          .inCommunity(communityName)
            .asNewRole('manager')
              .withPermissions(['read', 'write']),
    );

    InteractWithTheDomain.asSystem().readCommunityDb(async (db) => {
      console.log('===> database > community : ', JSON.stringify(db));
    });

    InteractWithTheDomain.asSystem().readUserDb(async (db) => {
      console.log('===> database > user : ', JSON.stringify(db));
    });

    InteractWithTheDomain.asSystem().readRoleDb(async (db) => {
      console.log('===> database > role : ', JSON.stringify(db));
    });

    InteractWithTheDomain.asSystem().readMemberDb(async (db) => {
      console.log('===> database > member : ', JSON.stringify(db));
    });
    /*
    console.log('***************************************')
    await actor
    .whoCan(
      InteractWithTheDomain.asSystem(),
    )
    .attemptsTo(
      UpdateCommunity(communityName)
        .setDomain('second-domain.com')
    );

    InteractWithTheDomain.asSystem().readCommunityDb(async (db) => {
      console.log('===> database > community : ', JSON.stringify(db));
    });

    InteractWithTheDomain.asSystem().readUserDb(async (db) => {
      console.log('===> database > user : ', JSON.stringify(db));
    });

    InteractWithTheDomain.asSystem().readRoleDb(async (db) => {
      console.log('===> database > role : ', JSON.stringify(db));
    });

    InteractWithTheDomain.asSystem().readMemberDb(async (db) => {
      console.log('===> database > member : ', JSON.stringify(db));
    });
    */
  });



