import { FindQueries } from "./_base";
import { MemberDataStructure } from "../../application-services/datastore";

type PropType = MemberDataStructure;
export interface MemberDatastoreInfrastructureService extends FindQueries<PropType> {
  getMembersAssignableToTickets(communityId: string): Promise<PropType[]>;
  getMemberByIdWithCommunity(memberId: string): Promise<PropType>;
  getMemberByCommunityAccountWithCommunityAccountRole(communityId: string, userId: string): Promise<MemberDataStructure>;
}