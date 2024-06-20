import { ViolationTicket } from '../../domain/contexts/violation-ticket/violation-ticket';
import { Service } from '../../domain/contexts/service-ticket/service';
import { Member } from '../../domain/contexts/community/member';
import { ReadOnlyDomainVisa } from '../../domain/contexts/iam/domain-visa';
import { ViolationTicketCreateInput,  ViolationTicketUpdateInput } from '../../external-dependencies/graphql-api';
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
  implements ViolationTicketDomainApi
{
  async violationTicketCreate(input: ViolationTicketCreateInput): Promise<ViolationTicketData> {
    console.log(`serviceTicketCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceTicketCreate');
    }

    let violationTicketToReturn: ViolationTicketData;
    console.log(`serviceTicketCreate:communityId`, this.context.communityId);
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let property = await this.context.applicationServices.propertyDataApi.getPropertyById(input.propertyId);
    let propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let member: MemberData;
    if (input.requestorId === undefined) {
      //assume requestor is the verified user
      let user = await this.context.applicationServices.userDataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
      member = await this.context.applicationServices.memberDataApi.getMemberByCommunityIdUserId(this.context.communityId, user.id);
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
      let newViolationTicket = await repo.getNewInstance(
        input.title,
        input.description,
        communityDo,
        propertyDo,
        memberDo,
        input.penaltyAmount);
      if(input.serviceId) { newViolationTicket.Service=(serviceDo); }
      
      violationTicketToReturn = new ViolationTicketConverter().toPersistence(await repo.save(newViolationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketUpdate(input: ViolationTicketUpdateInput): Promise<ViolationTicketData> {
    let violationTicketToReturn : ViolationTicketData;

    let serviceDo : Service<ServiceDomainAdapter> | undefined = undefined;
    if(input.serviceId) {
      let service = await this.context.applicationServices.serviceDataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service,{domainVisa:ReadOnlyDomainVisa.GetInstance()});
    }

    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      let propertyDo = null;
      if (violationTicket.property.id !== input.propertyId) {
        let property = await this.context.applicationServices.propertyDataApi.getPropertyById(input.propertyId);
          if(!property) {
            propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
          }
        violationTicket.Property=(propertyDo);
      }
      violationTicket.Title=(input.title);
      violationTicket.Description=(input.description);
      violationTicket.Priority=(input.priority);
      violationTicket.PenaltyAmount=(input.penaltyAmount);
      violationTicket.PenaltyPaidDate=(input.penaltyPaidDate);
      if(input.serviceId) { violationTicket.Service=(serviceDo); }
      violationTicketToReturn = new ViolationTicketConverter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }
}
