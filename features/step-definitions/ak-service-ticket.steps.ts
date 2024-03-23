import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { CreateRole } from '../../screenplay/tasks/create-role';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { Register } from '../../screenplay/tasks/register';

Given('{actor} is a Member of the {word} community', function (actor: Actor, communityName: string) {});

Given('{actor} is a Community Manager at the {word} community', function (actor: Actor, communityName: string) {});

Given('{actor} is a Maintenance Person at the {word} community', function (actor: Actor, communityName: string) {});

Given('{pronoun} has a {word} property in the {word} community', function (actor: Actor, propertyName: string, communityName: string) {});

Given('{actor} is an Owner of the {word} community', function (actor: Actor, communityName: string) {});

Given('{pronoun} does not have any property in the {word} community', function (actor: Actor, communityName: string) {});

When('{actor} creates a service ticket for {word} property not owned by {pronoun}', function (actor: Actor, propertyName: string, actor2: Actor) {});

When('{actor} creates a service ticket for {word} property', function (actor: Actor, propertyName: string) {});

When('{pronoun} advances the service ticket from {word} to {word}', function (actor: Actor, status1: string, status2: string) {});

When('{pronoun} does not advances the service ticket from {word} to {word}', function (actor: Actor, status1: string, status2: string) {});

When('{pronoun} saves the service ticket in DRAFT', function (actor: Actor) {});

When('{pronoun} assigns the service ticket to {actor}', function (actor2: Actor, actor: Actor) {});

Then('the service ticket is not created for {word} property', function (propertyName: string) {});

Then('the service ticket is created for {word} property', function (propertyName: string) {});

Then('the service ticket status is {word}', function (propertyName: string) {});

Then('the service ticket status is not {word}', function (propertyName: string) {});

Then('the service ticket is assigned to {actor}', function (actor: Actor) {});
