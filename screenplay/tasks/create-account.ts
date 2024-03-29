import { Ensure, isPresent } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { MemberInDb } from '../questions/member-in-db';
import { CreateAccountForMemberInDb } from '../interactions/create-account-for-member-in-db';

export const CreateAccount = {
  withFirstName: (firstName: string) => ({
    andLastName: (lastName: string) => ({
      forMember: (memberName: string) => ({
        usingUserName: (userName: string) => ({
          inCommunity: (communityName: string) =>
            Task.where(
              `#actor creates an account with first name ${firstName}, last name ${lastName} for ${memberName} using userId of ${userName} in ${communityName}`,
              CreateAccountForMemberInDb(firstName, lastName, userName, memberName, communityName),
              Ensure.eventually(MemberInDb(memberName), isPresent())
            ),
        }),
      }),
    }),
  }),
};
