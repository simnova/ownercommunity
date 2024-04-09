import { MutationStatus, MemberAvatarImageAuthHeaderResult } from "../../external-dependencies/graphql-api";

export interface MemberBlobStorageApplicationService {
  memberProfileAvatarRemove(memberId: string): Promise<MutationStatus>;
  memberProfileAvatarCreateAuthHeader(memberId: string, fileName: string, contentType: string, contentLength: number): Promise<MemberAvatarImageAuthHeaderResult>;
}