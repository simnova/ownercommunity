import { Given } from "@cucumber/cucumber";

Given('{actor} works', function (actor) {
  actor.attemptsTo();
});