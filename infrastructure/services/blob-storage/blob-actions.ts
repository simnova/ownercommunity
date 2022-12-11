import { BlobGenerateSasUrlOptions, BlobSASPermissions, BlobServiceClient, BlockBlobClient, ContainerCreateOptions, ContainerListBlobsOptions, StorageSharedKeyCredential, PublicAccessType } from '@azure/storage-blob';

export interface FileInfo { 
  name: string;
  url: string;
  size?: number;
  type?: string;
  tags?: Record<string,string>;
}

export class BlobActions {
  public generateReadSasToken = async (blobName: string, containerName: string, minutesUntilExpiration: number): Promise<string> => {
    var blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + containerName + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);

    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + minutesUntilExpiration);

    const permissions = new BlobSASPermissions();
    permissions.read = true;

    var options : BlobGenerateSasUrlOptions = {
      startsOn: startDate,
      expiresOn: expiryDate,
      permissions: permissions
    };

    return blobClient.generateSasUrl(options);
  }



  private readonly sharedKeyCredential:StorageSharedKeyCredential;
  public constructor(private accountName: string, private accountKey: string) {
    this.sharedKeyCredential = new StorageSharedKeyCredential(this.accountName, this.accountKey)
  }


  public listBlobs = async (containerName: string, path: string): Promise<FileInfo[]> => {
    const blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net/`, this.sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const options: ContainerListBlobsOptions = {
      prefix: path,
      includeMetadata: true,
      includeTags: true,
    };

    let blobList: FileInfo[] = [];
    for await (const blob of containerClient.listBlobsFlat(options)) {
      blobList.push({
        name: blob.name,
        url: `https://${this.accountName}.blob.core.windows.net/${containerName}/${blob.name}`,
        size: blob.properties.contentLength,
        type: blob.properties.contentType,
        tags: blob.tags,
      });
    }
    return blobList;
  }

  public deleteBlob = async (blobName:string, container:string) =>{
    var blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + container + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);
    await blobClient.delete();
  }
  public createTextBlob = async (blobName:string, container:string, text:string) =>{
    var blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + container + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);
    await blobClient.upload(text, text.length);
  }


  public createContainer = async (container:string, allowPublicAccess:boolean) =>{
    const blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net/`, this.sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(container);

    var options:ContainerCreateOptions = {}
    if(allowPublicAccess){
      options.access = ('blob' as PublicAccessType);
    }

    await containerClient.create(options);
  }
}