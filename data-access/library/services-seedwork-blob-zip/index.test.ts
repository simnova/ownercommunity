// import { InfrastructureServicesBuilder } from '../../framework/app/infrastructure-services-builder';
// import { BlobStorageBase } from '../services-seedwork-blob-storage-interfaces';
// import { BlobZip } from "./index";
// import internal from "stream";

// describe('When using blob-zip', () => {
//   var blobStorage: BlobStorageBase;
//   var blobZip: BlobZip;
//   beforeEach(() => {
//     // arrange
//     const domainInfrastructureImplInstance = new InfrastructureServicesBuilder();
//     blobStorage = domainInfrastructureImplInstance.blobStorage;
//     blobZip = new BlobZip(blobStorage);
//   });

//   test.skip('list blobs by path', async () => {
//     // arrange
//     const containerName = 'community-domains';
//     const path = '/';
//     // act
//     const blobs = await blobStorage.listBlobs(containerName, 'owners2');
//     console.log(blobs);
//     // assert
//     expect(blobs.length).toBeGreaterThan(0);
//   });

//   test.skip('writeStreamToBlob', async () => {
//     // arrange
//     const containerName = 'community-domains';
//     const blobName = 'test3.txt';
//     const content = 'Hello World!';
//     const readable = new internal.Readable();
//     // act

//     readable.push(content);
//     readable.push(null) // end the stream;
    
//     await blobStorage.writeStreamToBlob(blobName, containerName, readable, 'application/zip');
   

//     // assert
//     expect(true).toBe(true);
//   });


//   test.skip('zipping blobs should succeed', async () => {
//     // arrange
//     const containerName = 'community-domains';
//     const blobNames = ['a', 'b'];
//     const zipName = 'ab.zip';

//     // act
//     await blobZip.zipBlobs(containerName, blobNames, zipName);
    
//     // assert
//     expect(true).toBe(true);
//   });
// });