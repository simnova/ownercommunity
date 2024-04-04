import { FindQueries } from "./_base";
import { Member as MemberData } from "../../../infrastructure-services-impl/datastore/mongodb/models/member";

export {MemberData};
export interface MemberDatastoreInfrastructureService extends FindQueries<MemberData> {
  getMembersAssignableToTickets(communityId: string): Promise<MemberData[]>;
  getMemberByIdWithCommunity(memberId: string): Promise<MemberData>;
  getMemberByCommunityAccountWithCommunityAccountRole(communityId: string, userId: string): Promise<MemberData>;
}