import { MemberData } from "../../infrastructure-services/datastore";

export interface MemberDomainApplicationService {// extends DomainApplicationService<MemberProps, MemberData, MemberRepositoryData>{
  memberCreate(input: MemberCreateInput) : Promise<MemberData>;
  memberUpdate(input: MemberUpdateInput) : Promise<MemberData>;
  memberAccountAdd(input: MemberAccountAddInput) : Promise<MemberData>;
  memberAccountEdit(input: MemberAccountEditInput) : Promise<MemberData>;
  memberAccountRemove(input: MemberAccountRemoveInput) : Promise<MemberData>;
  memberProfileUpdate(input: MemberProfileUpdateInput) : Promise<MemberData>;
  memberProfileUpdateAvatar(input: MemberProfileUpdateAvatarInput) : Promise<MemberData>;
}

export type MemberCreateInput = {
  memberName: string;
};

export type MemberUpdateInput = {
  id: string;
  memberName?: string;
  role?: string;
  customViews?: CustomViewInput[];
};

export type CustomViewInput = {
  columnsToDisplay?: string[];
  filters?: string[];
  id?: string;
  name?: string;
  sortOrder?: string;
  type?: string;
};

export type MemberAccountAddInput = {
  memberId: string;
  account: MemberAccountCreateInput;
};

export type MemberAccountCreateInput = {
  user: string;
  firstName: string;
  lastName?: string;
};

export type MemberAccountEditInput = {
  memberId: string;
  accountId: string;
  firstName: string;
  lastName?: string;
};

export type MemberAccountRemoveInput = {
  accountId: string;
  memberId: string;
};

export type MemberProfileUpdateInput = {
  memberId: string;
  profile?: MemberProfileInput;
};

export type MemberProfileInput = {
  bio?: string;
  email?: string;
  interests?: string[];
  name?: string;
  showEmail?: boolean;
  showInterests?: boolean;
  showLocation?: boolean;
  showProfile?: boolean;
  showProperties?: boolean;
};

export type MemberProfileUpdateAvatarInput = {
  memberId: string; 
  avatarDocumentId: string
}


