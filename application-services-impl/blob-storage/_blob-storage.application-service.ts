import { BaseApplicationService, BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { Passport } from '../../domain/contexts/iam/passport';
import { BlobStorageInfrastructureService } from '../../infrastructure-services/blob-storage';

export class BlobStorageApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> extends BaseApplicationService<Context> {

  public async withStorage(func: (passport: Passport, blobStorage: BlobStorageInfrastructureService) => Promise<void>): Promise<void> {
    await func(
      this._context.passport, 
      this._context.infrastructureServices.blobStorage
    );
  }
}
