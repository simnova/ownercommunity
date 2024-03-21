
## Client-Side Uploads

End users upload files directly to the blob storage account.

This application leverages server side generation of shared keys, allowing the end user to upload directly to the blob storage account.

The UI sends document metadata to the server for verification of file size and type, and then embeds these values into the shared key. If the end user attempts to upload a file that is too large, or of the wrong type, the upload will fail. 


Code:
- ./auth-header.ts
- ./blob-request.ts

Resources:
- [Microsoft Shared Key Documentation](https://learn.microsoft.com/en-us/rest/api/storageservices/authorize-with-shared-key)

## Securely Downloading Files



## Server-Side Blob Storage Interactions

Other interactions with blob storage are done through the Azure SDK for Javascript.

Resources: 
- [Azure Storage Overview ](https://learn.microsoft.com/en-us/azure/storage/blobs/)
- [Microsoft Azure Storage SDK for Javascript](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/blobserviceclient?view=azure-node-latest)
- [Microsoft Azure Storage Blob Library](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-storage-blob/latest/index.html)
- [Microsoft Rest API - Blob Storage](https://learn.microsoft.com/en-us/rest/api/storageservices)