import { DomainDataSource } from "../../../data-sources/domain-data-source";
import { ReadOnlyDomainVisa } from "../../../domain/contexts/iam/domain-visa";
import { ViolationTicketV1 } from "../../../domain/contexts/cases/violation-ticket/v1/violation-ticket";
import { Member } from "../../../domain/contexts/community/member";
import { Service } from "../../../domain/contexts/service/service";
import { MemberData, ViolationTicketData } from "../../../external-dependencies/datastore";
import { ViolationTicketDomainAdapter, ViolationTicketRepository, CommunityConverter, PropertyConverter, MemberConverter, ServiceDomainAdapter, ServiceConverter, ViolationTicketConverter } from "../../../external-dependencies/domain";
import {ViolationTicketCreateInput, ViolationTicketUpdateInput, ViolationTicketDeleteInput, ViolationTicketAssignInput, ViolationTicketChangeStatusInput, ViolationTicketAddUpdateActivityInput } from "../../../external-dependencies/graphql-api";
import { AppContext } from "../../../init/app-context-builder";

export interface ViolationTicketDomainApi {
  violationTicketCreate(input: ViolationTicketCreateInput): Promise<ViolationTicketData>;
  violationTicketUpdate(input: ViolationTicketUpdateInput) : Promise<ViolationTicketData>;
  violationTicketDelete(input: ViolationTicketDeleteInput): Promise<ViolationTicketData>;
  violationTicketAssign(input: ViolationTicketAssignInput): Promise<ViolationTicketData>;
  violationTicketChangeStatus(input: ViolationTicketChangeStatusInput): Promise<ViolationTicketData>;
  violationTicketAddUpdateActivity(input: ViolationTicketAddUpdateActivityInput): Promise<ViolationTicketData>;
  // serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData>;
}


type PropType = ViolationTicketDomainAdapter;
type DomainType = ViolationTicketV1<PropType>;
type RepoType = ViolationTicketRepository<PropType>;

export class ViolationTicketDomainApiImpl
  extends DomainDataSource<AppContext, ViolationTicketData, PropType, DomainType, RepoType>
  implements ViolationTicketDomainApi {
  async violationTicketCreate(input: ViolationTicketCreateInput): Promise<ViolationTicketData> {
    console.log(`violationTicketCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:violationTicketCreate');
    }

    let violationTicketToReturn: ViolationTicketData;
    console.log(`violationTicketCreate:communityId`, this.context.communityId);
    let community = await this.context.applicationServices.community.dataApi.getCommunityById(this.context.communityId);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let property = await this.context.applicationServices.property.dataApi.getPropertyById(input.propertyId);
    let propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let member: MemberData;

    member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.memberId);

    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let serviceDo: Service<ServiceDomainAdapter> | undefined = undefined;
    if (input.serviceId) {
      let service = await this.context.applicationServices.service.dataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }

    console.log(`violationTicketCreate:memberDO`, memberDo);
    console.log(`violationTicketCreate:requestorId`, member.id);

    await this.withTransaction(async (repo) => {
      let newViolationTicket = await repo.getNewInstance(
        input.title,
        input.description,
        communityDo,
        propertyDo,
        memberDo,
        input.penaltyAmount);
      if (input.serviceId) { newViolationTicket.Service = (serviceDo); }

      violationTicketToReturn = new ViolationTicketConverter().toPersistence(await repo.save(newViolationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketUpdate(input: ViolationTicketUpdateInput): Promise<ViolationTicketData> {
    let violationTicketToReturn: ViolationTicketData;

    let serviceDo: Service<ServiceDomainAdapter> | undefined = undefined;
    if (input.serviceId) {
      let service = await this.context.applicationServices.service.dataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }

    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      let propertyDo = null;
      if (input.propertyId && violationTicket.property.id !== input.propertyId) {
        let property = await this.context.applicationServices.property.dataApi.getPropertyById(input.propertyId);
        propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
        violationTicket.Property = (propertyDo);
      }

      violationTicket.detectValueChangeAndAddTicketActivityLogs(input, propertyDo)
      if (input.title) violationTicket.Title = (input.title);
      if (input.description) violationTicket.Description = (input.description);
      if (input.priority) violationTicket.Priority = (input.priority);
      if (input.penaltyAmount) violationTicket.PenaltyAmount = (input.penaltyAmount);
      if (input.penaltyPaidDate) violationTicket.PenaltyPaidDate = (input?.penaltyPaidDate);
      violationTicketToReturn = new ViolationTicketConverter().toPersistence(await repo.save(violationTicket));
      if (input.serviceId) { violationTicket.Service = (serviceDo); }
    });
    return violationTicketToReturn;
  }

  async violationTicketDelete(input: ViolationTicketDeleteInput): Promise<ViolationTicketData> {
    let violationTicketToReturn: ViolationTicketData;
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      violationTicket.requestDelete();
      violationTicketToReturn = new ViolationTicketConverter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketAssign(input: ViolationTicketAssignInput): Promise<ViolationTicketData> {
    let violationTicketToReturn: ViolationTicketData;
    let memberDo: Member<any> | undefined = undefined;
    if (input.assignedToId) {
      let member = await this.context.applicationServices.member.dataApi.getMemberById(input.assignedToId);
      memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      violationTicket.AssignedTo = (memberDo);
      violationTicketToReturn = new ViolationTicketConverter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketChangeStatus(input: ViolationTicketChangeStatusInput): Promise<ViolationTicketData> {
    let member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.memberId);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let violationTicketToReturn: ViolationTicketData;
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      violationTicket.requestAddStatusTransition(input.status, input.activityDescription, memberDo);
      violationTicketToReturn = new ViolationTicketConverter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketAddUpdateActivity(input: ViolationTicketAddUpdateActivityInput): Promise<ViolationTicketData> {
    let member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.memberId);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let violationTicketToReturn: ViolationTicketData;
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      violationTicket.requestAddStatusUpdate(input.activityDescription, memberDo);
      violationTicketToReturn = new ViolationTicketConverter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }
}
