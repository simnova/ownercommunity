import { Given, When } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { Register } from '../../screenplay/tasks/register';

Given('{actor} registers with Owner Community', async function(actor: Actor){
  await actor
    .attemptsTo(
        Register.asUser(),
    );
  });

When('{pronoun} creates community named {word}', async function(actor: Actor, communityName: string){
  await actor
    .attemptsTo(
    );
  }
  );


