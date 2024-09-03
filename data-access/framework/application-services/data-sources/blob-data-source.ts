import { AppContext } from "@framework/main/app-context-builder";
import { Passport } from "@framework/main/passport";
import { DataSource } from "library/data-source-seedwork/data-source";
import { BlobStorageInfrastructureService } from "library/services-seedwork-blob-storage-interfaces";


export class BlobDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withStorage(func: (passport: Passport, blobStorage: BlobStorageInfrastructureService) => Promise<void>): Promise<void> {
    let passport = this._context.passport;
    let blobStorage = this._context.infrastructureServices.blobStorage;
    await func(passport, blobStorage);
  }
}
