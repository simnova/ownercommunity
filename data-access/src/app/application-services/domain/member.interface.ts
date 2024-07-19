import { MemberData } from "../../external-dependencies/datastore";
import { MemberAccountAddInput, MemberAccountEditInput, MemberAccountRemoveInput, MemberCreateInput, MemberProfileUpdateInput, MemberUpdateInput } from "../../external-dependencies/graphql-api";

export interface MemberDomainApplicationService {
  memberCreate(input: MemberCreateInput) : Promise<MemberData>;
  memberUpdate(input: MemberUpdateInput) : Promise<MemberData>;
  memberAccountAdd(input: MemberAccountAddInput) : Promise<MemberData>;
  memberAccountEdit(input: MemberAccountEditInput) : Promise<MemberData>;
  memberAccountRemove(input: MemberAccountRemoveInput) : Promise<MemberData>;
  memberProfileUpdate(input: MemberProfileUpdateInput) : Promise<MemberData>;
  memberProfileUpdateAvatar(memberId: string, avatarDocumentId: string) : Promise<MemberData>;
  memberAddWallet(memberId: string, customerId: string) : Promise<MemberData>;
}