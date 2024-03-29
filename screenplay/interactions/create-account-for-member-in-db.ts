
import { Actor, Interaction } from '@serenity-js/core';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';


export const CreateAccountForMemberInDb = (firstName: string, lastName: string, userName: string, memberName: string, communityName: string) => {
  return Interaction.where(`#actor creates an account with first name ${firstName}, last name ${lastName} for ${memberName} using userId of ${userName} in ${communityName}`, async (actor: Actor) => {
    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnMember(async (repo) => {
      // Duy - TBD
      // const members  = await repo.getAll()
      // const member = members.find((m) => m.memberName === memberName);

      // const user = UserInDb(userName);

      // member.requestAddAccount({ firstName, lastName, userId: userName });

    });
  });
};