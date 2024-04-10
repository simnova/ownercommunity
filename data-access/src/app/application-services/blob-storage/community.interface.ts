import { FileInfo, CommunityBlobContentAuthHeaderResult } from "../../external-dependencies/graphql-api";

export interface CommunityBlobStorageApplicationService {
  communityPublicFilesList(communityId: string): Promise<FileInfo[]>;
  communityPublicFilesListByType(communityId: string, type: string): Promise<FileInfo[]>;
  communityPublicFileCreateAuthHeader(communityId: string, fileName: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult>;
  communityPublicFileRemove(communityId: string, fileName: string): Promise<void>;
  communityPublicContentCreateAuthHeader(communityId: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult>;
}