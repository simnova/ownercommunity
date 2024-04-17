import { When } from '@cucumber/cucumber';
import { Actor, notes } from '@serenity-js/core';
import { NotepadType } from '../../../screenplay/actors';
import { CreateAccount } from '../../../screenplay/tasks/create-account';

When(
  'An account with first name {word}, last name {word} for {word} using externalId of {actor} in {word} is created by {actor}',
  async function (firstName: string, lastName: string, memberName: string, actor1: Actor, communityName: string, actor2: Actor) {
    const externalId = await notes<NotepadType>().get('user').externalId.answeredBy(actor1);

    await actor2.attemptsTo(CreateAccount.withFirstName(firstName).andLastName(lastName).forMember(memberName).usingUserExternalId(externalId).inCommunity(communityName));
  }
);

