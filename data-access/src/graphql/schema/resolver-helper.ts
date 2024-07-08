import { GraphqlContext } from "../init/graphql-context-builder";
import { Member } from "./builder/generated";

export const getMemberForCurrentUser = async (context: GraphqlContext): Promise<Member|undefined>  => {
  try {
    return (await context.applicationServices.memberDataApi.getMemberById(context.memberId)) as Member;
  } catch (error) {
    console.error('Cannot get member for current user:',error);
    return undefined;
  }
}
