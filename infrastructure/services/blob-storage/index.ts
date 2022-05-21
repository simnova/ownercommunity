import { BlobRequest } from './blob-request';
import { AuthHeader } from './auth-header';
import { AccountInfo } from './account-info';
import { BlobActions, FileInfo } from './blob-actions';

export class BlobStorage {

  private readonly accountName:string;
  private readonly accountKey:string;

  constructor(){
    const {accountName,accountKey} = AccountInfo.getInstance().getSettings();

    this.accountName = accountName;
    this.accountKey = accountKey;
  }

  public deleteBlob(blobName:string, containerName:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).deleteBlob(blobName,containerName);
  }
  public createTextBlob(blobName:string,containerName:string,text:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).createTextBlob(blobName,containerName,text);
  }
  public createContainer(containerName:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).createContainer(containerName);
  }
  public listBlobs(containerName:string, path:string):Promise<FileInfo[]>{
    return (new BlobActions(this.accountName,this.accountKey)).listBlobs(containerName,path);
  }

  public generateSharedKey(blobName:string,fileSizeBytes:number,requestDate:string,mimeType:string, containerName:string):string{
    var blobRequest = (new BlobRequest()).createRequest(
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
    var blobRequest = (new BlobRequest()).createRequestLite(
      this.accountName,
      containerName,
      blobName,
      mimeType
    );
    return new AuthHeader().generateFromRequestLite(blobRequest,this.accountName, this.accountKey);
  }
  
}