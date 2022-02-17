import { WebResource } from '@azure/storage-blob';
import { HeaderConstants } from './constants';


export class BlobRequest {

  public createRequestLite(accountName:string, containerName:string, blobName: string, fileSizeBytes:number,   mimeType:string='application/octet-stream'): WebResource {
    const webResource = new WebResource();


    // HTTP Headers
    webResource.method = 'PUT';
    webResource.url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    webResource.headers.set(HeaderConstants.CONTENT_TYPE, mimeType);
  //  webResource.headers.set(HeaderConstants.CONTENT_LENGTH, fileSizeBytes);

    // Canocicalized Headers
    webResource.headers.set(HeaderConstants.X_MS_BLOB_TYPE, 'BlockBlob');
    webResource.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());
    webResource.headers.set(HeaderConstants.X_MS_VERSION,'2021-04-10'); //'2014-02-14'); //2014-02-14 requries content-length - we want to restrict the size of the uploaded file
   // webResource.headers.set(HeaderConstants.X, fileSizeBytes);
    // Canocicalized Resource
    webResource.headers.set(accountName, `/${accountName}/${containerName}/${blobName}`);
    
/*
//\nrestype:container\ncomp:block\nblockid:${nanoid()}\nblocklisttype:uncommitted\nblocksize:${fileSizeBytes}\`);
    webResource.headers.set('x-ms-client-request-id', nanoid());
    webResource.headers.set(HeaderConstants.CONTENT_LENGTH, fileSizeBytes);
    webResource.headers.set('x-ms-blob-type', 'BlockBlob');
    webResource.headers.set('x-ms-blob-content-type', 'application/octet-stream');
    webResource.headers.set('x-ms-blob-content-encoding', 'gzip');
    webResource.headers.set('x-ms-blob-content-language', 'en-US');
    webResource.withCredentials = true;

*/
    
    return webResource;
  }

  public createRequest(accountName:string, containerName:string, blobName: string, fileSizeBytes:number,   mimeType:string='application/octet-stream'): WebResource {
    const webResource = new WebResource();


    // HTTP Headers
    webResource.method = 'PUT';
    webResource.url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    webResource.headers.set(HeaderConstants.CONTENT_TYPE, mimeType);
    webResource.headers.set(HeaderConstants.CONTENT_LENGTH, fileSizeBytes);

    // Canocicalized Headers
    webResource.headers.set(HeaderConstants.X_MS_BLOB_TYPE, 'BlockBlob');
    webResource.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());
    webResource.headers.set(HeaderConstants.X_MS_VERSION,'2021-04-10'); //'2014-02-14'); //2014-02-14 requries content-length - we want to restrict the size of the uploaded file
   // webResource.headers.set(HeaderConstants.X, fileSizeBytes);
    // Canocicalized Resource
    webResource.headers.set(accountName, `/${accountName}/${containerName}/${blobName}`);
    
/*
//\nrestype:container\ncomp:block\nblockid:${nanoid()}\nblocklisttype:uncommitted\nblocksize:${fileSizeBytes}\`);
    webResource.headers.set('x-ms-client-request-id', nanoid());
    webResource.headers.set(HeaderConstants.CONTENT_LENGTH, fileSizeBytes);
    webResource.headers.set('x-ms-blob-type', 'BlockBlob');
    webResource.headers.set('x-ms-blob-content-type', 'application/octet-stream');
    webResource.headers.set('x-ms-blob-content-encoding', 'gzip');
    webResource.headers.set('x-ms-blob-content-language', 'en-US');
    webResource.withCredentials = true;

*/
    
    return webResource;
  }


}