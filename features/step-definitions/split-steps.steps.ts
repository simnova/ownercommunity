import { Before, Given, When, Then, DataTable, BeforeAll } from '@cucumber/cucumber';
import { Actor, Notepad, TakeNotes } from '@serenity-js/core';
import { InteractWithTheDomain } from '../../screenplay/abilities/interact-with-the-domain';
import { CreateRole } from '../../screenplay/tasks/create-role';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { v4 as uuidV4 } from 'uuid';
import { NotepadType } from '../../screenplay/actors';
import { Register } from '../../screenplay/tasks/register';

// Before(function () {
//   InteractWithTheDomain.init();
// })

// Given('test setup', async function(){});

Given('{actor} registers with Owner Community', async function(actor: Actor){
  await actor
    .attemptsTo(
        Register.asUser(),
    );
    /*
    console.log(' ******* {actor} registers with Owner Community');
    await InteractWithTheDomain.asSystem().readCommunityDb(async (db) => {
      console.log('===> database > community : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asSystem().readUserDb(async (db) => {
      console.log('===> database > user : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asSystem().readRoleDb(async (db) => {
      console.log('===> database > role : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asSystem().readMemberDb(async (db) => {
      console.log('===> database > member : ', JSON.stringify(db));
    });

    */
  });

When('{pronoun} creates community named {word}', async function(actor: Actor, communityName: string){
  // console.log(' ===> actor name : ', actor.name);
  await actor
    .attemptsTo(
        // CreateCommunity.named(communityName),
    );
/*
    console.log(' ******* {actor} creates {word} community');
    await InteractWithTheDomain.asSystem().readCommunityDb(async (db) => {
      console.log('===> database > community : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asSystem().readUserDb(async (db) => {
      console.log('===> database > user : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asSystem().readRoleDb(async (db) => {
      console.log('===> database > role : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asSystem().readMemberDb(async (db) => {
      console.log('===> database > member : ', JSON.stringify(db));
    });
    */
  }
  );


