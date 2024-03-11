import { Given, When, Then } from '@cucumber/cucumber';

Given('{communityRoot} is a community', function (atlantis) {
  console.log('*** atlantis.name: ', atlantis);
  return 'pending';
});
