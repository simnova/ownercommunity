import { BlobStorageDomain, BlobStorageDomainInitializeable } from "../../domain/infrastructure/blob-storage/interfaces";

export interface BlobStorageInfrastructure extends BlobStorageDomain, BlobStorageDomainInitializeable {}