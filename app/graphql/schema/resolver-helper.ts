import { Context } from "../context";
import { Member } from "../generated";

export const getMemberForCurrentUser = async (context: Context, communityId: string): Promise<Member|undefined>  => {
  try {
    const externalId = context.verifiedUser.verifiedJWT.sub;
    const currentUser = await context.dataSources.userCosmosdbApi.getByExternalId(externalId);
    return (await context.dataSources.memberCosmosdbApi.getMemberByCommunityIdUserId(communityId, currentUser.id)) as Member;
  } catch (error) {
    console.error('Cannot get member for current user:',error);
    return undefined;
  }
}
