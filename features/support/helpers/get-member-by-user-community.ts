import { MemberEntityReference } from "../../../domain/contexts/community/member";
import { InteractWithTheDomain } from "../domain/abilities/interactWithTheDomain";

export async function getMemberByUserAndCommunity(userExternalId: string, communityName: string): Promise<MemberEntityReference> {
  // let member: MemberEntityReference;
  // await InteractWithTheDomain.asSystem().readMemberDb(async (db) => {
  //   member = db?.getAll()?.find(c => c.community.name === communityName && c.accounts.items.find(a => a.user.externalId === userExternalId));
  // });
  // return member;
  // [MG-TBD]
  return {} as MemberEntityReference;
}
