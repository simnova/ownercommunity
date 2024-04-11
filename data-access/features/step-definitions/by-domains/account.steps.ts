import { Then, When } from '@cucumber/cucumber';
import { NotepadType } from '../../../screenplay/actors';
import { Actor, notes } from '@serenity-js/core';
import { CreateAccount } from '../../../screenplay/tasks/create-account';
import { MemberInDb } from '../../../screenplay/questions/member-in-db';
import { Ensure, equals } from '@serenity-js/assertions';
import { _ } from '../helpers';

When(
  _.AnAccountIsCreatedByActor,
  async function (firstName: string, lastName: string, memberName: string, actor1: Actor, communityName: string, actor2: Actor) {
    const externalId = await notes<NotepadType>().get('user').externalId.answeredBy(actor1);

    await actor2.attemptsTo(CreateAccount.withFirstName(firstName).andLastName(lastName).forMember(memberName).usingUserExternalId(externalId).inCommunity(communityName));
  }
);

