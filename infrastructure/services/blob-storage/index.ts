import { BlobRequest } from './blob-request';
import { AuthHeader } from './auth-header';
import { AccountInfo } from './account-info';
import { BlobActions } from './blob-actions';

export class BlobStorage {

  //private readonly containerName:string;
  private readonly accountName:string;
  private readonly accountKey:string;

  constructor(){
    const {accountName,accountKey} = AccountInfo.getInstance().getSettings();
   // this.containerName = containerName;
    this.accountName = accountName;
    this.accountKey = accountKey;
  }

  public deleteBlob(blobName:string, containerName:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).deleteBlob(blobName,containerName);
  }
  public createContainer(containerName:string):Promise<void>{
    return (new BlobActions(this.accountName,this.accountKey)).createContainer(containerName);
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