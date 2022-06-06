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

test('sas toke', async () => {
    const maps = new Maps();

    var sasToken = await maps.generateSharedKey();

    expect(sasToken).toBe("");
});

test("list token", async () => {
    const maps = new Maps();

    var token = await maps.listKeys();

    expect(JSON.stringify(token)).toBe("");
});

// test('get account', () => {
    
//     // arrange
//     const maps = new Maps();
    
    
//     // act
//     var account = maps.accountName; 
    
//     // assert
//     expect(account).toBe('map name'); // expect test to fail - but helpul to see actual ouput
    
// });