import { GraphqlContext } from "../init/graphql-context-builder";
import { Member } from "./builder/generated";

export const getMemberForCurrentUser = async (context: GraphqlContext): Promise<Member|undefined>  => {
  try {
    return (await context.applicationServices.member.dataApi.getMemberById(context.member?.id)) as Member;
  } catch (error) {
    console.error('Cannot get member for current user:',error);
    return undefined;
  }
}

export const applyPermission = async <T>(doc: T, predicate: (doc: T) => boolean): Promise<T> => {
  if (predicate(doc)) {
    return doc;
  }
}

export const applyPermissionFilter = async <T>(docs: T[], predicate: (doc: T) => boolean): Promise<T[]> => {
  const results = await Promise.all(
    docs.map((doc: T) => applyPermission<T>(doc, predicate))
  );
  return results.filter((doc) => doc !== undefined && doc !== null);
}
