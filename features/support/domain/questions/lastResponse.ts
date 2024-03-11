import type { QuestionAdapter } from '@serenity-js/core';
import { Question } from '@serenity-js/core';
import { InteractWithTheDomain } from '../abilities/interactWithTheDomain';


export class LastResponse  {
  static repoContents(): QuestionAdapter<any>  {
    return Question.about('the last response', async actor => {
      return await actor.abilityTo(InteractWithTheDomain).getLastResponse();
    });
  }
}