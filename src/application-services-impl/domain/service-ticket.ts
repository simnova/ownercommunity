import { ServiceTicket } from '../../app/domain/contexts/service-ticket/service-ticket';
import { ServiceTicketAddUpdateActivityInput, ServiceTicketAssignInput, ServiceTicketChangeStatusInput, ServiceTicketCreateInput, ServiceTicketSubmitInput, ServiceTicketUpdateInput, ServiceTicketDeleteInput } from '../../app/application-services/domain/service-ticket.interface';
import { BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { DomainApplicationServiceImpl } from './_domain.application-service';
import { ServiceTicketDomainApplicationService } from '../../app/application-services/domain/service-ticket.interface';
import { ServiceTicketProps } from '../../app/domain/contexts/service-ticket/service-ticket';
import { ServiceTicketRepository } from '../../app/domain/contexts/service-ticket/service-ticket.repository';
import { CommunityEntityReference } from '../../app/domain/contexts/community/community';
import { PropertyEntityReference } from '../../app/domain/contexts/property/property';
import { MemberEntityReference } from '../../app/domain/contexts/community/member';
import { ServiceEntityReference } from '../../app/domain/contexts/service-ticket/service';
import { MemberDataStructure } from '../../app/application-services/datastore';

type PropType = ServiceTicketProps;
type Root = ServiceTicket<PropType>;
type RepoType = ServiceTicketRepository<PropType>;

export class ServiceTicketDomainApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> 
  extends DomainApplicationServiceImpl<Context, PropType, Root, RepoType> 
  implements ServiceTicketDomainApplicationService
{
  async serviceTicketCreate(input: ServiceTicketCreateInput): Promise<Root> {
    console.log(`serviceTicketCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceTicketCreate');
    }

    let serviceTicketToReturn: Root;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = community as CommunityEntityReference; //new CommunityConverter().toDomain(community, { passport: ReadOnlyPassport.GetInstance() });

    let property = await this.context.applicationServices.propertyDataApi.getPropertyById(input.propertyId);
    let propertyDo = property as PropertyEntityReference; // new PropertyConverter().toDomain(property, { passport: ReadOnlyPassport.GetInstance() });

    let member: MemberDataStructure;
    if (input.requestorId === undefined) {
      //assume requestor is the verified user
      let user = await this.context.applicationServices.userDataApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
      member = await this.context.applicationServices.memberDataApi.getMemberByCommunityIdUserId(this.context.communityId, user.id);
    } else {
      //use the supplied requestorId - TODO: check that the current user is an admin
      member = await this.context.applicationServices.memberDataApi.getMemberById(input.requestorId);
    }
    let memberDo = member as MemberEntityReference; //new MemberConverter().toDomain(member, { passport: ReadOnlyPassport.GetInstance() });

    let serviceDo : ServiceEntityReference; // ServiceDO<ServiceDomainAdapter> | undefined = undefined;
    if(input.serviceId) {
      let service = await this.context.applicationServices.serviceDataApi.getServiceById(input.serviceId);
      serviceDo =  service as ServiceEntityReference; // new ServiceConverter().toDomain(service,{passport:ReadOnlyPassport.GetInstance()});
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
      
      serviceTicketToReturn = await repo.save(newServiceTicket);
    });
    return serviceTicketToReturn;
  }

  async serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<Root> {
    let serviceTicketToReturn : Root;

    let serviceDo : ServiceEntityReference; //ServiceDO<ServiceDomainAdapter> | undefined = undefined;
    if(input.serviceId) {
      let service = await this.context.applicationServices.serviceDataApi.getServiceById(input.serviceId);
      serviceDo = service as ServiceEntityReference; // new ServiceConverter().toDomain(service,{passport:ReadOnlyPassport.GetInstance()});
    }

    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      if (serviceTicket.property.id !== input.propertyId) {
        let property = await this.context.applicationServices.propertyDataApi.getPropertyById(input.propertyId);
        let propertyDo = property as PropertyEntityReference; //new PropertyConverter().toDomain(property, { passport: ReadOnlyPassport.GetInstance() });
        serviceTicket.Property=(propertyDo);
      }
      serviceTicket.Title=(input.title);
      serviceTicket.Description=(input.description);
      serviceTicket.Priority=(input.priority);
      if(input.serviceId) { serviceTicket.Service=(serviceDo); }
      serviceTicketToReturn = await repo.save(serviceTicket);
    });
    return serviceTicketToReturn;
  }

  async serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<Root> {
    let serviceTicketToReturn: Root;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestDelete();
      serviceTicketToReturn = await repo.save(serviceTicket);
    });

    return serviceTicketToReturn;
  }

  async serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<Root> {
    throw new Error('Method not implemented.');
  }

  async serviceTicketAssign(input: ServiceTicketAssignInput): Promise<Root> {
    let serviceTicketToReturn: Root;
    let memberDo: MemberEntityReference; //MemberDO<any> | undefined = undefined;
    if (input.assignedToId) {
      let member = await this.context.applicationServices.memberDataApi.getMemberById(input.assignedToId);
      memberDo = member as MemberEntityReference; //new MemberConverter().toDomain(member, { passport: ReadOnlyPassport.GetInstance() });
    }
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.AssignedTo=(memberDo);
      serviceTicketToReturn = await repo.save(serviceTicket);
    });
    return serviceTicketToReturn;
  }

  async serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<Root> {
    let user = await this.context.applicationServices.userDataApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.applicationServices.memberDataApi.getMemberByCommunityIdUserId(this.context.communityId, user.id);
    let memberDo = member as MemberEntityReference; //new MemberConverter().toDomain(member, { passport: ReadOnlyPassport.GetInstance() });
    let serviceTicketToReturn: Root;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestAddStatusUpdate(input.activityDescription, memberDo);
      serviceTicketToReturn = await repo.save(serviceTicket);
    });
    return serviceTicketToReturn;
  }

  async serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<Root> {
    let user = await this.context.applicationServices.userDataApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.applicationServices.memberDataApi.getMemberByCommunityIdUserId(this.context.communityId, user.id);
    let memberDo = member as MemberEntityReference; //new MemberConverter().toDomain(member, { passport: ReadOnlyPassport.GetInstance() });
    let serviceTicketToReturn: Root;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestAddStatusTransition(input.status, input.activityDescription, memberDo);
      serviceTicketToReturn = await repo.save(serviceTicket);
    });
    return serviceTicketToReturn;
  }
}
