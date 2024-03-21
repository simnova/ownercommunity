import { defineParameterType, setDefaultTimeout } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight, Duration } from '@serenity-js/core';

setDefaultTimeout(Duration.ofSeconds(30).inMilliseconds());

defineParameterType({
    name:   'actor',
    regexp: /.*/,
    transformer: (name: string) =>
        actorCalled(name),
});

defineParameterType({
    name: 'pronoun',
    regexp: /he|she|his|hers|him|her|they|their|them/,
    transformer() {
        return actorInTheSpotlight();
    },
});