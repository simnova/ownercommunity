import { ContentModeratorClient } from '@azure/cognitiveservices-contentmoderator';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';

export enum ModeratedContentType {
  PlainText = "text/plain",
  HTML = "text/html",
  Markdown = "text/markdown",
  XML = "text/xml",
}

export interface BatchModerationResult {
  batchApproved: boolean;
  failedKey: string;
}

export interface ModerationResult {
  IsApproved: boolean;
}
export interface IContentModerator {
  moderateText(text: string, contentType: ModeratedContentType): Promise<ModerationResult>;
}

export class ContentModerator implements IContentModerator {
  private client: ContentModeratorClient;

  tryGetEnvVar(envVar:string):string{
    const value = process.env[envVar];
    if(value === undefined){
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  constructor(endpoint:string, subscriptionKey:string){
    const credentials = new CognitiveServicesCredentials(subscriptionKey);
    this.client = new ContentModeratorClient(credentials, endpoint);
  }

  public async moderateText(textToModerate:string, contentType: ModeratedContentType):Promise<ModerationResult>{
    console.log(`Moderating text: ${textToModerate}`);
    return this.client
      .textModeration
      .screenText(contentType, textToModerate, {
        language: "eng",
        autocorrect: false,
        pII: false,
        classify: true
      })
      .then(result => {
        console.log(`Moderation result: ${JSON.stringify(result)}`);
        return {
          IsApproved: !result.classification.reviewRecommended
          }
      });
  }

   public async moderateContentBatch(contentWithKeys: Map<string, string>): Promise<BatchModerationResult> {
    for (let key in contentWithKeys) {
      let textToModerate = contentWithKeys[key];
      if (textToModerate.trim().length == 0) {
        continue; // skip empty content
      }
      let result = await this.moderateText(textToModerate, ModeratedContentType.PlainText);
      if (!result.IsApproved) {
        return {batchApproved:false, failedKey:key} as BatchModerationResult;
      }
    }
    return {batchApproved:true, failedKey:''} as BatchModerationResult;
  }
  
}