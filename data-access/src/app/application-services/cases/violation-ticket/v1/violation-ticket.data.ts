import { CosmosDataSource } from "../../../../data-sources/cosmos-data-source";
import { ViolationTicketData } from "../../../../external-dependencies/datastore";
import { AppContext } from "../../../../init/app-context-builder";

export interface ViolationTicketV1DataApi {
  getViolationTicketById(id: string): Promise<ViolationTicketData>;
  // getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]>; 
}

export class ViolationTicketV1DataApiImpl
  extends CosmosDataSource<ViolationTicketData, AppContext>
  implements ViolationTicketV1DataApi {
  async getViolationTicketById(id: string): Promise<ViolationTicketData> {
    let dbData = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return dbData;
  }
}
