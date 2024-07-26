import { DomainDataSource } from "../../../../data-sources/domain-data-source";
import { Member } from "../../../../domain/contexts/community/member/member";
import { ReadOnlyDomainVisa } from "../../../../domain/domain.visa";
import { Service } from "../../../../domain/contexts/community/service/service";
import { ServiceTicketV1 } from "../../../../domain/contexts/cases/service-ticket/v1/service-ticket";
import { SentBy, Message, Embedding } from "../../../../domain/contexts/cases/service-ticket/v1/service-ticket-v1-message.value-objects";
import { MemberData, ServiceTicketData } from "../../../../external-dependencies/datastore";
import { ServiceTicketV1DomainAdapter, CommunityConverter, PropertyConverter, MemberConverter, ServiceTicketV1Repository, ServiceDomainAdapter, ServiceConverter, ServiceTicketV1Converter } from "../../../../external-dependencies/domain";
import { ServiceTicketAddUpdateActivityInput, ServiceTicketAssignInput, ServiceTicketChangeStatusInput, ServiceTicketCreateInput, ServiceTicketDeleteInput, ServiceTicketSubmitInput, ServiceTicketUpdateInput } from "../../../../external-dependencies/graphql-api";
import { AppContext } from "../../../../init/app-context-builder";

export interface ServiceTicketV1DomainApi {
  serviceTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicketData>;
  serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<ServiceTicketData>;
  serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<ServiceTicketData>;
  serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData>;
  serviceTicketAssign(input: ServiceTicketAssignInput): Promise<ServiceTicketData>
  serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<ServiceTicketData>;
  serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<ServiceTicketData>;
}

type PropType = ServiceTicketV1DomainAdapter;
type DomainType = ServiceTicketV1<PropType>;
type RepoType = ServiceTicketV1Repository<PropType>;

export class ServiceTicketV1DomainApiImpl
  extends DomainDataSource<AppContext, ServiceTicketData, PropType, DomainType, RepoType>
  implements ServiceTicketV1DomainApi {
  async serviceTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicketData> {
    console.log(`serviceTicketCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceTicketCreate');
    }

    let serviceTicketToReturn: ServiceTicketData;
    let community = await this.context.applicationServices.community.dataApi.getCommunityById(this.context.community?.id);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let property = await this.context.applicationServices.property.dataApi.getPropertyById(input.propertyId);
    let propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let member: MemberData;
    if (input.requestorId === undefined) {
      member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.member?.id);
    } else {
      //use the supplied requestorId - TODO: check that the current user is an admin
      member = await this.context.applicationServices.member.dataApi.getMemberById(input.requestorId);
    }
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let serviceDo: Service<ServiceDomainAdapter> | undefined = undefined;
    if (input.serviceId) {
      let service = await this.context.applicationServices.service.dataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }

    console.log(`serviceTicketCreate:memberDO`, memberDo);
    console.log(`serviceTicketCreate:requestorId`, input.requestorId);

    await this.withTransaction(async (repo) => {
      let newServiceTicket = await repo.getNewInstance(
        input.title,
        input.description,
        communityDo,
        propertyDo,
        memberDo);
      if (input.serviceId) { newServiceTicket.Service = (serviceDo); }

      serviceTicketToReturn = new ServiceTicketV1Converter().toPersistence(await repo.save(newServiceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketUpdate(input: ServiceTicketUpdateInput): Promise<ServiceTicketData> {
    let serviceTicketToReturn: ServiceTicketData;

    let serviceDo: Service<ServiceDomainAdapter> | undefined = undefined;
    if (input.serviceId) {
      let service = await this.context.applicationServices.service.dataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }

    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      if (serviceTicket.property.id !== input.propertyId && input.propertyId !== undefined) {
        let property = await this.context.applicationServices.property.dataApi.getPropertyById(input.propertyId);
        let propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
        serviceTicket.Property = (propertyDo);
      }
      if (input.title !== undefined) serviceTicket.Title = (input.title);
      if (input.description !== undefined) serviceTicket.Description = (input.description);
      if (input.priority !== undefined) serviceTicket.Priority = (input.priority);
      if (input.serviceId !== undefined) { serviceTicket.Service = (serviceDo); }

      if (input.messages !== undefined) {
        for (const messageInput of input.messages) {
          if (!messageInput.id) {
            if (messageInput.initiatedBy !== undefined) {
              let member = await this.context.applicationServices.member.dataApi.getMemberById(messageInput.initiatedBy);
              let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
              if (memberDo) messageInput.initiatedBy = memberDo;
            }
            serviceTicket.requestAddMessage(messageInput.message, messageInput.sentBy, messageInput?.embedding, messageInput?.initiatedBy);
          } else {
            let messageToUpdate = serviceTicket.messages.find((m) => m.id === messageInput.id);
            if (messageToUpdate) {
              if (messageInput.sentBy !== undefined) messageToUpdate.SentBy = new SentBy(messageInput.sentBy);
              if (messageInput.message !== undefined) messageToUpdate.Message = new Message(messageInput.message);
              if (messageInput.embedding !== undefined) messageToUpdate.Embedding = new Embedding(messageInput.embedding);
              if (messageInput.initiatedBy !== undefined) {
                let member = await this.context.applicationServices.member.dataApi.getMemberById(messageInput.initiatedBy);
                let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
                if (memberDo) messageToUpdate.InitiatedBy = memberDo;
              }
              if (messageInput.isHiddenFromApplicant !== undefined) messageToUpdate.IsHiddenFromApplicant = messageInput.isHiddenFromApplicant;
            }
          }
        }
      }


      serviceTicketToReturn = new ServiceTicketV1Converter().toPersistence(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<ServiceTicketData> {
    let serviceTicketToReturn: ServiceTicketData;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestDelete();
      serviceTicketToReturn = new ServiceTicketV1Converter().toPersistence(await repo.save(serviceTicket));
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
      let member = await this.context.applicationServices.member.dataApi.getMemberById(input.assignedToId);
      memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.AssignedTo = (memberDo);
      serviceTicketToReturn = new ServiceTicketV1Converter().toPersistence(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<ServiceTicketData> {
    let user = await this.context.applicationServices.user.dataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.member?.id);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let serviceTicketToReturn: ServiceTicketData;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestAddStatusUpdate(input.activityDescription, memberDo);
      serviceTicketToReturn = new ServiceTicketV1Converter().toPersistence(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<ServiceTicketData> {
    let user = await this.context.applicationServices.user.dataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.member?.id);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let serviceTicketToReturn: ServiceTicketData;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestAddStatusTransition(input.status, input.activityDescription, memberDo);
      serviceTicketToReturn = new ServiceTicketV1Converter().toPersistence(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }
}
