import { Given } from "@cucumber/cucumber";

Given('{actor} works too', function (actor) {
  actor.attemptsTo();
});