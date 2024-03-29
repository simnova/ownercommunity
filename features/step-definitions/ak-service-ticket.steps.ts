import { Given, When, Then, Before, DataTable } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';

When('{actor} creates a service ticket for {word} property', function (actor: Actor, propertyName: string) {});

When('{actor} creates a service ticket for {word} property not owned by {pronoun}', function (actor: Actor, propertyName: string, actor2: Actor) {});

When('{actor} adds title in the service ticket', function (actor: Actor) {});

When('{actor} adds details in the service ticket', function (actor: Actor) {});

When('{actor} advances the service ticket from {word} to {word}', function (actor: Actor, status1: string, status2: string) {});

When('{pronoun} saves the service ticket in {word}', function (actor: Actor, status1: string) {});

When('{actor} assigns the service ticket to {actor}', function (actor: Actor, actor2: Actor) {});

When('{actor} adds the property owner {actor} as a requester', function (actor: Actor, actor2: Actor) {});

Then('the service ticket is created for {word} property', function (propertyName: string) {});

Then('the service ticket is not created for {word} property', function (propertyName: string) {});

Then('the service ticket is not advanced to {word}', function (status1: string) {});

Then('the service ticket status is {word}', function (status1: string) {});

Then('the service ticket is assigned to {actor}', function (actor: Actor) {});

Then('the service ticket is unassigned', function () {});
