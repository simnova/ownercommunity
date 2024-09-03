import { BlobRequestSettings } from "../../../../framework/seedwork/services-seedwork-blob-storage-interfaces";
import { BlobDataSource } from "../../data-sources/blob-data-source";
import { MemberConverter } from "../../external-dependencies/domain";
import { MutationStatus, MemberAvatarImageAuthHeaderResult, BlobAuthHeader } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../../../framework/app/app-context-builder";

export interface MemberBlobApi {
  memberProfileAvatarRemove(memberId: string): Promise<MutationStatus>;
  memberProfileAvatarCreateAuthHeader(memberId: string, fileName: string, contentType: string, contentLength: number): Promise<MemberAvatarImageAuthHeaderResult>;
}

export class MemberBlobApiImpl
  extends BlobDataSource<AppContext>
  implements MemberBlobApi {
  async memberProfileAvatarRemove(memberId: string): Promise<MutationStatus> {
    let mutationResult: MutationStatus;
    await this.withStorage(async (passport, blobStorage) => {
      let member = await this.context.applicationServices.member.dataApi.getMemberByIdWithCommunity(memberId);
      if (!member) {
        mutationResult = { success: false, errorMessage: `Member not found: ${memberId}` } as MutationStatus;
      }
      let memberDo = new MemberConverter().toDomain(member, { domainVisa: passport.domainVisa });
      if (!passport.domainVisa
        .forMember(memberDo)
        .determineIf((permissions) => (permissions.canEditOwnMemberAccounts && permissions.isEditingOwnMemberAccount) || permissions.canManageMembers)) {
        mutationResult = { success: false, errorMessage: `User does not have permission to remove avatar for member: ${memberId}` } as MutationStatus;
        return;
      }
      await blobStorage.deleteBlob(member.profile.avatarDocumentId, member.community.id);
      mutationResult = { success: true } as MutationStatus;
    });
    return mutationResult;
  }

  async memberProfileAvatarCreateAuthHeader(memberId: string, fileName: string, contentType: string, contentLength: number): Promise<MemberAvatarImageAuthHeaderResult> {
    const blobContainerName = this.context.community?.id;
    const blobDataStorageAccountName = process.env.BLOB_ACCOUNT_NAME;

    let headerResult: MemberAvatarImageAuthHeaderResult;
    await this.withStorage(async (passport, blobStorage) => {
      let member = await this.context.applicationServices.member.dataApi.getMemberByIdWithCommunity(memberId);
      if (!member) {
        headerResult = { status: { success: false, errorMessage: `Member not found: ${memberId}` } } as MemberAvatarImageAuthHeaderResult;
        return;
      }
      let memberDo = new MemberConverter().toDomain(member, { domainVisa: passport.domainVisa });
      if (!passport.domainVisa
        .forMember(memberDo)
        .determineIf((permissions) => (permissions.canEditOwnMemberAccounts && permissions.isEditingOwnMemberAccount) || permissions.canManageMembers)) {
        headerResult = {
          status: { success: false, errorMessage: `User does not have permission to update avatar for member: ${memberId}` },
        } as MemberAvatarImageAuthHeaderResult;
        return;
      }

      const maxSizeMb = 10;
      const maxSizeBytes = maxSizeMb * 1024 * 1024;
      const permittedContentTypes = ['image/jpeg', 'image/png', 'image/gif', 'text/plain', 'text/json', 'application/json'];
      if (!permittedContentTypes.includes(contentType)) {
        headerResult = { status: { success: false, errorMessage: 'Content type not permitted.' } } as MemberAvatarImageAuthHeaderResult;
        return;
      }
      if (contentLength > maxSizeBytes) {
        headerResult = { status: { success: false, errorMessage: 'Content length exceeds permitted limit.' } } as MemberAvatarImageAuthHeaderResult;
        return;
      }

      let name: string = this.context.verifiedUser?.verifiedJWT?.name;

      const indexFields: Record<string, string> = {
        communityId: this.context?.community?.id, 
        transmissionStatus: 'pending', //always pending when uploading
        documentVersion: 'current',
        createdDate: new Date().toISOString(),
        uploadedByType: this.context?.verifiedUser?.openIdConfigKey,
      };

      const metadataFields: Record<string, string> = {
        uploaded_by_name: name,
        document_name: fileName,
      };

      const indexKeyValues = Object.entries(indexFields).map(([name, value]) => ({
        name,
        value,
      }));

      const metadataKeyValues = Object.entries(metadataFields).map(([name, value]) => ({
        name,
        value,
      }));

      const blobName = `profile/${member.id}/avatar`;
      const blobPath = `https://${blobDataStorageAccountName}.blob.core.windows.net/${blobContainerName}/${blobName}`;
      const requestDate = new Date().toUTCString();

      const blobRequestSettings: BlobRequestSettings = {
        fileSizeBytes: contentLength,
        mimeType: contentType,
        tags: indexFields,
        metadata: metadataFields,
      };

      const authHeader = blobStorage.generateSharedKeyWithOptions(blobName, blobContainerName, requestDate, blobRequestSettings);
      console.log(`authHeader: ${authHeader}`);
      headerResult = {
        status: { success: true },
        authHeader: { authHeader: authHeader, requestDate: requestDate, indexTags: indexKeyValues, metadataFields: metadataKeyValues, blobPath, blobName } as BlobAuthHeader,
      } as MemberAvatarImageAuthHeaderResult;
    });
    return headerResult;
  }
}
