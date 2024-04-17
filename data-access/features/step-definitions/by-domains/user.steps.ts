import { Given, Then } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { Actor, notes } from "@serenity-js/core";
import { NotepadType } from "../../../screenplay/actors";
import { MemberInDb } from "../../../screenplay/questions/member-in-db";
import { Register } from "../../../screenplay/tasks/register";

Given('{actor} registers with Owner Community', async function(actor: Actor){
  await actor
    .attemptsTo(
        Register.asUser(),
    );
  });


Then('{actor} should be a member of {word} under member named {word}', async function (actor: Actor, communityName: string, memberName: string) {
  const user = await notes<NotepadType>().get('user').answeredBy(actor);
  const member = await (await MemberInDb(memberName)).answeredBy(actor);
  const accounts = member.accounts.items.map((item) => item.user).filter((u) => u.externalId === user.externalId);
  await actor.attemptsTo(Ensure.that(accounts.length, equals(1)));
});
