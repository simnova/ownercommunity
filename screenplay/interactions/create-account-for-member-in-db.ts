
import { Actor, Interaction } from '@serenity-js/core';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { UserInDb } from '../questions/user-in-db';


export const CreateAccountForMemberInDb = (firstName: string, lastName: string, userId: string, memberName: string, communityName: string) => {
  return Interaction.where(`#actor creates an account with first name ${firstName}, last name ${lastName} for ${memberName} using userId ${userId} in ${communityName}`, async (actor: Actor) => {
    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnMember(async (repo) => {
      const members  = await repo.getAll()
      const member = members.find((m) => m.memberName === memberName);

      const user = await(await  UserInDb(userId)).answeredBy(actor);

      let account = member.requestNewAccount();
      account.user=(user);
      account.firstName=firstName;
      account.lastName=lastName;
      // account.createdBy=(actor);
    });
  });
};