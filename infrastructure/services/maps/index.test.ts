import { AzureKeyCredential } from '@azure/search-documents';
import { Maps } from './index';


test('get map key', () => {
  
  // arrange
  const maps = new Maps();

  
  // act
  var mapApiKey = maps.mapKey; 

  // assert
  expect(mapApiKey).toBe('map key'); // expect test to fail - but helpul to see actual ouput
  
});

test('get azure key credential', () => {
  
  // arrange
  const maps = new Maps();

  
  // act
  var azureKeyCredential = maps.azureKeyCredential; 

  // assert
  expect(azureKeyCredential).toBe(new AzureKeyCredential("map key")); // expect test to fail - but helpul to see actual ouput
  
});
