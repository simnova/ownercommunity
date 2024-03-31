import { CommunityDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/community";
import { RoleDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/role";
import { BlobAuthHeader, FileInfo } from "../../../../seedwork/services-seedwork-blob-storage-interfaces";
import { MutationStatus } from "./_base.interfaces";

export interface CommunityBlobStorageApplicationService {
  communityPublicFilesList(communityId: string): Promise<FileInfo[]>;
  communityPublicFilesListByType(communityId: string, type: string): Promise<FileInfo[]>;
  communityPublicFileCreateAuthHeader(communityId: string, fileName: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult>;
  communityPublicFileRemove(communityId: string, fileName: string): Promise<void>;
  communityPublicContentCreateAuthHeader(communityId: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult>;
}

export type CommunityBlobContentAuthHeaderResult = {
  authHeader?: BlobAuthHeader;
  community?: Community;
  status: MutationStatus;
};



export type Community = CommunityDataStructure & {
  domainStatus?: CommunityDomainResult;
  files?: FileInfo[];
  filesByType?: FileInfo[];
  publicContentBlobUrl?: string;
  roles?: RoleDataStructure[];
  userIsAdmin?: boolean;
};


export type CommunityDomainResult = {
  verification?: CommunityDomainVerificationDetail[];
  verified?: boolean;
};

export type CommunityDomainVerificationDetail = {
  domain?: string;
  reason?: string;
  type?: string;
  value?: string;
};