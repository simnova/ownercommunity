import { MemberData } from "../../external-dependencies/datastore";

export interface MemberDatastoreApplicationService {
  getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<MemberData>;
  getMembers(): Promise<MemberData[]>;
  getMembersByCommunityId(communityId: string): Promise<MemberData[]>;
  getMembersAssignableToTickets(): Promise<MemberData[]>;
  getMemberAssignableToViolationTickets(violationTicketId: string): Promise<MemberData>;
  getMemberByIdWithCommunity(memberId: string): Promise<MemberData>;
  getMemberById(memberId: string): Promise<MemberData>;
  getMemberByIdWithCommunityAccountRole(memberId: string): Promise<MemberData>;
  getMembersByUserExternalId(userExternalId: string): Promise<MemberData[]>;
  isAdmin(memberId: string): Promise<boolean>;
}