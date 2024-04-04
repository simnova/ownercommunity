import { AppContext } from '../../app/app-context';
import { MutationStatus } from '../../app/application-services/blob-storage/_base.interfaces';
import { BlobStorageApplicationServiceImpl } from './_blob-storage.application-service';
import { BlobAuthHeader, BlobRequestSettings } from '../../../seedwork/services-seedwork-blob-storage-interfaces';
import { MemberAvatarImageAuthHeaderResult } from '../../app/application-services/blob-storage/member.interface';
import { MemberEntityReference } from '../../app/domain/contexts/community/member';

export class MemberBlobStorageApplicationServiceImpl extends BlobStorageApplicationServiceImpl<AppContext> {
  async memberProfileAvatarRemove(memberId: string): Promise<MutationStatus> {
    let mutationResult: MutationStatus;
    await this.withStorage(async (passport, blobStorage) => {
      let member = await (await this.context.applicationServices.memberDataApi.getMemberByIdWithCommunity(memberId));
      if (!member) {
        mutationResult = { success: false, errorMessage: `Member not found: ${memberId}` } as MutationStatus;
      }
      let memberDo = member as unknown as MemberEntityReference; // [MG-TBD] remove unknown //new MemberConverter().toDomain(member, { passport: passport });
      if (
        !passport
          .forMember(memberDo)
          .determineIf((permissions) => (permissions.canEditOwnMemberAccounts && permissions.isEditingOwnMemberAccount) || permissions.canManageMembers)
      ) {
        mutationResult = { success: false, errorMessage: `User does not have permission to remove avatar for member: ${memberId}` } as MutationStatus;
        return;
      }
      const communityId = typeof member.community === 'string' ? member.community : member.community.id;
      await blobStorage.deleteBlob(member.profile.avatarDocumentId, communityId);
      mutationResult = { success: true } as MutationStatus;
    });
    return mutationResult;
  }

  async memberProfileAvatarCreateAuthHeader(memberId: string, fileName: string, contentType: string, contentLength: number): Promise<MemberAvatarImageAuthHeaderResult> {
    const blobContainerName = this.context.communityId;
    const blobDataStorageAccountName = process.env.BLOB_ACCOUNT_NAME;

    let headerResult: MemberAvatarImageAuthHeaderResult;
    await this.withStorage(async (passport, blobStorage) => {
      let member = await (await this.context.applicationServices.memberDataApi.getMemberByIdWithCommunity(memberId));
      if (!member) {
        headerResult = { status: { success: false, errorMessage: `Member not found: ${memberId}` } } as MemberAvatarImageAuthHeaderResult;
        return;
      }
      let memberDo = member as unknown as MemberEntityReference; // [MG-TBD] - remove unknown //new MemberConverter().toDomain(member, { passport: passport });
      if (
        !passport
          .forMember(memberDo)
          .determineIf((permissions) => (permissions.canEditOwnMemberAccounts && permissions.isEditingOwnMemberAccount) || permissions.canManageMembers)
      ) {
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
        communityId: this.context?.communityId, 
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
      }

      const authHeader = blobStorage.generateSharedKeyWithOptions(blobName, blobContainerName, requestDate, blobRequestSettings);
      console.log(`authHeader: ${authHeader}`)
      headerResult = {
        status: { success: true },
        authHeader: { authHeader: authHeader, requestDate: requestDate, indexTags: indexKeyValues, metadataFields: metadataKeyValues, blobPath, blobName } as BlobAuthHeader,
      } as MemberAvatarImageAuthHeaderResult;
    });
    return headerResult;
  }
}
