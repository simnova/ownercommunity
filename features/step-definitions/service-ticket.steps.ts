import { Before, Given, When, Then, DataTable } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight, Check, notes, Question, List, TakeNotes, QuestionAdapter, AnswerQuestions } from '@serenity-js/core';
import { actorCalled, Interaction } from '@serenity-js/core'
import { InteractWithTheDomain } from '../support/domain/abilities/interactWithTheDomain';
import { SystemExecutionContext } from '../../domain/infrastructure/execution-context';
import { v4 as uuidV4 } from 'uuid';
import { User, UserEntityReference, UserProps } from '../../domain/contexts/user/user';
import { LastResponse } from '../support/domain/questions/lastResponse';
import { Ensure, isTrue } from '@serenity-js/assertions';
import { ReadOnlyPassport } from '../../domain/contexts/iam/passport';


Before(function () {
  this.community = {}
  this.user = {}
})

Given('{actor} creates community {word}', async function(actor: Actor, community: string){

  interface CreateCommunityNotes{
    newUser: User<UserProps>;
    allUsers: User<UserProps>[];
  }

  const givenUserData = {
    externalId: uuidV4(),
    firstName: 'John',
    lastName: 'Doe'
  }

  const UserListContainsUser = (externalId:string) =>
    Question.about('User list contains user', actor => {
      return LastResponse.repoContents().answeredBy(actor).then(async (response) => {
        console.log('===>response: ', response)
        const newUser = (response as User<UserProps>[]).find((user) => user.externalId === externalId);
        console.log('===>newUser: ', newUser) 
        notes<CreateCommunityNotes>().set('newUser', newUser);
        const notesUser = await notes<CreateCommunityNotes>().get('newUser');
        console.log('===>notesUser: ', notesUser)
        return newUser !== undefined;
      });
    });

    const CreatedUser = (externalId:string) =>
    Question.about('User list contains user', actor => {
      return LastResponse.repoContents().answeredBy(actor).then((response) => {
        console.log('===>response2: ', response)
        const newUser = (response as User<UserProps>[]).find((user) => user.externalId === externalId);
        console.log('===>newUser2: ', newUser)
        return newUser 
      });
    });

   

  await actorCalled(actor.name)
    .whoCan(
      TakeNotes.usingAnEmptyNotepad(),
      InteractWithTheDomain.using(SystemExecutionContext())
      )
    .attemptsTo(
      createUser(givenUserData.externalId, givenUserData.firstName, givenUserData.lastName),
      Ensure.that(UserListContainsUser(givenUserData.externalId), isTrue()),
   
      notes<CreateCommunityNotes>().set('allUsers',LastResponse.repoContents()),
      
      createCommunity(community,givenUserData.externalId, notes<CreateCommunityNotes>().get('allUsers')),
    )
});

export const createUser = (externalId:string, firstName:string, lastName:string) => {
  return Interaction.where(`#actor creates user`, async (actor:Actor) => {
    await InteractWithTheDomain.as(actor).actOnUser(async (repo) => {
      const user = await repo.getNewInstance(externalId, firstName, lastName);
      await repo.save(user);
    });
  });
}

export const createCommunity = (communityName: string, externalId:string, user: QuestionAdapter<User<UserProps>[]>) => {
  return Interaction.where(`#actor creates community`, async (actor:Actor) => {
    await InteractWithTheDomain.as(actor).actOnCommunity(async (repo) => {
      var userResult = await user.answeredBy(actor);
      var matchedUser = userResult.find((user) => user.externalId === externalId);
      console.log('===>communityUser: ', userResult);
      let community = await repo.getNewInstance(communityName, matchedUser);
      await repo.save(community);
    });

    // Interaction to ClearLocalStorage directly uses Actor's ability to BrowseTheWeb
    // const page: Page = await BrowseTheWeb.as(actor).currentPage()
    // await page.executeScript(() => window.localStorage.clear())
    console.log('===>createCommunity: ', communityName)
  });
}