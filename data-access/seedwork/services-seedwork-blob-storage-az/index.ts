import { BlobRequest } from './blob-request';
import { AuthHeader } from './auth-header';
import {  BlobActions } from './blob-actions';
import internal from 'stream';
import { BlobUploadCommonResponse } from '@azure/storage-blob';
import { BlobStorageDomain } from '../../src/app/domain/infrastructure/blob-storage/interfaces';

import { BlobRequestSettings, FileInfo } from '../services-seedwork-blob-storage-interfaces';
export { BlobRequestSettings, FileInfo}
export class AzBlobStorage implements BlobStorageDomain {

  private readonly accountName:string;
  private readonly accountKey:string;

  constructor(accountName:string, accountKey:string){
    this.accountName = accountName;
    this.accountKey = accountKey;
  }

  public deleteBlob(blobName:string, containerName:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).deleteBlob(blobName,containerName);
  }

  public async writeStreamToBlob(blobName:string,containerName:string,stream:internal.Readable,contentType:string):Promise<BlobUploadCommonResponse>{
    return (new BlobActions(this.accountName,this.accountKey)).writeStreamToBlob(blobName,containerName,stream,contentType);
  }

  public async readStreamFromBlob(blobName:string,containerName:string):Promise<NodeJS.ReadableStream>{
    return (await(new BlobActions(this.accountName,this.accountKey)).readStreamFromBlob(blobName,containerName)).readableStreamBody;
  } 

  /**
   * Creates a text blob in the blob storage account
   * @param blobName The name of the blob to create
   * @param containerName The name of the container to create the blob in
   * @param text The text to store in the blob
   * @param contentType (optional) The content type of the blob (default: text/plain)
   * full details: https://docs.microsoft.com/en-us/rest/api/storageservices/put-blob
   * */
  public createTextBlob(blobName:string,containerName:string,text:string,contentType?:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).createTextBlob(blobName,containerName,text,contentType);
  }

  /**
   * Creates a container in the blob storage account
   * @param containerName The name of the container to create
   * @param allowPublicAccess If true, the container will be created with public access (default: true)
   * full details: https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   * */
  public createContainer(containerName:string, allowPublicAccess:boolean = true):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).createContainer(containerName,allowPublicAccess);
  }

  /**
   * Lists all blobs in a container filtered by a path
   * @param containerName The name of the container to list
   * @param path (optional) prefix of the full blob name to filter the blobs in the container
   * full details: https://docs.microsoft.com/en-us/rest/api/storageservices/list-blobs
   * */
  public listBlobs(containerName:string, prefix?:string):Promise<FileInfo[]>{
    return (new BlobActions(this.accountName,this.accountKey)).listBlobs(containerName,prefix);
  }

  /**
   * Lists all blobs in a storage account filtered by a tag query
   * @param tagQuery The tag query to filter the blobs
   * query syntax: https://docs.microsoft.com/en-us/rest/api/storageservices/find-blobs-by-tags#query-syntax
   * */
  public findBlobsByTags(tagQuery:string):Promise<FileInfo[]>{
    return (new BlobActions(this.accountName,this.accountKey)).findBlobsByTags(tagQuery);
  }


  public generateReadSasToken(blobName:string,containerName:string,minutesUntilExpiration:number):Promise<string>{
    return (new BlobActions(this.accountName,this.accountKey)).generateReadSasToken(blobName,containerName,minutesUntilExpiration);
  }

  public generateSharedKeyWithOptions(blobName:string,containerName:string,requestDate:string,requestSettings:BlobRequestSettings):string{
    const blobRequest = (new BlobRequest()).createRequest(
    this.accountName,
    containerName,
    blobName,
    requestDate,
    requestSettings
  );
  return new AuthHeader().generateFromRequest(blobRequest,this.accountName, this.accountKey);
  }

  public generateSharedKey(blobName:string,fileSizeBytes:number,requestDate:string,mimeType:string, containerName:string):string{
    const blobRequest = (new BlobRequest()).createRequest(
      this.accountName,
      containerName,
      blobName,
      requestDate,
      {
        fileSizeBytes: fileSizeBytes,
        mimeType: mimeType
      }
    );
    return new AuthHeader().generateFromRequest(blobRequest,this.accountName, this.accountKey);
  }

  public generateSharedKeyLite(blobName:string,mimeType:string,containerName:string):string{
    const blobRequest = (new BlobRequest()).createRequestLite(
      this.accountName,
      containerName,
      blobName,
      mimeType
    );
    return new AuthHeader().generateFromRequestLite(blobRequest,this.accountName, this.accountKey);
  }
  
}