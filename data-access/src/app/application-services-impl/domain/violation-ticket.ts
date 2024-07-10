import { ViolationTicket } from '../../domain/contexts/violation-ticket/violation-ticket';
import { Service } from '../../domain/contexts/service-ticket/service';
import { Member } from '../../domain/contexts/community/member';
import { ReadOnlyDomainVisa } from '../../domain/contexts/iam/domain-visa';
import { ViolationTicketCreateInput, ViolationTicketUpdateInput, ViolationTicketDeleteInput, ViolationTicketAssignInput, ViolationTicketChangeStatusInput, ViolationTicketAddUpdateActivityInput } from '../../external-dependencies/graphql-api';
import { DomainDataSource } from './domain-data-source';
import { CommunityConverter, MemberConverter, PropertyConverter, ServiceConverter, ServiceDomainAdapter, ViolationTicketDomainAdapter, ViolationTicketRepository, ViolationTicketConverter } from '../../external-dependencies/domain';
import { ViolationTicketData as ViolationTicketData, MemberData } from '../../external-dependencies/datastore';
import { ViolationTicketDomainApi as ViolationTicketDomainApi } from '../../application-services/domain';
import { AppContext } from '../../init/app-context-builder';

type PropType = ViolationTicketDomainAdapter;
type DomainType = ViolationTicket<PropType>;
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
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let property = await this.context.applicationServices.propertyDataApi.getPropertyById(input.propertyId);
    let propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let member: MemberData;

    member = await this.context.applicationServices.memberDataApi.getMemberById(this.context.memberId);

    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let serviceDo: Service<ServiceDomainAdapter> | undefined = undefined;
    if (input.serviceId) {
      let service = await this.context.applicationServices.serviceDataApi.getServiceById(input.serviceId);
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
      let service = await this.context.applicationServices.serviceDataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }

    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      let propertyDo = null;
      if (input.propertyId && violationTicket.property.id !== input.propertyId) {
        let property = await this.context.applicationServices.propertyDataApi.getPropertyById(input.propertyId);
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
      let member = await this.context.applicationServices.memberDataApi.getMemberById(input.assignedToId);
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
    let member = await this.context.applicationServices.memberDataApi.getMemberById(this.context.memberId);
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
    let member = await this.context.applicationServices.memberDataApi.getMemberById(this.context.memberId);
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
