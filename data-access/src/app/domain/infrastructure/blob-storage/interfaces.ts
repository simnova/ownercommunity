import { BlobStorageBase } from '../../../../../seedwork/services-seedwork-blob-storage-interfaces';

export interface BlobStorageDomain extends BlobStorageBase {}

export interface BlobStorageDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}
