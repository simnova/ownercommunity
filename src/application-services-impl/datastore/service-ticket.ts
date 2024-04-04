import { ServiceTicketDataStructure } from '../../app/application-services/datastore';
import { ServiceTicketDatastoreApplicationService } from '../../app/application-services/datastore/service-ticket.interface';
import { ServiceTicketEntityReference } from '../../app/domain/contexts/service-ticket/service-ticket';
import { AppContext } from '../../app/app-context';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';

export class ServiceTicketDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements ServiceTicketDatastoreApplicationService
{
  async getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketDataStructure[]> {
    let serviceTicketToReturn: ServiceTicketDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findByFieldsWithPopulatedValues({ community: communityId });
    });
    return this.applyPermissionFilter(serviceTicketToReturn, this.context);
  }

  async getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketDataStructure[]> {
    let serviceTicketToReturn: ServiceTicketDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findByFieldsWithPopulatedValues({ requestor: memberId });
    });
    return this.applyPermissionFilter(serviceTicketToReturn, this.context);
  }

  async getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketDataStructure[]> {
    let serviceTicketToReturn: ServiceTicketDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findByFieldsWithPopulatedValues({ requestor: memberId , status: 'CLOSED'});
    });
    return this.applyPermissionFilter(serviceTicketToReturn, this.context);
  }

  async getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketDataStructure[]> {
    let serviceTicketToReturn: ServiceTicketDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findByFields({ community: communityId, assignedTo: memberId});
    });
    return this.applyPermissionFilter(serviceTicketToReturn, this.context);
  }

  private async applyPermissionFilter(serviceTickets: ServiceTicketDataStructure[], context: AppContext): Promise<ServiceTicketDataStructure[]> {
    return (await Promise.all(serviceTickets.map((ticket) => ticket)))
      .map((ticket) => ticket as unknown as ServiceTicketEntityReference) // [MG-TBD] remove unknown
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
      .map((ticket) => ticket as unknown as ServiceTicketDataStructure); // [MG-TBD] remove unknown
  }
}
