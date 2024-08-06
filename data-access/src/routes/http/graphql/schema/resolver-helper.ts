import { OpenIdConfigKeyEnum } from "../../../../../seedwork/auth-seedwork-oidc/portal-token-validation";
import { VerifiedUser } from "../../../../app/init/app-context-builder";
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
  return null;
}

export const applyPermissionFilter = async <T>(docs: T[], predicate: (doc: T) => boolean): Promise<T[]> => {
  const results = await Promise.all(
    docs.map((doc: T) => applyPermission<T>(doc, predicate))
  );
  return results.filter((doc) => doc !== undefined && doc !== null);
}

export const checkStaffPortalAccess = (verifiedUser: VerifiedUser): boolean => {
  return verifiedUser?.openIdConfigKey === OpenIdConfigKeyEnum.STAFF_PORTAL;
}

export const checkAccountPortalAccess = (verifiedUser: VerifiedUser): boolean => {
  return verifiedUser?.openIdConfigKey === OpenIdConfigKeyEnum.ACCOUNT_PORTAL;
}

export const checkSystemAccess = (verifiedUser: VerifiedUser): boolean => {
  return verifiedUser?.openIdConfigKey === OpenIdConfigKeyEnum.SYSTEM;
}

export const checkAnyAccess = (verifiedUser: VerifiedUser): boolean => {
  return verifiedUser?.openIdConfigKey in OpenIdConfigKeyEnum;
}