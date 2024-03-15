import { IServices } from '../../domain/event-handlers/IServices';
import { ContentModerator, IContentModerator } from './content-moderator';
import { Vercel, IVercel } from './vercel';
import { CognitiveSearch, ICognitiveSearch } from './cognitive-search';
import { BlobStorage, IBlobStorage } from './blob-storage';
import { CommunityUnitOfWork } from '../../domain/contexts/community/community.uow';
import { MongoCommunityUnitOfWork } from '../../domain-impl-mongo/community.mongo-uow';
import { MemberUnitOfWork } from '../../domain/contexts/community/member.uow';
import { MongoMemberUnitOfWork } from '../../domain-impl-mongo/member.mongo-uow';
import { RoleUnitOfWork } from '../../domain/contexts/community/role.uow';
import { MongoRoleUnitOfWork } from '../../domain-impl-mongo/role.mongo-uow';
export class Services implements IServices{
  private _vercel: IVercel;
  private _contentModerator: IContentModerator;
  private _cognitiveSearch: ICognitiveSearch;
  private _blobStorage: IBlobStorage;
  private _communityUnitOfWork: CommunityUnitOfWork;
  private _memberUnitOfWork: MemberUnitOfWork;
  private _roleUnitOfWork: RoleUnitOfWork;

  constructor() {
    this._vercel = this.InitVercel();
    this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = this.InitCognitiveSearch();
    this._blobStorage = this.InitBlobStorage();
    this._communityUnitOfWork = this.InitCommunityUnitOfWork();
    this._memberUnitOfWork = this.InitMemberUnitOfWork();
    this._roleUnitOfWork = this.InitRoleUnitOfWork();
  }

  public get vercel(): IVercel {
    return this._vercel;
  }
  public get contentModerator(): IContentModerator {
    return this._contentModerator;
  }
  public get cognitiveSearch(): ICognitiveSearch {
    return this._cognitiveSearch;
  }
  public get blobStorage(): IBlobStorage {
    return this._blobStorage;
  }

  public get communityUnitOfWork(): CommunityUnitOfWork {
    return this._communityUnitOfWork;
  }

  public get memberUnitOfWork(): MemberUnitOfWork {
    return this._memberUnitOfWork;
  }

  public get roleUnitOfWork(): RoleUnitOfWork {
    return this._roleUnitOfWork;
  }

  private tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  private InitContentModerator(): IContentModerator {
    const subscriptionKey = this.tryGetEnvVar('CONTENT_MODERATOR_SUBSCRIPTION_KEY');
    const endpoint = this.tryGetEnvVar('CONTENT_MODERATOR_ENDPOINT');
    return new ContentModerator(endpoint, subscriptionKey);
  }

  private InitVercel(): IVercel {
    const vercelToken = this.tryGetEnvVar('VERCEL_TOKEN');
    const vercelProject = this.tryGetEnvVar('VERCEL_PROJECT');
    return new Vercel(vercelToken, vercelProject);
  }

  private InitCognitiveSearch(): ICognitiveSearch {
    const searchKey = this.tryGetEnvVar('SEARCH_API_KEY');
    const endpoint = this.tryGetEnvVar('SEARCH_API_ENDPOINT');
    return new CognitiveSearch(searchKey, endpoint);
  }

  private InitBlobStorage(): IBlobStorage {
    const storageAccount = this.tryGetEnvVar('BLOB_ACCOUNT_NAME');
    const storageKey = this.tryGetEnvVar('BLOB_ACCOUNT_KEY');
    return new BlobStorage(storageAccount, storageKey);
  }

  private InitCommunityUnitOfWork(): CommunityUnitOfWork {
    return MongoCommunityUnitOfWork;
  }

  private InitMemberUnitOfWork(): MemberUnitOfWork {
    return MongoMemberUnitOfWork;
  }

  private InitRoleUnitOfWork(): RoleUnitOfWork {
    return MongoRoleUnitOfWork;
  }
}
