import { CosmosDataSource } from "../../../data-sources/cosmos-data-source";
import { ViolationTicketData } from "../../../external-dependencies/datastore";
import { AppContext } from "../../../init/app-context-builder";

export interface ViolationTicketDataApi {
  getViolationTicketById(id: string): Promise<ViolationTicketData>;
  // getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]>; 
}

export class ViolationTicketDataApiImpl
  extends CosmosDataSource<ViolationTicketData, AppContext>
  implements ViolationTicketDataApi {
  async getViolationTicketById(id: string): Promise<ViolationTicketData> {
    let dbData = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return dbData;
  }
}
