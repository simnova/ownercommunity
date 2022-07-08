import { BlobDataSource } from './blob-data-source';
import { Context } from '../../context';
import { PropertyConverter } from '../../../domain/infrastructure/persistance/adapters/property-domain-adapter';
import { PropertyBlobFileAuthHeaderResult } from '../../generated';
import { nanoid } from 'nanoid';

export class Properties extends BlobDataSource<Context> {

	public async propertyPublicFileRemove(propertyId: string,memberId: string, fileName: string): Promise<void> {
		const blobName = `public-files/${fileName}`;
		await this.withStorage(async (passport, blobStorage) => {
			var property = await this.context.dataSources.propertyCosmosdbApi.findOneById(propertyId);
			if (!property) {
				return;
			}
			var propertyDO = new PropertyConverter().toDomain(property, { passport: passport });
			if (!passport.forProperty(propertyDO).determineIf((permissions) => permissions.canManageProperties || permissions.canEditOwnProperty && propertyDO.owner.id === memberId)) {
				return;
			}
			blobStorage.deleteBlob(propertyId, blobName);
		});
	}

	public async propertyListingImageCreateAuthHeader(propertyId: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult> {
		const maxSizeMb = 10;
		const maxSizeBytes = maxSizeMb * 1024 * 1024;
		const permittedContentTypes = [
				'image/jpeg',
				'image/png',
				'image/gif',
		];
		const blobName = `property/${propertyId}/listing-images/${nanoid()}`;
		return this.getHeader(propertyId, memberId, permittedContentTypes, contentType, contentLength, maxSizeBytes, blobName);
	}

	public async propertyFloorPlanImageCreateAuthHeader(propertyId: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult> {
		const maxSizeMb = 10;
		const maxSizeBytes = maxSizeMb * 1024 * 1024;
		const permittedContentTypes = [
				'image/jpeg',
				'image/png',
				'image/gif',
		];
		const blobName = `property/${propertyId}/listing-floor-plan-images/${nanoid()}`;
		return this.getHeader(propertyId, memberId, permittedContentTypes, contentType, contentLength, maxSizeBytes, blobName);
	}

	private async getHeader(propertyId: string, memberId:string, permittedContentTypes: string[], contentType: string, contentLength: number, maxSizeBytes: number, blobName: string) {
		var headerResult: PropertyBlobFileAuthHeaderResult;
		await this.withStorage(async (passport, blobStorage) => {
			var property = await (await this.context.dataSources.propertyCosmosdbApi.findOneById(propertyId)).populate(['community','owner']);
			if (!property) {
				headerResult = { status: { success: false, errorMessage: `Property not found: ${propertyId}` } } as PropertyBlobFileAuthHeaderResult;
				return;
			}
    
			var propertyDO = new PropertyConverter().toDomain(property, { passport: passport });
      
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
			const blobContainerName = property.community.id;
			const requestDate = new Date().toUTCString();
			const authHeader = blobStorage.generateSharedKey(blobName, contentLength, requestDate, contentType, blobContainerName);
			console.log(`authHeader: ${authHeader}`);
			headerResult = { status: { success: true }, authHeader: { authHeader: authHeader, requestDate: requestDate, blobName: blobName, blobContainer: blobContainerName } } as PropertyBlobFileAuthHeaderResult;

		});
		return headerResult;
	}

}