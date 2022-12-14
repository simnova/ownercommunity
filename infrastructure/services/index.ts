import { ContentModerator, IContentModerator } from './content-moderator';
import { Vercel, IVercel } from './vercel';
import { CognitiveSearch, ICognitiveSearch } from './cognitive-search';
import { BlobStorage, IBlobStorage } from './blob-storage';

export class Services {
  private _vercel: IVercel;
  private _contentModerator: IContentModerator;
  private _cognitiveSearch: ICognitiveSearch;
  private _blobStorage: IBlobStorage;

  constructor() {
    this._vercel = this.InitVercel();
    this._contentModerator = this.InitContentModerator();
    this._cognitiveSearch = this.InitCognitiveSearch();
    this._blobStorage = this.InitBlobStorage();
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
}
