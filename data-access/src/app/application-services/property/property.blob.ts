import { nanoid } from "nanoid";
import { BlobRequestSettings } from "../../../../seedwork/services-seedwork-blob-storage-interfaces";
import { BlobDataSource } from "../../data-sources/blob-data-source";
import { PropertyConverter } from "../../external-dependencies/domain";
import { MutationStatus, PropertyBlobFileAuthHeaderResult } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../init/app-context-builder";

export interface PropertyBlobApi {
  propertyPublicFileRemove(propertyId: string,memberId: string, fileName: string): Promise<void>;
  propertyListingImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult>;
  propertyFloorPlanImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult>;
  propertyListingImageRemove(propertyId: string, memberId: string, blobName: string): Promise<MutationStatus>;
}

interface FileInfo {
  fileName: string;
  contentType: string;
  contentLength: number;
  maxSizeBytes: number;
}

export class PropertyBlobApiImpl extends BlobDataSource<AppContext> implements PropertyBlobApi {
  public async propertyPublicFileRemove(propertyId: string, memberId: string, fileName: string): Promise<void> {
    const blobName = `public-files/${fileName}`;
    await this.withStorage(async (passport, blobStorage, auditContext) => {
      let property = await this.context.applicationServices.property.dataApi.getPropertyByIdWithCommunityOwner(propertyId);
      if (!property) {
        return;
      }
      let propertyDO = new PropertyConverter().toDomain(property, {auditContext}, { domainVisa: passport.domainVisa });
      if (!passport.domainVisa.forProperty(propertyDO).determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && propertyDO.owner.id === memberId))) {
        return;
      }
      await blobStorage.deleteBlob(propertyId, blobName);
    });
  }

  public async propertyListingImageCreateAuthHeader(
    propertyId: string,
    fileName: string,
    memberId: string,
    contentType: string,
    contentLength: number
  ): Promise<PropertyBlobFileAuthHeaderResult> {
    const maxSizeMb = 10;
    const maxSizeBytes = maxSizeMb * 1024 * 1024;
    const permittedContentTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const blobName = `property/${propertyId}/listing-images/${nanoid()}`;
    return this.getHeader(propertyId, memberId, permittedContentTypes, blobName, {
      fileName: fileName,
      contentType: contentType,
      contentLength: contentLength,
      maxSizeBytes: maxSizeBytes,
    });
  }

  public async propertyFloorPlanImageCreateAuthHeader(
    propertyId: string,
    fileName: string,
    memberId: string,
    contentType: string,
    contentLength: number
  ): Promise<PropertyBlobFileAuthHeaderResult> {
    const maxSizeMb = 10;
    const maxSizeBytes = maxSizeMb * 1024 * 1024;
    const permittedContentTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const blobName = `property/${propertyId}/listing-floor-plan-images/${nanoid()}`;
    return this.getHeader(propertyId, memberId, permittedContentTypes, blobName, {
      fileName: fileName,
      contentType: contentType,
      contentLength: contentLength,
      maxSizeBytes: maxSizeBytes,
    });
  }

  public async propertyListingImageRemove(propertyId: string, memberId: string, blobName: string): Promise<MutationStatus> {
    let mutationResult: MutationStatus;
    await this.withStorage(async (passport, blobStorage, auditContext) => {
      let property = await this.context.applicationServices.property.dataApi.getPropertyByIdWithCommunityOwner(propertyId);
      if (!property) {
        mutationResult = { success: false, errorMessage: `Property not found: ${propertyId}` } as MutationStatus;
        return;
      }
      let propertyDO = new PropertyConverter().toDomain(property, {auditContext}, { domainVisa: passport.domainVisa });
      if (!passport.domainVisa.forProperty(propertyDO).determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && propertyDO.owner.id === memberId))) {
        mutationResult = { success: false, errorMessage: `User does not have permission to remove images from property: ${propertyId}` } as MutationStatus;
        return;
      }
      await blobStorage.deleteBlob(blobName, property.community.id);
      mutationResult = { success: true } as MutationStatus;
    });
    return mutationResult;
  }

  private async getHeader(propertyId: string, memberId: string, permittedContentTypes: string[], blobName: string, fileInfo: FileInfo) {
    let headerResult: PropertyBlobFileAuthHeaderResult;
    const { fileName, contentType, contentLength, maxSizeBytes } = fileInfo;
    await this.withStorage(async (passport, blobStorage, auditContext) => {
      let property = await this.context.applicationServices.property.dataApi.getPropertyByIdWithCommunityOwner(propertyId);
      if (!property) {
        headerResult = { status: { success: false, errorMessage: `Property not found: ${propertyId}` } } as PropertyBlobFileAuthHeaderResult;
        return;
      }

      let propertyDO = new PropertyConverter().toDomain(property, {auditContext}, { domainVisa: passport.domainVisa });

      if (!passport.domainVisa.forProperty(propertyDO).determineIf((permissions) => {
        console.log('canManageProperties', permissions.canManageProperties);
        console.log('canEditOwnProperty', permissions.canEditOwnProperty);
        return permissions.canManageProperties || (permissions.canEditOwnProperty && propertyDO.owner.id === memberId);
      })) {
        headerResult = {
          status: { success: false, errorMessage: `User does not have permission to add images to property: ${propertyId}` },
        } as PropertyBlobFileAuthHeaderResult;
        return;
      }
      if (!permittedContentTypes.includes(contentType)) {
        headerResult = { status: { success: false, errorMessage: 'Content type not permitted.' } } as PropertyBlobFileAuthHeaderResult;
        return;
      }
      if (contentLength > maxSizeBytes) {
        headerResult = { status: { success: false, errorMessage: 'Content length exceeds permitted limit.' } } as PropertyBlobFileAuthHeaderResult;
        return;
      }

      let name: string = this.context.verifiedUser?.verifiedJWT?.name;

      const indexFields: Record<string, string> = {
        propertyId: propertyId,
        transmissionStatus: 'pending', //always pending when uploading
        documentVersion: 'current',
        createdDate: new Date().toISOString(),
        uploadedByType: this.context?.verifiedUser?.openIdConfigKey,
      };

      const metadataFields = {
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

      const blobContainerName = property.community.id;
      const blobDataStorageAccountName = process.env.BLOB_ACCOUNT_NAME;
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
        authHeader: { authHeader: authHeader, requestDate: requestDate, indexTags: indexKeyValues, metadataFields: metadataKeyValues, blobPath, blobName },
      } as PropertyBlobFileAuthHeaderResult;
    });
    return headerResult;
  }
}
