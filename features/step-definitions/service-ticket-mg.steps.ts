import { Before, Given, When, Then, DataTable, BeforeAll } from '@cucumber/cucumber';
import { Actor, Notepad, TakeNotes } from '@serenity-js/core';
import { InteractWithTheDomain } from '../../screenplay/abilities/interact-with-the-domain';
import { CreateRole } from '../../screenplay/tasks/create-role';
import { CreateCommunity } from '../../screenplay/tasks/create-community';

import { Register } from '../../screenplay/tasks/register';

// Before(function () {
//   InteractWithTheDomain.init();
// })


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
        Register.asUser(),
        CreateCommunity.named(communityName),
        // Ensure.eventually(CommunityInDb(communityName), isPresent()),
        // Ensure.eventually(RoleForCommunity(communityName, 'admin'), isPresent()),
        // Ensure.eventually(Community.named().hasRole(), isTrue())
      // CreateRole
      //     .inCommunity(communityName)
      //       .asNewRole('manager')
      //         .withPermissions(['read', 'write']),
    );
    
    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).readCommunityDb(async (db) => {
      console.log('===> database > community : ', JSON.stringify(db));
    });

    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).readUserDb(async (db) => {
      console.log('===> database > user : ', JSON.stringify(db));
    });

    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).readRoleDb(async (db) => {
      console.log('===> database > role : ', JSON.stringify(db));
    });

    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).readMemberDb(async (db) => {
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



