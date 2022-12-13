import { BlobStorage } from './index';


test.skip('blob-storage: create auth header for zip file', () => {
  
  // arrange
  const blobStorage = new BlobStorage();
  const blobName = 'MicrosoftFluentWeb_2004.zip';
  const fileSizeBytes = 15487837;
  const requestDate = new Date().toUTCString();
  
  // act
  const sharedKey = blobStorage.generateSharedKey(blobName, fileSizeBytes,requestDate, 'application/zip', 'test-container');
  // assert
  expect(sharedKey).toBe('SharedKey test:Zm9vYmFy'); // expect test to fail - but helpful to see actual output
  
});

test.skip('blob-storage: create auth header for text file', () => {
  
  // arrange
  const blobStorage = new BlobStorage();
  const blobName = 'test4.txt';
  const fileSizeBytes = 14;
  const requestDate = new Date().toUTCString();
  
  // act
  const sharedKey = blobStorage.generateSharedKey(blobName, fileSizeBytes,requestDate, 'text/plain', 'test-container');
  // assert
  expect(sharedKey).toBe('SharedKey test:Zm9vYmFy');
  
});

test.skip('blob-storage: create auth header lite for zip file', () => {
  
  // arrange
  const blobStorage = new BlobStorage();
  const blobName = 'test.txt';
  // act
  const sharedKeyLite = blobStorage.generateSharedKeyLite(blobName, 'text/plain', 'test-container');
  // assert
  expect(sharedKeyLite).toBe('SharedKeyLite test:Zm9vYmFy');
  
});