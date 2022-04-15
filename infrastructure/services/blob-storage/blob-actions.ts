import { BlobServiceClient, BlockBlobClient, ContainerCreateOptions, StorageSharedKeyCredential } from '@azure/storage-blob';

export class BlobActions {
  private readonly sharedKeyCredential:StorageSharedKeyCredential;
  public constructor(private accountName: string, private accountKey: string) {
    this.sharedKeyCredential = new StorageSharedKeyCredential(this.accountName, this.accountKey)
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

  public createContainer = async (container:string) =>{
    const blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net/`, this.sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(container);
    var options:ContainerCreateOptions = {
      
    }
    options.access = 'blob';
    await containerClient.create({ access: 'blob' });
  }
}