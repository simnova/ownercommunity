import { CosmosDataSource } from "../../../data-sources/cosmos-data-source";
import { ServiceTicketData, ServiceTicketModel } from "../../../external-dependencies/datastore";
import { ServiceTicketV1Converter } from "../../../external-dependencies/domain";
import { AppContext } from "../../../init/app-context-builder";

export interface ServiceTicketV1DataApi {
  getServiceTicketById(id: string): Promise<ServiceTicketData>;
  getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]>; 
}

export class ServiceTicketV1DataApiImpl
  extends CosmosDataSource<ServiceTicketData, AppContext>
  implements ServiceTicketV1DataApi {
  async getServiceTicketById(id: string): Promise<ServiceTicketData> {
    let dbData = await ServiceTicketModel.findById(id).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return dbData;
  }

  async getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]> {
    let dbData = await ServiceTicketModel.find({ community: communityId }).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return this.applyPermissionFilter(dbData, this.context);
  }

  async getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]> {
    let dbData = await ServiceTicketModel.find({ requestor: memberId }).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return this.applyPermissionFilter(dbData, this.context);
  }

  async getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]> {
    let dbData = (await this.findByFields({ requestor: memberId })).filter((ticket) => ticket.status === 'CLOSED');
    return this.applyPermissionFilter(dbData, this.context);
  }
  async getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]> {
    let dbData = await this.findByFields({ community: communityId, assignedTo: memberId });
    return this.applyPermissionFilter(dbData, this.context);
  }

  private async applyPermissionFilter(serviceTickets: ServiceTicketData[], context: AppContext): Promise<ServiceTicketData[]> {
    let converter = new ServiceTicketV1Converter();

    return (await Promise.all(serviceTickets.map((ticket) => ticket)))
      .map((ticket) => converter.toDomain(ticket, context.passport))
      .filter((ticket) => context.passport.domainVisa
        .forServiceTicketV1(ticket)
        .determineIf(
          (permissions) => permissions.canManageTickets ||
            permissions.canAssignTickets ||
            (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
            (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket)
        )
      )
      .map((ticket) => converter.toPersistence(ticket));
  }
}
