import {
  BlobGenerateSasUrlOptions,
  BlobSASPermissions,
  BlobServiceClient,
  BlockBlobClient,
  ContainerCreateOptions,
  ContainerListBlobsOptions,
  StorageSharedKeyCredential,
  PublicAccessType,
  BlobDownloadResponseParsed,
  RestError,
} from '@azure/storage-blob';
import internal from 'stream';
import { FileInfo } from '../services-seedwork-blob-storage-interfaces';

export class BlobActions {

  private readonly sharedKeyCredential: StorageSharedKeyCredential;

  public constructor(private accountName: string, private accountKey: string) {
    this.sharedKeyCredential = new StorageSharedKeyCredential(this.accountName, this.accountKey);
  }

  public generateReadSasToken = async (blobName: string, containerName: string, minutesUntilExpiration: number): Promise<string> => {
    const blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + containerName + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);

    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + minutesUntilExpiration);

    const permissions = new BlobSASPermissions();
    permissions.read = true;

    const options: BlobGenerateSasUrlOptions = {
      startsOn: startDate,
      expiresOn: expiryDate,
      permissions: permissions,
    };

    return blobClient.generateSasUrl(options);
  };


  /**
   * @param tagQuery
   * example: "@container='mycontainer' AND createDate >  '2021-01-01T00:00:00Z' AND createDate < '2021-01-02T00:00:00Z'"
   
   */
  public  findBlobsByTags = async (tagQuery:string): Promise<FileInfo[]> => {
    const blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net/`, this.sharedKeyCredential);

    let blobList: FileInfo[] = [];
    for await (const blob of blobServiceClient.findBlobsByTags(tagQuery)) {
      blobList.push({ //contentLength and contentType are not available in the findBlobsByTagsResponse https://learn.microsoft.com/en-us/rest/api/storageservices/find-blobs-by-tags
        name: blob.name,
        url: `https://${this.accountName}.blob.core.windows.net/${blob.containerName}/${blob.name}`,
        tags: blob.tags,
      });
    };
    return blobList;
  }

  public listBlobs = async (containerName: string, prefix?: string): Promise<FileInfo[]> => {
    const blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net/`, this.sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const options: ContainerListBlobsOptions = {
      includeMetadata: true,
      includeTags: true,
      
    };
    if(prefix) { options.prefix = prefix; }

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
  };

  public deleteBlob = async (blobName: string, container: string) => {
    const blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + container + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);
    await blobClient.delete();
  };

  public writeStreamToBlob = async (blobName: string, container: string, stream: internal.Readable, contentType:string='application/octet-stream') => {
    const blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + container + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);
    return blobClient.uploadStream(stream, undefined, undefined, { blobHTTPHeaders: { blobContentType: contentType } });
  };

  public readStreamFromBlob = async (blobName: string, container: string, offset?:number, count?:number): Promise<BlobDownloadResponseParsed> => {
    const blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + container + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);
    return blobClient.download(0);
  };

  public createTextBlob = async (blobName: string, container: string, text: string, contentType:string='text/plain') => {
    const blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + container + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);
    const blobResponse = await blobClient.upload(text, text.length, { blobHTTPHeaders: { blobContentType: contentType }, immutabilityPolicy: {expiriesOn: new Date("2030-09-12"), policyMode: 'Locked' }});
    console.log('Blob response: ' + blobResponse);
  };

  public createTextBlobIfNotExistsAndConfirm = async (blobName: string, container: string, text: string, callback: (blobText: string) => boolean, contentType:string='text/plain', tags?: Record<string, string>) => {
    const doesBlobExistCheckTimestamp = new Date();
    const doesBlobExist = await this.checkBlobExists(blobName, container);
    if(doesBlobExist === false) {
      const blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + container + '/' + blobName;
      const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);
      try {
        await blobClient.upload(text, text.length, { blobHTTPHeaders: { blobContentType: contentType }, tags, conditions: { ifUnmodifiedSince: doesBlobExistCheckTimestamp} });
      } catch (error) {
        // [TODO} need to determine the status code of the error that is thrown when the blob already exists so we can log it and discard it
        if (error instanceof RestError) {
          console.log('Error creating blob: ' + error.message);
        } else {
          throw error;
        }
      }
      fetch(blobUrl).then(response => response.text()).then(text => {
        if (callback(text)) {
          console.log('Blob created successfully and the file contents are valid');
        } else {
          console.log('Blob created successfully but the file contents are invalid');
          // [TODO] should at least throw an error at this point to be handled in the calling function
        }
      });
    } else {
      console.log('Blob already exists');
    }
  };

  public checkBlobExists = async (blobName: string, container: string): Promise<boolean> => {
    const blobUrl = 'https://' + this.accountName + '.blob.core.windows.net/' + container + '/' + blobName;
    const blobClient = new BlockBlobClient(blobUrl, this.sharedKeyCredential);
    return blobClient.exists();
  }

  public createContainer = async (container: string, allowPublicAccess: boolean) => {
    const blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net/`, this.sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(container);

    const options: ContainerCreateOptions = {};
    if (allowPublicAccess) {
      options.access = 'blob' as PublicAccessType;
    }

    await containerClient.create(options);
  };
}
