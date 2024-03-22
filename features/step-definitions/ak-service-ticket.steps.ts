import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { CreateRole } from '../../screenplay/tasks/create-role';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { Register } from '../../screenplay/tasks/register';
import { LogDatabase } from './log-database';

Given('{actor} is a member of the {word} community', function (actor: Actor, communityName: string) {});

Given('{actor} is a community manager at the {word} community', function (actor: Actor, communityName: string) {});

Given('{pronoun} has a {word} property in the {word} community', function (actor: Actor, communityName: string) {});

Given('{actor} is an owner of the {word} community', function (actor: Actor, communityName: string) {});

Given('{pronoun} does not have any property in the {word} community', function (actor: Actor, communityName: string) {});

Given('{pronoun} has a {word} role', function (actor: Actor, roleName: string) {});

When('{actor} creates a service ticket for {word} property not owned by {pronoun}', function (actor: Actor) {});

When('{actor} creates a service ticket for {word} property', function (actor: Actor) {});

When('{pronoun} advances the service ticket from DRAFT to SUBMITTED', function (actor: Actor) {});

Then('the service ticket is not created for {word} property', function () {});

Then('the service ticket is created for {word} property', function () {});

Then('the service ticket status is updated to {word}', function () {});

Then('the service ticket status is not updated to {word}', function () {});
