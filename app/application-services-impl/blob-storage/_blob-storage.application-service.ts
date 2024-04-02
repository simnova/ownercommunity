import { BaseApplicationService, BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { Passport } from '../../core/domain/contexts/iam/passport';
import { BlobStorageInfrastructureService } from '../../core/infrastructure-services/blob-storage';

export class BlobStorageApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> extends BaseApplicationService<Context> {

  public async withStorage(func: (passport: Passport, blobStorage: BlobStorageInfrastructureService) => Promise<void>): Promise<void> {
    await func(
      this.context.passport, 
      this.context.infrastructureServices.blobStorage
    );
  }
}
