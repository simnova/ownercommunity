import { Given } from "@cucumber/cucumber";

Given('{actor} works', function (actor) {
  // Write code here that turns the phrase above into concrete actions
  console.log(':::actor', actor.name);
  actor.attemptsTo();
});