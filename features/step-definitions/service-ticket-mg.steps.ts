// import { Before, Given, When, Then, DataTable, BeforeAll } from '@cucumber/cucumber';
// import { Actor, actorInTheSpotlight, Check, notes, Question, List, TakeNotes, QuestionAdapter, AnswerQuestions, engage, Notepad } from '@serenity-js/core';
// import { actorCalled, Interaction } from '@serenity-js/core'
// import { InteractWithTheDomain } from '../support/domain/abilities/interactWithTheDomain';
// import { ReadOnlyContext, SystemExecutionContext } from '../../domain/infrastructure/execution-context';
// import { v4 as uuidV4 } from 'uuid';
// import { User, UserEntityReference, UserProps } from '../../domain/contexts/user/user';
// import { Ensure, isTrue } from '@serenity-js/assertions';
// import { ReadOnlyPassport } from '../../domain/contexts/iam/passport';
// import { IMemoryDatabase, MemoryDatabase } from '../support/domain/adapter/infrastructure/persistance/memory-database';
// import { DomainExecutionContext } from '../../domain/contexts/context';
// import { CommunityProps } from '../../domain/contexts/community/community';

// Before(async function () {
//   this.database = new MemoryDatabase();
// });

// const getCommunityByName = async (database: IMemoryDatabase, communityName: string): Promise<CommunityProps> => {
//   let community: CommunityProps;
//   await InteractWithTheDomain.using(ReadOnlyContext, database).readCommunityDb(async (db) => {
//     community = db.getAll()?.find(c => c.name === communityName);
//   });
//   return community
// }

// const getUserByExternalId = async (database: IMemoryDatabase, externalId: string): Promise<UserProps> => {
//   let user: UserProps;
//     await InteractWithTheDomain.using(ReadOnlyContext, database).readUserDb(async (db) => {
//       user = db.getAll()?.find(u => u.externalId === externalId);
//     });
//   return user;
// }

// // Before(function () {
 
// //   this.community = {}
// //   this.user = {}
// // })


// Given('{actor} creates {word} community', async function(actor: Actor, communityName: string){
//   console.log('===>actor: ', actor);
//   console.log('===>communityName: ', communityName);
//   this.
//   // const communityName = community;
//   // const externalId = uuidV4();
//   // const users = actor.abilityTo(TakeNotes).where<NotepadType>('user');
//   // console.log('===>users: ', users);
//   await actor
//     .whoCan(InteractWithTheDomain.using(ReadOnlyContext, this.database))
//     .attemptsTo(
//       // createUser(externalId, 'John', 'Doe'),
//       createCommunity(this.database, communityName)
//     );
//     // const community = await getCommunityByName(this.database, communityName);
//     // console.log('===>community: ', community);
//     // this.community[communityName] = community;
//     // console.log('===>this.community: ', this.community);
//   });

// export const createUser = (externalId:string, firstName:string, lastName:string) => {
//   return Interaction.where(`#actor creates user`, async (actor:Actor) => {
//     await InteractWithTheDomain.as(actor).actOnUser(async (repo) => {
//       const user = await repo.getNewInstance(externalId, firstName, lastName);
//       await repo.save(user);
//     });
//   });
// }

// export const createCommunityPG = (communityName: string, externalId:string, users: QuestionAdapter<UserProps[]>) => {
//   return Interaction.where(`#actor creates community`, async (actor:Actor) => {
//     await InteractWithTheDomain.as(actor).actOnCommunity(async (repo) => {
//       var userResult = await users.answeredBy(actor);
    
//       var matchedUser = userResult.find((user) => user.externalId === externalId);
//       console.log('===>communityUser: ', userResult);
//       let community = await repo.getNewInstance(communityName, matchedUser);
//       console.log('===>community: ', community);
//       community.Domain = 'test.com';
//       console.log('===>updated community: ', community);
//       await repo.save(community);
//     });

//     // Interaction to ClearLocalStorage directly uses Actor's ability to BrowseTheWeb
//     // const page: Page = await BrowseTheWeb.as(actor).currentPage()
//     // await page.executeScript(() => window.localStorage.clear())
//     console.log('===>createCommunity: ', communityName)
//   });
// }

// export const createCommunity = (database: IMemoryDatabase, communityName: string) => {
//   return Interaction.where(`#actor creates community`, async (actor:Actor) => {
//     await InteractWithTheDomain.as(actor).actOnCommunity(async (repo) => {
//       // var userResult = await users.answeredBy(actor);
    
//       // var matchedUser = userResult.find((user) => user.externalId === externalId);
//       var user = await getUserByExternalId(database, notes().get('user').externalId);
//       console.log('===>communityCreatorUser: ', user);
//       let community = await repo.getNewInstance(communityName, user);
//       console.log('===>community: ', community);
//       community.Domain = 'test.com';
//       console.log('===>updated community: ', community);
//       await repo.save(community);
//     });

//     // Interaction to ClearLocalStorage directly uses Actor's ability to BrowseTheWeb
//     // const page: Page = await BrowseTheWeb.as(actor).currentPage()
//     // await page.executeScript(() => window.localStorage.clear())
//     console.log('===>createCommunity: ', communityName)
//   });
// }