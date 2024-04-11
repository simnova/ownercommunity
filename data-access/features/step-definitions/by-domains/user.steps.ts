import { Then } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { Actor, notes } from "@serenity-js/core";
import { NotepadType } from "../../../screenplay/actors";
import { MemberInDb } from "../../../screenplay/questions/member-in-db";
import { _ } from "../helpers";

Then(_.UserIsAMemberOfCommunityUnderMemberNamed, async function (actor: Actor, communityName: string, memberName: string) {
  const user = await notes<NotepadType>().get('user').answeredBy(actor);
  const member = await (await MemberInDb(memberName)).answeredBy(actor);
  const accounts = member.accounts.items.map((item) => item.user).filter((u) => u.externalId === user.externalId);
  await actor.attemptsTo(Ensure.that(accounts.length, equals(1)));
});
