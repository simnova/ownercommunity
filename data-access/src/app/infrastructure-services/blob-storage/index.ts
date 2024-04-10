import { BlobStorageDomain, BlobStorageDomainInitializeable } from "../../domain/infrastructure/blob-storage/interfaces";

export interface BlobStorageInfrastructureService extends BlobStorageDomain, BlobStorageDomainInitializeable {}