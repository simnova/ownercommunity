import { BlobDataSource } from './blob-data-source';
import { Context } from '../../context';
import { CommunityConverter } from '../../../domain/infrastructure/persistence/community.domain-adapter';
import { CommunityBlobContentAuthHeaderResult, FileInfo } from '../../generated';

export class Communities extends BlobDataSource<Context> {

	public async communityPublicFilesList(communityId: string): Promise<FileInfo[]> {
		var result: FileInfo[] = [];
		await	this.withStorage(async (passport, blobStorage) => {
			var community = await this.context.dataSources.communityCosmosdbApi.findOneById(communityId);
			var communityDO = new CommunityConverter().toDomain(community,{passport:passport});
			if(!passport.forCommunity(communityDO).determineIf((permissions) => permissions.canManageSiteContent)){
				return ;
			}
			try{
				var files = await blobStorage.listBlobs(community.id,'public-files/');
				result = files.map((file) => {
					return {
						name: file.name,
						url: file.url,
						size: file.size,
						type: file.type
					} as FileInfo;
				});
			}catch(e){ //	BlobNotFound
				return ;
			}
		});
		return result;
	}

	public async communityPublicFilesListByType(communityId: string, type: string): Promise<FileInfo[]> {
		var result: FileInfo[] = await this.communityPublicFilesList(communityId);
		return result.filter((file) => file.type.includes(type));
	}

	public async communityPublicFileCreateAuthHeader(communityId: string, fileName: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult> {
		const maxSizeMb = 10;
		const maxSizeBytes = maxSizeMb * 1024 * 1024;
		const permittedContentTypes = [
				'image/jpeg',
				'image/png',
				'image/gif',
				'text/plain',
				'text/csv',
				'application/json',
				'application/pdf'
		];
		const blobName = `public-files/${fileName}`;
		return this.getHeader(communityId, permittedContentTypes, contentType, contentLength, maxSizeBytes, blobName);
	}

	public async communityPublicFileRemove(communityId: string, fileName: string): Promise<void> {
		const blobName = `public-files/${fileName}`;
		await this.withStorage(async (passport, blobStorage) => {
			var community = await this.context.dataSources.communityCosmosdbApi.findOneById(communityId);
			if (!community) {
				return;
			}
			var communityDO = new CommunityConverter().toDomain(community, { passport: passport });
			if (!passport.forCommunity(communityDO).determineIf((permissions) => permissions.canManageSiteContent)) {
				return;
			}
			blobStorage.deleteBlob(communityId, blobName);
		});
	}

	public async communityPublicContentCreateAuthHeader(communityId: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult> {
		const maxSizeMb = 10;
		const maxSizeBytes = maxSizeMb * 1024 * 1024;
		const permittedContentTypes = [
				'image/jpeg',
				'image/png',
				'image/gif',
				'text/plain',
				'text/json',
				'application/json',
		];
		const blobName = 'website-root'
		return this.getHeader(communityId, permittedContentTypes, contentType, contentLength, maxSizeBytes, blobName);
	}

	private async getHeader(communityId: string, permittedContentTypes: string[], contentType: string, contentLength: number, maxSizeBytes: number, blobName: string) {
		var headerResult: CommunityBlobContentAuthHeaderResult;
		await this.withStorage(async (passport, blobStorage) => {
			var community = await this.context.dataSources.communityCosmosdbApi.findOneById(communityId);
			if (!community) {
				headerResult = { status: { success: false, errorMessage: `Community not found: ${communityId}` } } as CommunityBlobContentAuthHeaderResult;
				return;
			}
			var communityDO = new CommunityConverter().toDomain(community, { passport: passport });
			if (!passport.forCommunity(communityDO).determineIf((permissions) => permissions.canManageSiteContent)) {
				headerResult = { status: { success: false, errorMessage: `User does not have permission to create content for community: ${communityId}` } } as CommunityBlobContentAuthHeaderResult;
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
			const blobContainerName = community.id;
			const requestDate = new Date().toUTCString();
			const authHeader = blobStorage.generateSharedKey(blobName, contentLength, requestDate, contentType, blobContainerName);
			console.log(`authHeader: ${authHeader}`);
			headerResult = { status: { success: true }, authHeader: { authHeader: authHeader, requestDate: requestDate, blobName: blobName, blobContainer: blobContainerName } } as CommunityBlobContentAuthHeaderResult;

		});
		return headerResult;
	}

}