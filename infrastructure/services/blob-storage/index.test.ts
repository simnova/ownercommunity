import { BlobStorage } from './index';






test('create auth header0', () => {
  
  // arrange
  const blobStorage = new BlobStorage();
  const blobName = 'MicrosoftFluentWeb_2004.zip';
  const fileSizeBytes = 15487837;
  
  // act
  var sharedKey = blobStorage.generateSharedKey(blobName, fileSizeBytes, 'application/zip');
  // assert
  expect(sharedKey).toBe('SharedKey test:Zm9vYmFy');
  
});

test.skip('create auth header1', () => {
  
  // arrange
  const blobStorage = new BlobStorage();
  const blobName = 'test4.txt';
  const fileSizeBytes = 14;
  
  // act
  var sharedKey = blobStorage.generateSharedKey(blobName, fileSizeBytes, 'text/plain');
  // assert
  expect(sharedKey).toBe('SharedKey test:Zm9vYmFy');
  
});

test.skip('create auth header1', () => {
  
  // arrange
  const blobStorage = new BlobStorage();
  const blobName = 'test4.txt';
  const fileSizeBytes = 14;
  
  // act
  var sharedKey = blobStorage.generateSharedKey(blobName, fileSizeBytes, 'text/plain');
  // assert
  expect(sharedKey).toBe('SharedKey test:Zm9vYmFy');
  
});

test.skip('create auth header2', () => {
  
  // arrange
  const blobStorage = new BlobStorage();
  const blobName = 'test.txt';
  const fileSizeBytes = 14;
  
  // act
  var sharedKeyLite = blobStorage.generateSharedKeyLite(blobName, fileSizeBytes, 'text/plain');
  // assert
  expect(sharedKeyLite).toBe('SharedKeyLite test:Zm9vYmFy');
  
});