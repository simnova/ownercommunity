import { Before, Given, When, Then, DataTable } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight, Check, notes, Question } from '@serenity-js/core';
import { actorCalled, Interaction } from '@serenity-js/core'


Before(function () {
  this.community = {}
  this.user = {}
})

Given('{actor} creates community {word}', function(actor: Actor, community: string){
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


    export const createCommunity = (communityName: string) =>
  Interaction.where(`#actor clears local storage`, async () => {
    // Interaction to ClearLocalStorage directly uses Actor's ability to BrowseTheWeb
    // const page: Page = await BrowseTheWeb.as(actor).currentPage()
    // await page.executeScript(() => window.localStorage.clear())
    console.log('===>createCommunity: ', communityName)
  })