import { AzBlobStorage } from "../../../services-seedwork-blob-storage-az";
import { BlobStorageInfrastructure } from "../interfaces";

export class AzBlobStorageImpl extends AzBlobStorage implements BlobStorageInfrastructure {
   
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
