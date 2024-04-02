import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { MemberProps } from '../../src/app/domain/contexts/community/member';

export const MemberInDb = async (memberName:string) => Question.about(`read ${memberName} member`, async (actor) => {
  const [firstName, lastName] = memberName.split("The"); // logic based on Actors.prepare method in screenplay/actors.ts
  let member: MemberProps;
  await InteractWithTheDomain.asReadOnly().readMemberDb(async (db) => {
      const members = db.getAll();
      member = (members).find((m) => m.memberName.split("The").join(" ") === `${firstName} ${lastName}`);
  });
  return member;
});