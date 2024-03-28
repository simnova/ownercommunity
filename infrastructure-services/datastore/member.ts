import { FindQueries } from "./_base";
import { MemberDataStructure } from "../../application-services/datastore";

export interface MemberDatastoreInfrastructureService extends FindQueries<MemberDataStructure> {
  getMembersAssignableToTickets(communityId: string): Promise<MemberDataStructure[]>;
  getMemberByIdWithCommunity(memberId: string): Promise<MemberDataStructure>;
}