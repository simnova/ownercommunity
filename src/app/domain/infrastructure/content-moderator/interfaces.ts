import { ModeratedContentType, ModerationResult } from "../../../external-dependencies/content-moderator";

export interface ContentModeratorDomain {
  moderateText(text: string, contentType: ModeratedContentType): Promise<ModerationResult>;
}

export interface ContentModeratorDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}