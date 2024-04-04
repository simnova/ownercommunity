import { MemberData } from "../../infrastructure-services/datastore";

export interface MemberDatastoreApplicationService {
  getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<MemberData>;
  getMembers(): Promise<MemberData[]>;
  getMembersByCommunityId(communityId: string): Promise<MemberData[]>;
  getMembersAssignableToTickets(): Promise<MemberData[]>;
  getMemberByIdWithCommunity(memberId: string): Promise<MemberData>;
  getMemberById(memberId: string): Promise<MemberData>;
  getMemberByCommunityAccountWithCommunityAccountRole(communityId: string, userId: string): Promise<MemberData>;
}