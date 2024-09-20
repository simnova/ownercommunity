import { DataSource } from './data-source';
import { BlobStorageDomain } from '../domain/infrastructure/blob-storage/interfaces';
import { AppContext } from '../init/app-context-builder';
import { Passport } from '../init/passport';
import { AuditContext } from '../init/audit-context';

export class BlobDataSource<Context extends AppContext> extends DataSource<Context> {

  public async withStorage(func: (passport: Passport, blobStorage: BlobStorageDomain, auditContext: AuditContext) => Promise<void>): Promise<void> {
    let passport = this.context.passport;
    let blobStorage = this.context.infrastructureServices.blobStorage;
    let auditContext = this.context.auditContext;
    await func(passport, blobStorage, auditContext);
  }
}
