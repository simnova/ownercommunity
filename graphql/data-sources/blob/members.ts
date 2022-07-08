import { BlobDataSource } from "./blob-data-source";
import { Context } from "../../context";
import { MemberAvatarImageAuthHeaderResult, MutationStatus } from "../../generated";
import { MemberConverter } from "../../../domain/infrastructure/persistance/adapters/member-domain-adapter";

export class Members extends BlobDataSource<Context> {

	async memberProfileAvatarRemove(memberId: string): Promise<MutationStatus> {
		var mutationResult:MutationStatus;
		await	this.withStorage(async (passport, blobStorage) => {
			var member = await (await this.context.dataSources.memberCosmosdbApi.findOneById(memberId)).populate('community');
			if(!member){
				mutationResult = {success:false, errorMessage:`Member not found: ${memberId}`} as MutationStatus;
			}
			var memberDo = new MemberConverter().toDomain(member,{passport:passport});
			if(!passport.forMember(memberDo).determineIf((permissions) => (permissions.canEditOwnMemberAccounts && permissions.isEditingOwnMemberAccount) || permissions.canManageMembers)){
				mutationResult = {success:false, errorMessage:`User does not have permission to remove avatar for member: ${memberId}`} as MutationStatus;
				return;
			}
			await blobStorage.deleteBlob(member.profile.avatarDocumentId, member.community.id);
			mutationResult = {success:true} as MutationStatus;
			return;
		});
		return mutationResult;
	}

	async memberProfileAvatarCreateAuthHeader(memberId: string, contentType: string, contentLength: number): Promise<MemberAvatarImageAuthHeaderResult> {
		var headerResult:MemberAvatarImageAuthHeaderResult;
	  await	this.withStorage(async (passport, blobStorage) => {
			var member = await (await this.context.dataSources.memberCosmosdbApi.findOneById(memberId)).populate('community');
			if(!member){
				headerResult = {status:{success:false, errorMessage:`Member not found: ${memberId}`}} as MemberAvatarImageAuthHeaderResult;
				return;
			}
			var memberDo = new MemberConverter().toDomain(member,{passport:passport});
			if(!passport.forMember(memberDo).determineIf((permissions) => (permissions.canEditOwnMemberAccounts && permissions.isEditingOwnMemberAccount) || permissions.canManageMembers)){
				headerResult = {status:{success:false, errorMessage:`User does not have permission to update avatar for member: ${memberId}`}} as MemberAvatarImageAuthHeaderResult;
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
				headerResult = {status:{success:false, errorMessage:'Content type not permitted.'}} as MemberAvatarImageAuthHeaderResult;
				return;
			}
			if (contentLength > maxSizeBytes) {
				headerResult = {status:{success:false, errorMessage:'Content length exceeds permitted limit.'}} as MemberAvatarImageAuthHeaderResult;
				return;
			}
			var blobName = `profile/${member.id}/avatar`;
			var requestDate = new Date().toUTCString();
			var authHeader =  blobStorage.generateSharedKey(blobName,contentLength, requestDate ,contentType, member.community.id);
			headerResult = {status:{success:true}, authHeader: { authHeader:authHeader, requestDate:requestDate, blobName:blobName,blobContainer:member.community.id}} as MemberAvatarImageAuthHeaderResult;
			return;
		});
		return headerResult;
	}
}