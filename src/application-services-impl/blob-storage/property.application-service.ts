import { AppContext } from '../../app/app-context';
import { MutationStatus,  } from '../../app/application-services/blob-storage/_base.interfaces';
import { PropertyBlobFileAuthHeaderResult } from '../../app/application-services/blob-storage/property.interface';
import { nanoid } from 'nanoid';
import { BlobStorageApplicationServiceImpl } from './_blob-storage.application-service';
import { BlobRequestSettings } from '../../../seedwork/services-seedwork-blob-storage-interfaces';
import { PropertyEntityReference } from '../../app/domain/contexts/property/property';

interface FileInfo {
	fileName: string;
	contentType: string;
	contentLength: number;
	maxSizeBytes: number;
}

export class PropertyBlobStorageApplicationServiceImpl extends BlobStorageApplicationServiceImpl<AppContext> {

	public async propertyPublicFileRemove(propertyId: string,memberId: string, fileName: string): Promise<void> {
		const blobName = `public-files/${fileName}`;
		await this.withStorage(async (passport, blobStorage) => {
			let property = await(await this.context.applicationServices.propertyDataApi.getPropertyByIdWithCommunityOwner(propertyId));
			if (!property) {
				return;
			}
			let propertyDO = property as unknown as PropertyEntityReference; // [MG-TBD] remove unknown // new PropertyConverter().toDomain(property, { passport: passport });
			if (!passport.forProperty(propertyDO).determineIf((permissions) => permissions.canManageProperties || permissions.canEditOwnProperty && propertyDO.owner.id === memberId)) {
				return;
			}
			await blobStorage.deleteBlob(propertyId, blobName);
		});
	}

	public async propertyListingImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult> {
		const maxSizeMb = 10;
		const maxSizeBytes = maxSizeMb * 1024 * 1024;
		const permittedContentTypes = [
				'image/jpeg',
				'image/png',
				'image/gif',
		];
		const blobName = `property/${propertyId}/listing-images/${nanoid()}`;
		return this.getHeader(propertyId, memberId, permittedContentTypes, blobName, {
			fileName: fileName,
			contentType: contentType,
			contentLength: contentLength,
			maxSizeBytes: maxSizeBytes
		});
	}

	public async propertyFloorPlanImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult> {
		const maxSizeMb = 10;
		const maxSizeBytes = maxSizeMb * 1024 * 1024;
		const permittedContentTypes = [
				'image/jpeg',
				'image/png',
				'image/gif',
		];
		const blobName = `property/${propertyId}/listing-floor-plan-images/${nanoid()}`;
		return this.getHeader(propertyId, memberId, permittedContentTypes, blobName, {
			fileName: fileName,
			contentType: contentType,
			contentLength: contentLength,
			maxSizeBytes: maxSizeBytes
		});
	}

	public async propertyListingImageRemove(propertyId: string, memberId: string, blobName: string): Promise<MutationStatus> {
		let mutationResult: MutationStatus;
		await this.withStorage(async (passport, blobStorage) => {
			let property = await (await this.context.applicationServices.propertyDataApi.getPropertyByIdWithCommunityOwner(propertyId));
			if (!property) {
				mutationResult = { success: false, errorMessage: `Property not found: ${propertyId}` } as MutationStatus;
				return;
			}
			let propertyDO = property as unknown as PropertyEntityReference; // [MG-TBD] remove unknown //new PropertyConverter().toDomain(property, { passport: passport });
			if (
				!passport
					.forProperty(propertyDO)
					.determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && propertyDO.owner.id === memberId))
			) {
				mutationResult = { success: false, errorMessage: `User does not have permission to remove images from property: ${propertyId}` } as MutationStatus;
				return;
			}
			const communityId = typeof property.community === 'string' ? property.community : property.community.id;
			await blobStorage.deleteBlob(blobName, communityId);
			mutationResult = { success: true } as MutationStatus;
		});
		return mutationResult;
	}

	private async getHeader(propertyId: string, memberId:string, permittedContentTypes: string[], blobName: string, fileInfo: FileInfo) {
		let headerResult: PropertyBlobFileAuthHeaderResult;
		const { fileName, contentType, contentLength, maxSizeBytes } = fileInfo;
		await this.withStorage(async (passport, blobStorage) => {
			let property = await (await this.context.applicationServices.propertyDataApi.getPropertyByIdWithCommunityOwner(propertyId));
			if (!property) {
				headerResult = { status: { success: false, errorMessage: `Property not found: ${propertyId}` } } as PropertyBlobFileAuthHeaderResult;
				return;
			}
    
			let propertyDO = property as unknown as PropertyEntityReference; // [MG-TBD] remove unknown // new PropertyConverter().toDomain(property, { passport: passport });
      
			if (!passport.forProperty(propertyDO).determineIf(
          (permissions) => 
            {
              console.log('canManageProperties',permissions.canManageProperties);
              console.log('canEditOwnProperty',permissions.canEditOwnProperty);
              return (
                permissions.canManageProperties || 
                (permissions.canEditOwnProperty && propertyDO.owner.id === memberId)
              );
            }
          )) {
				headerResult = { status: { success: false, errorMessage: `User does not have permission to add images to property: ${propertyId}` } } as PropertyBlobFileAuthHeaderResult;
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

			const communityId = typeof property.community === 'string' ? property.community : property.community.id;
			const blobContainerName = communityId;
			const blobDataStorageAccountName = process.env.BLOB_ACCOUNT_NAME;
			const blobPath = `https://${blobDataStorageAccountName}.blob.core.windows.net/${blobContainerName}/${blobName}`;

			const requestDate = new Date().toUTCString();

			const blobRequestSettings: BlobRequestSettings = {
        fileSizeBytes: contentLength,
        mimeType: contentType,
        tags: indexFields,
        metadata: metadataFields,
      }
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