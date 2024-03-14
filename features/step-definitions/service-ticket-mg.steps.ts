import { Before, Given, When, Then, DataTable, BeforeAll } from '@cucumber/cucumber';
import { Actor, Notepad, TakeNotes } from '@serenity-js/core';
import { InteractWithTheDomain } from '../support/domain/abilities/interactWithTheDomain';
import { CreateRole } from '../support/tasks/create-role';
import { CreateCommunity } from '../support/tasks/create-community';
import { v4 as uuidV4 } from 'uuid';
import { NotepadType } from '../support/actors';


Given('test setup', async function(){});

Given('{actor} creates {word} community', async function(actor: Actor, communityName: string){

  // const [firstName, lastName] = actor.name.split("The");
  // const externalId = uuidV4();

  await actor
    // .whoCan([
    //   TakeNotes,
    //   TakeNotes.using(Notepad.with<NotepadType>({user: {firstName, lastName, externalId}})),
    //   InteractWithTheDomain.asActor(actor)
    // ])
    .attemptsTo(
      // RegisterWithOwnerCommunity.asNewUser(),
      // CreateCommunity
      //   .asNew(communityName),
      // CreateRole
      //     .inCommunity(communityName)
      //       .asNewRole('manager')
      //         .withPermissions(['read', 'write']),
    );
    /*
    (await (await InteractWithTheDomain.asActor(actor)).asMemberOf(communityName)).readCommunityDb(async (db) => {
      console.log('===> database > community : ', JSON.stringify(db));
    });

    (await (await InteractWithTheDomain.asActor(actor)).asMemberOf(communityName)).readUserDb(async (db) => {
      console.log('===> database > user : ', JSON.stringify(db));
    });

    (await (await InteractWithTheDomain.asActor(actor)).asMemberOf(communityName)).readRoleDb(async (db) => {
      console.log('===> database > role : ', JSON.stringify(db));
    });

    (await (await InteractWithTheDomain.asActor(actor)).asMemberOf(communityName)).readMemberDb(async (db) => {
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



