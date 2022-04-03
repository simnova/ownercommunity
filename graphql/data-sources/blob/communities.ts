import { BlobDataSource } from "./blob-data-source";
import { Context } from "../../context";
import { CommunityConverter } from "../../../domain/infrastructure/persistance/adapters/community-domain-adapter";
import { CommunityPublicContentAuthHeaderResult } from "../../generated";

export class Communities extends BlobDataSource<Context> {

	async communityPublicContentCreateAuthHeader(communityId: string, contentType: string, contentLength: number): Promise<CommunityPublicContentAuthHeaderResult> {
		var headerResult:CommunityPublicContentAuthHeaderResult;
	  await	this.withStorage(async (passport, blobStorage) => {
			  var community = await this.context.dataSources.communityApi.findOneById(communityId);
				if(!community){
					headerResult = {status:{success:false, errorMessage:`Community not found: ${communityId}`}} as CommunityPublicContentAuthHeaderResult;
					return;
				}
				var communityDO = new CommunityConverter().toDomain(community,{passport:passport});
				if(!passport.forCommunity(communityDO).determineIf((permissions) => permissions.canManageSiteContent)){
					headerResult = {status:{success:false, errorMessage:`User does not have permission to create content for community: ${communityId}`}} as CommunityPublicContentAuthHeaderResult;
					return;
				}
				
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
				if (!permittedContentTypes.includes(contentType)) {
					headerResult = {status:{success:false, errorMessage:'Content type not permitted.'}} as CommunityPublicContentAuthHeaderResult;
					return;
				}
				if (contentLength > maxSizeBytes) {
					headerResult = {status:{success:false, errorMessage:'Content length exceeds permitted limit.'}} as CommunityPublicContentAuthHeaderResult;
					return;
				}
				var blobName = community.id;
				var requestDate = new Date().toUTCString();
				var authHeader =  blobStorage.generateSharedKey(blobName,contentLength, requestDate ,contentType, communityId);
				headerResult = {status:{success:true}, authHeader:authHeader, requestDate:requestDate, blobName:blobName,blobContainer:process.env['BLOB_CONTAINER_NAME']} as CommunityPublicContentAuthHeaderResult;

		});
		return headerResult;
	}
}