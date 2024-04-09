import { ServiceTicketConverter } from '../../external-dependencies/domain';
import { ServiceTicketData, ServiceTicketModel } from '../../external-dependencies/datastore';
import { CosmosDataSource } from './cosmos-data-source';
import { ServiceTicketDataApi } from '../../application-services/datastore';
import { AppContext } from '../../app-context-builder';

export class ServiceTicketDataApiImpl 
  extends CosmosDataSource<ServiceTicketData, AppContext> 
  implements ServiceTicketDataApi
{
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
    let converter = new ServiceTicketConverter();

    return (await Promise.all(serviceTickets.map((ticket) => ticket)))
      .map((ticket) => converter.toDomain(ticket, context))
      .filter((ticket) =>
        context.passport
          .forServiceTicket(ticket)
          .determineIf(
            (permissions) =>
              permissions.canManageTickets ||
              permissions.canAssignTickets ||
              (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
              (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket)
          )
      )
      .map((ticket) => converter.toPersistence(ticket));
  }
}
