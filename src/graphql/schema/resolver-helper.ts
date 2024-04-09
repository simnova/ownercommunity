import { GraphqlContext } from "../init/graphql-context-builder";
import { Member } from "./builder/generated";

export const getMemberForCurrentUser = async (context: GraphqlContext, communityId: string): Promise<Member|undefined>  => {
  try {
    const externalId = context.verifiedUser.verifiedJWT.sub;
    const currentUser = await context.applicationServices.userDataApi.getUserByExternalId(externalId);
    return (await context.applicationServices.memberDataApi.getMemberByCommunityIdUserId(communityId, currentUser.id)) as Member;
  } catch (error) {
    console.error('Cannot get member for current user:',error);
    return undefined;
  }
}
