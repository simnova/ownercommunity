import { AzBlobStorage } from "../../../../seedwork/services-seedwork-blob-storage-az";
import { BlobStorageInfrastructureService } from "../../../app/infrastructure-services/blob-storage";

export class AzBlobStorageImpl extends AzBlobStorage implements BlobStorageInfrastructureService {
   
  constructor(accountName: string, accountKey: string) {
      super(accountName,  accountKey);
  }

  startup = async (): Promise<void> => {
    console.log('custom-log | AzBlobStorageImpl | startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('custom-log | AzBlobStorageImpl | shutdown');
  }
}
