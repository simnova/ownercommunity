import { Member, MemberProps } from '../../domain/contexts/community/member';

export interface MemberDomainApplicationService {// extends DomainApplicationService<MemberProps, Member<MemberProps>, MemberRepository<MemberProps>>{
  memberCreate(input: MemberCreateInput) : Promise<Member<MemberProps>>;
  memberUpdate(input: MemberUpdateInput) : Promise<Member<MemberProps>>;
  memberAccountAdd(input: MemberAccountAddInput) : Promise<Member<MemberProps>>;
  memberAccountEdit(input: MemberAccountEditInput) : Promise<Member<MemberProps>>;
  memberAccountRemove(input: MemberAccountRemoveInput) : Promise<Member<MemberProps>>;
  memberProfileUpdate(input: MemberProfileUpdateInput) : Promise<Member<MemberProps>>;
  memberProfileUpdateAvatar(input: MemberProfileUpdateAvatarInput) : Promise<Member<MemberProps>>;
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


