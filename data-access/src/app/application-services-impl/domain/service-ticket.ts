import { ServiceTicket } from '../../domain/contexts/service-ticket/service-ticket';
import { Service } from '../../domain/contexts/service-ticket/service';
import { Member } from '../../domain/contexts/community/member';
import { ReadOnlyDomainVisa } from '../../domain/contexts/iam/domain-visa';
import { ServiceTicketAddUpdateActivityInput, ServiceTicketAssignInput, ServiceTicketChangeStatusInput, ServiceTicketCreateInput, ServiceTicketSubmitInput, ServiceTicketUpdateInput, ServiceTicketDeleteInput } from '../../external-dependencies/graphql-api';
import { DomainDataSource } from './domain-data-source';
import { CommunityConverter, MemberConverter, PropertyConverter, ServiceConverter, ServiceDomainAdapter, ServiceTicketConverter, ServiceTicketDomainAdapter, ServiceTicketRepository } from '../../external-dependencies/domain';
import { MemberData, ServiceTicketData } from '../../external-dependencies/datastore';
import { ServiceTicketDomainApi } from '../../application-services/domain';
import { AppContext } from '../../init/app-context-builder';

type PropType = ServiceTicketDomainAdapter;
type DomainType = ServiceTicket<PropType>;
type RepoType = ServiceTicketRepository<PropType>;

export class ServiceTicketDomainApiImpl
  extends DomainDataSource<AppContext, ServiceTicketData, PropType, DomainType, RepoType> 
  implements ServiceTicketDomainApi
{
  async serviceTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicketData> {
    console.log(`serviceTicketCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceTicketCreate');
    }

    let serviceTicketToReturn: ServiceTicketData;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let property = await this.context.applicationServices.propertyDataApi.getPropertyById(input.propertyId);
    let propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let member: MemberData;
    if (input.requestorId === undefined) {
      //assume requestor is the verified user
      let user = await this.context.applicationServices.userDataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
      member = await this.context.applicationServices.memberDataApi.getMemberById(this.context.memberId);
    } else {
      //use the supplied requestorId - TODO: check that the current user is an admin
      member = await this.context.applicationServices.memberDataApi.getMemberById(input.requestorId);
    }
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let serviceDo : Service<ServiceDomainAdapter> | undefined = undefined;
    if(input.serviceId) {
      let service = await this.context.applicationServices.serviceDataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service,{domainVisa:ReadOnlyDomainVisa.GetInstance()});
    }

    console.log(`serviceTicketCreate:memberDO`,memberDo);
    console.log(`serviceTicketCreate:requestorId`,input.requestorId);

    await this.withTransaction(async (repo) => {
      let newServiceTicket = await repo.getNewInstance(
        input.title,
        input.description,
        communityDo,
        propertyDo,
        memberDo);
      if(input.serviceId) { newServiceTicket.Service=(serviceDo); }
      
      serviceTicketToReturn = new ServiceTicketConverter().toPersistence(await repo.save(newServiceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<ServiceTicketData> {
    let serviceTicketToReturn : ServiceTicketData;

    let serviceDo : Service<ServiceDomainAdapter> | undefined = undefined;
    if(input.serviceId) {
      let service = await this.context.applicationServices.serviceDataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service,{domainVisa:ReadOnlyDomainVisa.GetInstance()});
    }

    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      if (serviceTicket.property.id !== input.propertyId) {
        let property = await this.context.applicationServices.propertyDataApi.getPropertyById(input.propertyId);
        let propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
        serviceTicket.Property=(propertyDo);
      }
      serviceTicket.Title=(input.title);
      serviceTicket.Description=(input.description);
      serviceTicket.Priority=(input.priority);
      if(input.serviceId) { serviceTicket.Service=(serviceDo); }
      serviceTicketToReturn = new ServiceTicketConverter().toPersistence(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<ServiceTicketData> {
    let serviceTicketToReturn: ServiceTicketData;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestDelete();
      serviceTicketToReturn = new ServiceTicketConverter().toPersistence(await repo.save(serviceTicket));
    });

    return serviceTicketToReturn;
  }

  async serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData> {
    throw new Error('Method not implemented.');
  }

  async serviceTicketAssign(input: ServiceTicketAssignInput): Promise<ServiceTicketData> {
    let serviceTicketToReturn: ServiceTicketData;
    let memberDo: Member<any> | undefined = undefined;
    if (input.assignedToId) {
      let member = await this.context.applicationServices.memberDataApi.getMemberById(input.assignedToId);
      memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.AssignedTo=(memberDo);
      serviceTicketToReturn = new ServiceTicketConverter().toPersistence(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<ServiceTicketData> {
    let user = await this.context.applicationServices.userDataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.applicationServices.memberDataApi.getMemberById(this.context.memberId);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let serviceTicketToReturn: ServiceTicketData;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestAddStatusUpdate(input.activityDescription, memberDo);
      serviceTicketToReturn = new ServiceTicketConverter().toPersistence(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<ServiceTicketData> {
    let user = await this.context.applicationServices.userDataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.applicationServices.memberDataApi.getMemberById(this.context.memberId);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let serviceTicketToReturn: ServiceTicketData;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestAddStatusTransition(input.status, input.activityDescription, memberDo);
      serviceTicketToReturn = new ServiceTicketConverter().toPersistence(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }
}
