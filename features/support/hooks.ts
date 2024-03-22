import { After, AfterStep, Before, BeforeAll, BeforeStep, setDefaultTimeout } from '@cucumber/cucumber'
import { Duration, configure } from '@serenity-js/core'
import { InteractWithTheDomain } from '../../screenplay/abilities/domain/interact-with-the-domain';
import { serenityConfig } from './serenity.config';

const timeouts = {
  cucumber: {
      step: Duration.ofSeconds(30),                       // how long to wait for a Cucumber step to complete
  },
}

BeforeAll(async () => {

  // Configure Cucumber
  setDefaultTimeout(timeouts.cucumber.step.inMilliseconds());

  // Configure Serenity/JS
  configure(serenityConfig)
})

Before(function logScenarioNameBefore(scenario) {
  // console.log(`\n******* BEGIN Scenario : ${scenario.pickle.name} ***********`);
  InteractWithTheDomain.startup();
});

After(function logScenarioNameBefore(scenario) {
  InteractWithTheDomain.shutdown();
  // console.log(`\n******* END Scenario : ${scenario.pickle.name} ***********`);
});

BeforeStep(async function logStepNameBefore(step) {
  // console.log(`\n   ===== BEGIN Step : ${step.pickleStep.text} =====`);
});

AfterStep(async function logStepNameAfter(step) {
  // console.log(`\n   ===== END Step : ${step.pickleStep.text} =====`);
});

