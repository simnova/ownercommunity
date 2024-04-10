import { Actor, Interaction, notes } from '@serenity-js/core';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { UserInDb } from '../questions/user-in-db';
import { NotepadType } from '../actors';

export const CreateAccountForMemberInDb = (firstName: string, lastName: string, externalId: string, memberName: string, communityName: string) => {
  return Interaction.where(
    `#actor creates an account with first name ${firstName}, last name ${lastName} for ${memberName} using userId ${externalId} in ${communityName}`,
    async (actor: Actor) => {
      (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnMember(async (repo) => {
        const members = await repo.getAll();
        const member = members.find((m) => m.memberName === memberName);

        const user = await (await UserInDb(externalId)).answeredBy(actor);

        const currentUserExternalId = await notes<NotepadType>().get('user').externalId.answeredBy(actor);
        const currentUser = await (await UserInDb(currentUserExternalId)).answeredBy(actor);

        let account = member.requestNewAccount();
        account.user = user;
        account.firstName = firstName;
        account.lastName = lastName;
        account.createdBy = currentUser;
        await repo.save(member);
      });
    }
  );
};
