import { WebResource } from '@azure/storage-blob';
import { HeaderConstants } from './constants';
import { AuthHeader } from './auth-header';
import { AccountInfo } from './account-info';
import { createHmac } from 'crypto';

test('pita', () => {
  const {containerName,accountName,accountKey} = AccountInfo()
  const account = accountName
  const version = "2020-04-08"
  const blob = "test.txt"
  const container = containerName
  //const blob_uri = `https://${account}.blob.core.windows.net/${container}/${blob}`;
  const today = new Date().toUTCString();
        
  // Construct signature string
  const CanonicalisedHeaders = `x-ms-date:${today}\nx-ms-version:${version}\n`;
  const CanonicalisedResource = `/${account}/${container}/${blob}`;
  const StringToSign = `GET\n\n\n\n\n\n\n\n\n\n\n\n` + CanonicalisedHeaders + CanonicalisedResource;
  
  // Hash string using HMAC Sha-256 and encode to base64
  const key = accountKey;
  const utf8encoded = Buffer.from(key, 'base64');
  const signature = createHmac('sha256', utf8encoded).update(StringToSign).digest("base64");
  
  expect(StringToSign).toBe(signature);
});


test('create auth header3', () => {
  
  // arrange
  const {containerName,accountName,accountKey} = AccountInfo()
  const webResource = new WebResource();
  const blobName = "test.txt";
  const authHeader = new AuthHeader();

  console.log(containerName,accountName,accountKey)
  // HTTP Headers
  webResource.method = 'GET';
  webResource.url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

  // Canocicalized Headers
  webResource.headers.set(HeaderConstants.X_MS_VERSION,'2021-04-10'); 
  webResource.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());
  
  // Canocicalized Resource
  webResource.headers.set(accountName, `/${accountName}/${containerName}/${blobName}`);

  
  
  
  // act
  const signableString = authHeader.convertToSignableStringLite(webResource, accountName);
    
  console.log(signableString);
  const key = accountKey;
  const utf8encoded = Buffer.from(key, 'base64');
  const signature = createHmac('sha256', utf8encoded).update(signableString).digest("base64");
  
// Create a buffer from the string
//let bufferObj = Buffer.from(accountKey, "base64");

// Encode the Buffer as a utf8 string
//let decodedString = bufferObj.toString("utf8");



  //var sharedKey = authHeader.createAuthHeaderLite(accountName, accountKey, decodedString);
  // assert
  expect(signature).toBe(signableString);
  
});
