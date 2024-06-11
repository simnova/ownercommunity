import { AdminTicket } from '../../domain/contexts/service-ticket/admin-ticket';
import { Service } from '../../domain/contexts/service-ticket/service';
import { Member } from '../../domain/contexts/community/member';
import { ReadOnlyDomainVisa } from '../../domain/contexts/iam/domain-visa';
import { AdminTicketCreateInput } from '../../external-dependencies/graphql-api';
import { DomainDataSource } from './domain-data-source';
import { CommunityConverter, MemberConverter, PropertyConverter, ServiceConverter, ServiceDomainAdapter, AdminTicketDomainAdapter, AdminTicketRepository, AdminTicketConverter } from '../../external-dependencies/domain';
import { AdminTicketData, MemberData } from '../../external-dependencies/datastore';
import { AdminTicketDomainApi } from '../../application-services/domain';
import { AppContext } from '../../init/app-context-builder';

type PropType = AdminTicketDomainAdapter;
type DomainType = AdminTicket<PropType>;
type RepoType = AdminTicketRepository<PropType>;

export class AdminTicketDomainApiImpl
  extends DomainDataSource<AppContext, AdminTicketData, PropType, DomainType, RepoType> 
  implements AdminTicketDomainApi
{
  async adminTicketCreate(input: AdminTicketCreateInput): Promise<AdminTicketData> {
    console.log(`serviceTicketCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceTicketCreate');
    }

    let adminTicketToReturn: AdminTicketData;
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
      let newAdminTicket = await repo.getNewInstance(
        input.title,
        input.description,
        communityDo,
        propertyDo,
        memberDo,
        input.penaltyAmount,
        input.penaltyPaidDate);
      if(input.serviceId) { newAdminTicket.Service=(serviceDo); }
      
      adminTicketToReturn = new AdminTicketConverter().toPersistence(await repo.save(newAdminTicket));
    });
    return adminTicketToReturn;
  }

  // async adminTicketUpdate() {
  //   throw new Error('Method not implemented.');
  // }
}
