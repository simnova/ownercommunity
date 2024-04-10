import { Ensure, isPresent } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { MemberInDb } from '../questions/member-in-db';
import { CreateAccountForMemberInDb } from '../interactions/create-account-for-member-in-db';

export const CreateAccount = {
  withFirstName: (firstName: string) => ({
    andLastName: (lastName: string) => ({
      forMember: (memberName: string) => ({
        usingUserExternalId: (externalId: string) => ({
          inCommunity: (communityName: string) =>
            Task.where(
              `#actor creates an account with first name ${firstName}, last name ${lastName} for ${memberName} using userId ${externalId}  in ${communityName}`,
              CreateAccountForMemberInDb(firstName, lastName, externalId, memberName, communityName),
              Ensure.eventually(MemberInDb(memberName), isPresent())
            ),
        }),
      }),
    }),
  }),
};
