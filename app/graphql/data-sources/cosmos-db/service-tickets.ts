import { ServiceTicketConverter } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/service-ticket.domain-adapter';
import { ServiceTicket, ServiceTicketModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/service-ticket';
import { GraphqlContext } from '../../graphql-context';
import { CosmosDataSource } from './cosmos-data-source';

export class ServiceTickets extends CosmosDataSource<ServiceTicket, GraphqlContext> {
  async getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicket[]> {
    let dbData = await ServiceTicketModel.find({ community: communityId }).populate(['community', 'property', 'requestor', 'assignedTo']).exec();

    //(await this.collection.find({community: communityId}))..  // await this.findByFields({community: communityId});
    return this.applyPermissionFilter(dbData, this.context);
  }

  async getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicket[]> {
    let dbData = await ServiceTicketModel.find({ requestor: memberId }).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return this.applyPermissionFilter(dbData, this.context);
  }

  async getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicket[]> {
    let dbData = (await this.findByFields({ requestor: memberId })).filter((ticket) => ticket.status === 'CLOSED');
    return this.applyPermissionFilter(dbData, this.context);
  }
  async getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicket[]> {
    let dbData = await this.findByFields({ community: communityId, assignedTo: memberId });
    return this.applyPermissionFilter(dbData, this.context);
  }

  private async applyPermissionFilter(serviceTickets: ServiceTicket[], context: GraphqlContext): Promise<ServiceTicket[]> {
    let converter = new ServiceTicketConverter();

    return (await Promise.all(serviceTickets.map((ticket) => ticket))) //.populate(['community','property','requestor','assignedTo']))))
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
