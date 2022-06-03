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

test('get account', () => {
    
    // arrange
    const maps = new Maps();
    
    
    // act
    var account = maps.accountName; 
    
    // assert
    expect(account).toBe('map name'); // expect test to fail - but helpul to see actual ouput
    
});