import { Before, Given, When, Then, DataTable } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight, Check, notes, Question } from '@serenity-js/core';
import { actorCalled, Interaction } from '@serenity-js/core'
import { InteractWithTheDomain } from '../support/abilities/interactWithTheDomain';
import { SystemExecutionContext } from '../../domain/infrastructure/execution-context';
import { v4 as uuidV4 } from 'uuid';
import { User, UserEntityReference, UserProps } from '../../domain/contexts/user/user';

Before(function () {
  this.community = {}
  this.user = {}
})

Given('{actor} creates community {word}', async function(actor: Actor, community: string){
  await actorCalled(actor.name)
    .whoCan(InteractWithTheDomain.using(SystemExecutionContext))
    .attemptsTo(
      createUser(uuidV4(), 'John', 'Doe'),
      //createCommunity(community)
    )
//  const systemActor.whoCan(InteractWithTheDomain.using(SystemExecutionContext));
//  actor.attemptsTo(
//    createCommunity(community)
//  )
  // let r = data.raw();
  // print the data table
  // console.log(r);
  console.log('===>actor: ', actor)
  console.log('===>community: ', community)
  this.community[community] = community;
  console.log('===>this.community.Atlantis: ', this.community['Atlantis'])

    // await actor.attemptsTo(
    //   console.log(),                                          // activities
    //   // createCommunity(data.rowsHash()),                                          // activities
    // )
  });

  // Write code here that turns the phrase above into concrete actions



// import { Task } from '@serenity-js/core'
// import { Send, PostRequest, LastResponse } from '@serenity-js/rest'
// import { Ensure, equals, endsWith } from '@serenity-js/assertions'

// export interface Product {
//     name:  string;
//     price: string;
// }

// export const createCommunity = (communityName: string) =>
//     Task.where(`#actor sets up the product catalogue`,

//         Send.a(PostRequest.to('/products').with(products)),
//         Ensure.that(
//             LastResponse.status(),
//             equals(201)
//         )
//     )


export const createUser = (externalId:string, firstName:string, lastName:string) =>{
  return Interaction.where(`#actor creates user`, async (actor:Actor) => {
    await InteractWithTheDomain.as(actor).actOnUser(async (repo) => {
      const user = await repo.getNewInstance(externalId, firstName, lastName);
      await repo.save(user);
    });
   
  });
  
}


export const createCommunity = (communityName: string, user: UserEntityReference) =>
  Interaction.where(`#actor clears local storage`, async (actor:Actor) => {
    await InteractWithTheDomain.as(actor).actOnCommunity(async (repo) => {
     let community = await repo.getNewInstance(communityName, user);
     await repo.save(community);
    });

    // Interaction to ClearLocalStorage directly uses Actor's ability to BrowseTheWeb
    // const page: Page = await BrowseTheWeb.as(actor).currentPage()
    // await page.executeScript(() => window.localStorage.clear())
    console.log('===>createCommunity: ', communityName)
  });





