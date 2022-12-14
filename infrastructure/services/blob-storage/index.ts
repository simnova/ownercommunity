import { BlobRequest } from './blob-request';
import { AuthHeader } from './auth-header';
import { BlobActions, FileInfo } from './blob-actions';

export interface IBlobStorage {
  deleteBlob(blobName:string, containerName:string):Promise<void>;
  createTextBlob(blobName:string,containerName:string,text:string):Promise<void>;
  createContainer(containerName:string, allowPublicAccess?:boolean):Promise<void>
  listBlobs(containerName:string, path:string):Promise<FileInfo[]>;
  generateReadSasToken(blobName:string,containerName:string,minutesUntilExpiration:number):Promise<string>;
  generateSharedKey(blobName:string,fileSizeBytes:number,requestDate:string,mimeType:string, containerName:string):string;
  generateSharedKeyLite(blobName:string,mimeType:string,containerName:string):string;
}

export class BlobStorage implements IBlobStorage {

  private readonly accountName:string;
  private readonly accountKey:string;

  constructor(accountName:string, accountKey:string){
    this.accountName = accountName;
    this.accountKey = accountKey;
  }

  public deleteBlob(blobName:string, containerName:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).deleteBlob(blobName,containerName);
  }
  public createTextBlob(blobName:string,containerName:string,text:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).createTextBlob(blobName,containerName,text);
  }

  /**
   * Creates a container in the blob storage account
   * @param containerName The name of the container to create
   * @param allowPublicAccess If true, the container will be created with public access (default: true)
   * */
  public createContainer(containerName:string, allowPublicAccess:boolean = true):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).createContainer(containerName,allowPublicAccess);
  }

  /**
   * Lists all blobs in a container
   * @param containerName The name of the container to list
   * @param path The path to list / prefix of all the file names
   * */
  public listBlobs(containerName:string, path:string):Promise<FileInfo[]>{
    return (new BlobActions(this.accountName,this.accountKey)).listBlobs(containerName,path);
  }
  public generateReadSasToken(blobName:string,containerName:string,minutesUntilExpiration:number):Promise<string>{
    return (new BlobActions(this.accountName,this.accountKey)).generateReadSasToken(blobName,containerName,minutesUntilExpiration);
  }

  public generateSharedKey(blobName:string,fileSizeBytes:number,requestDate:string,mimeType:string, containerName:string):string{
    const blobRequest = (new BlobRequest()).createRequest(
      this.accountName,
      containerName,
      blobName,
      fileSizeBytes,
      requestDate,
      mimeType
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