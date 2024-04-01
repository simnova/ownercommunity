import internal from 'stream';
import { BlobUploadCommonResponse } from '@azure/storage-blob';
import { BlobRequestSettings, FileInfo } from '../../../../../seedwork/services-seedwork-blob-storage-interfaces';


export interface BlobStorageDomain {
  deleteBlob(blobName: string, containerName: string): Promise<void>;
  createTextBlob(blobName: string, containerName: string, text: string, contentType?: string): Promise<void>;
  createContainer(containerName: string, allowPublicAccess?: boolean): Promise<void>;
  listBlobs(containerName: string, path?: string): Promise<FileInfo[]>;
  generateReadSasToken(blobName: string, containerName: string, minutesUntilExpiration: number): Promise<string>;
  generateSharedKey(blobName: string, fileSizeBytes: number, requestDate: string, mimeType: string, containerName: string): string;
  generateSharedKeyWithOptions(blobName: string, containerName: string, requestDate: string, requestSettings: BlobRequestSettings): string;
  generateSharedKeyLite(blobName: string, mimeType: string, containerName: string): string;
  writeStreamToBlob(blobName: string, containerName: string, stream: internal.Readable, contentType: string): Promise<BlobUploadCommonResponse>;
  readStreamFromBlob(blobName: string, containerName: string): Promise<NodeJS.ReadableStream>;
}

export interface BlobStorageDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}