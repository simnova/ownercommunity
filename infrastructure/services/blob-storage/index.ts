import  { BlobServiceClient } from '@azure/storage-blob';
import { nanoid } from 'nanoid'
import { BlobRequest } from './blob-request';
import { AuthHeader } from './auth-header';

export class BlobStorage {
  private readonly blobContainerNameEnvKey = 'BLOB_CONTAINER_NAME';
  private readonly blobAccountNameEnvKey = 'BLOB_ACCOUNT_NAME'
  private readonly blobConnectionStringEnvKey = 'BLOB_CONNECTION_STRING';
  private readonly blobAccountKeyEnvKey = 'BLOB_ACCOUNT_KEY';

  private readonly containerName:string;
  private readonly accountName:string;
  private readonly accountKey:string;
  private readonly blobConnectionString:string;


  private readonly blobServiceClient: BlobServiceClient

  private readonly acocuntName:string;

  tryGetEnvVar(envVar:string):string{
    const value = process.env[envVar];
    if(value === undefined){
      throw new Error(`Environment variable: ${envVar} is not set`);
    }
    return value;
  }
  constructor(){

    //get values from environment variables
    this.containerName = this.tryGetEnvVar(this.blobContainerNameEnvKey);
    this.accountName = this.tryGetEnvVar(this.blobAccountNameEnvKey);
    this.accountKey = this.tryGetEnvVar(this.blobAccountKeyEnvKey);
    this.blobConnectionString = this.tryGetEnvVar(this.blobConnectionStringEnvKey);


    this.blobServiceClient = new BlobServiceClient(this.blobConnectionString);
  }
  public generateSharedKeyNoFileName(fileSizeBytes:number):string{
    var blobRequest = (new BlobRequest()).createRequest(
      this.accountName,
      this.containerName,
      nanoid(),
      fileSizeBytes
    );
    return new AuthHeader().generateFromRequest(blobRequest,this.accountName, this.accountKey);

  }

  public generateSharedKey(blobName:string,fileSizeBytes:number,mimeType:string):string{
    var blobRequest = (new BlobRequest()).createRequest(
      this.accountName,
      this.containerName,
      blobName,
      fileSizeBytes,
      mimeType
    );
    //this.blobServiceClient
    return new AuthHeader().generateFromRequest(blobRequest,this.accountName, this.accountKey);

  }
  public generateSharedKeyLite(blobName:string,fileSizeBytes:number,mimeType:string):string{
    var blobRequest = (new BlobRequest()).createRequestLite(
      this.accountName,
      this.containerName,
      blobName,
      fileSizeBytes,
      mimeType
    );
    


    //this.blobServiceClient
    return new AuthHeader().generateFromRequestLite(blobRequest,this.accountName, this.accountKey);

  }
/*


    var webResource = new WebResource();
    webResource.method = 'PUT';
    webResource.url = `https://${this.containerName}.blob.core.windows.net/${blobName}`;
    webResource.withCredentials = true;

    



    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
   // var xp = new StorageSharedKeyCredentialPolicy(this.tryGetEnvVar(this.containerName), this.tryGetEnvVar(this.blobConnectionString));
   // containerClient.generateSasUrl(blobName, {})
   //var y = new StorageSharedKeyCredentialPolicy()
    var credential = new StorageSharedKeyCredential('accountName', 'accountKey');
    credential.create()

    //x.computeHMACSHA256(blobName);





  public async generateSasToken(blobName:string):string{

    const options: BlobGenerateSasUrlOptions = {
      startsOn: moment().subtract(5, 'minutes').toDate(),
      expiresOn:  moment().add(20, 'minutes').toDate(),
      permissions: BlobSASPermissions.parse('w')
    };

    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    const sasToken = await blobClient.generateSasUrl(options)
    return sasToken;
  }
  

  public createFileHeader(contentLength:number):string{
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blobClient = containerClient.getBlobClient(nanoid());
    blobClient.create(contentLength);
    

    
  }
    */
  
}