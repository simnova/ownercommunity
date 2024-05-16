import { BlobDataSource } from './blob-data-source';
import { CommunityConverter } from '../../external-dependencies/domain';
import { CommunityBlobContentAuthHeaderResult, FileInfo } from '../../external-dependencies/graphql-api';
import { CommunityBlobApi } from '../../application-services/blob-storage';
import { AppContext } from '../../init/app-context-builder';
import { BlobRequestSettings } from '../../../../seedwork/services-seedwork-blob-storage-interfaces';

export class CommunityBlobApiImpl 
  extends BlobDataSource<AppContext> 
  implements CommunityBlobApi
{
  public async communityPublicFilesList(communityId: string): Promise<FileInfo[]> {
    let result: FileInfo[] = [];
    await this.withStorage(async (passport, blobStorage) => {
      let community = await this.context.applicationServices.communityDataApi.getCommunityById(communityId);
      let communityDO = new CommunityConverter().toDomain(community, { passport: passport });
      if (!passport.forCommunity(communityDO).determineIf((permissions) => permissions.canManageSiteContent)) {
        return;
      }
      try {
        let files = await blobStorage.listBlobs(community.id, 'public-files/');
        result = files.map((file) => {
          return {
            name: file.name,
            url: file.url,
            size: file.size,
            type: file.type,
          } as FileInfo;
        });
      } catch (e) {
        //	BlobNotFound
        return;
      }
    });
    return result;
  }

  public async communityPublicFilesListByType(communityId: string, type: string): Promise<FileInfo[]> {
    let result: FileInfo[] = await this.communityPublicFilesList(communityId);
    return result.filter((file) => file.type.includes(type));
  }

  public async communityPublicFileCreateAuthHeader(
    communityId: string,
    fileName: string,
    contentType: string,
    contentLength: number
  ): Promise<CommunityBlobContentAuthHeaderResult> {
    const maxSizeMb = 10;
    const maxSizeBytes = maxSizeMb * 1024 * 1024;
    const permittedContentTypes = ['image/jpeg', 'image/png', 'image/gif', 'text/plain', 'text/csv', 'application/json', 'application/pdf'];
    const blobName = `public-files/${fileName}`;
    return this.getHeader(communityId, permittedContentTypes, contentType, contentLength, maxSizeBytes, blobName, fileName);
  }

  public async communityPublicFileRemove(communityId: string, fileName: string): Promise<void> {
    const blobName = `public-files/${fileName}`;
    await this.withStorage(async (passport, blobStorage) => {
      let community = await this.context.applicationServices.communityDataApi.getCommunityById(communityId);
      if (!community) {
        return;
      }
      let communityDO = new CommunityConverter().toDomain(community, { passport: passport });
      if (!passport.forCommunity(communityDO).determineIf((permissions) => permissions.canManageSiteContent)) {
        return;
      }
      await blobStorage.deleteBlob(communityId, blobName);
    });
  }

  public async communityPublicContentCreateAuthHeader(communityId: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult> {
    const maxSizeMb = 10;
    const maxSizeBytes = maxSizeMb * 1024 * 1024;
    const permittedContentTypes = ['image/jpeg', 'image/png', 'image/gif', 'text/plain', 'text/json', 'application/json'];
    const blobName = 'website-root';
    return this.getHeader(communityId, permittedContentTypes, contentType, contentLength, maxSizeBytes, blobName);
  }

  private async getHeader(
    communityId: string,
    permittedContentTypes: string[],
    contentType: string,
    contentLength: number,
    maxSizeBytes: number,
    blobName: string,
    fileName?: string
  ) {
    let headerResult: CommunityBlobContentAuthHeaderResult;
    await this.withStorage(async (passport, blobStorage) => {
      let community = await this.context.applicationServices.communityDataApi.getCommunityById(communityId);
      if (!community) {
        headerResult = { status: { success: false, errorMessage: `Community not found: ${communityId}` } } as CommunityBlobContentAuthHeaderResult;
        return;
      }
      let communityDO = new CommunityConverter().toDomain(community, { passport: passport });
      if (!passport.forCommunity(communityDO).determineIf((permissions) => permissions.canManageSiteContent)) {
        headerResult = {
          status: { success: false, errorMessage: `User does not have permission to create content for community: ${communityId}` },
        } as CommunityBlobContentAuthHeaderResult;
        return;
      }
      if (!permittedContentTypes.includes(contentType)) {
        headerResult = { status: { success: false, errorMessage: 'Content type not permitted.' } } as CommunityBlobContentAuthHeaderResult;
        return;
      }
      if (contentLength > maxSizeBytes) {
        headerResult = { status: { success: false, errorMessage: 'Content length exceeds permitted limit.' } } as CommunityBlobContentAuthHeaderResult;
        return;
      }

      let name = this.context.verifiedUser?.verifiedJWT?.name;

      const indexFields: Record<string, string> = {
        communityId: communityId,
        transmissionStatus: 'pending', //always pending when uploading
        documentVersion: 'current',
        createdDate: new Date().toISOString(),
        uploadedByType: this.context?.verifiedUser?.openIdConfigKey,
      };

      let metadataFields: Record<string, string> = {
        uploaded_by_name: name,
      };

      if (fileName) {
        metadataFields = {
          ...metadataFields,
          document_name: fileName,
        };
      }

      const indexKeyValues = Object.entries(indexFields).map(([name, value]) => ({
        name,
        value,
      }));

      const metadataKeyValues = Object.entries(metadataFields).map(([name, value]) => ({
        name,
        value,
      }));

      const blobContainerName = community.id;
      const blobDataStorageAccountName = process.env.BLOB_ACCOUNT_NAME;

      const currentTime = new Date().getTime();
      const blobPath = `https://${blobDataStorageAccountName}.blob.core.windows.net/${blobContainerName}/${blobName}`;
      const requestDate = new Date(currentTime).toUTCString();

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
        authHeader: { authHeader: authHeader, requestDate: requestDate, indexTags: indexKeyValues, metadataFields: metadataKeyValues, blobPath, blobName },
      } as CommunityBlobContentAuthHeaderResult;
    });
    return headerResult;
  }
}
