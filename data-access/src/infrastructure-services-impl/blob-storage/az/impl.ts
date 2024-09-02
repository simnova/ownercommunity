import { AzBlobStorage } from "../../../../seedwork/services-seedwork-blob-storage-az";
import { BlobStorageInfrastructureService } from "../../../../framework/infrastructure-services/blob-storage.infra.interface";

export class AzBlobStorageImpl extends AzBlobStorage implements BlobStorageInfrastructureService {
   
  constructor(accountName: string, accountKey: string) {
      super(accountName,  accountKey);
  }

  startup = async (): Promise<void> => {
    console.log('AzBlobStorageImpl startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('AzBlobStorageImpl shutdown');
  }
}
