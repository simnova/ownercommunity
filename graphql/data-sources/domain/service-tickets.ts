import { ServiceTicket as ServiceTicketDO } from '../../../domain/contexts/service-ticket/service-ticket';
import { ServiceTicketConverter, ServiceTicketDomainAdapter }from '../../../domain/infrastructure/persistance/adapters/service-ticket-domain-adapter';
import { MongoServiceTicketRepository } from '../../../domain/infrastructure/persistance/repositories/mongo-service-ticket-repository';
import { Context } from '../../context';
import { ServiceTicketAddUpdateActivityInput, ServiceTicketAssignInput, ServiceTicketChangeStatusInput, ServiceTicketCreateInput, ServiceTicketSubmitInput, ServiceTicketUpdateInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { ServiceTicket } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { CommunityConverter } from '../../../domain/infrastructure/persistance/adapters/community-domain-adapter';
import { ReadOnlyPassport } from '../../../domain/contexts/iam/passport';
import { MemberConverter } from '../../../domain/infrastructure/persistance/adapters/member-domain-adapter';
import { PropertyConverter } from '../../../domain/infrastructure/persistance/adapters/property-domain-adapter';

type PropType = ServiceTicketDomainAdapter;
type DomainType = ServiceTicketDO<PropType>;
type RepoType = MongoServiceTicketRepository<PropType>;

export class ServiceTickets extends DomainDataSource<Context,ServiceTicket,PropType,DomainType,RepoType> {

  async serviceTicketCreate(input: ServiceTicketCreateInput) : Promise<ServiceTicket> {
    console.log(`serviceTicketCreate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceTicketCreate');
    }
    
    let serviceTicketToReturn : ServiceTicket;
    let community = await this.context.dataSources.communityApi.getCommunityById(this.context.community);
    let communityDo = new CommunityConverter().toDomain(community,{passport:ReadOnlyPassport.GetInstance()});

    let property = await this.context.dataSources.propertyApi.findOneById(input.propertyId);
    let propertyDo = new PropertyConverter().toDomain(property,{passport:ReadOnlyPassport.GetInstance()});

    let user = await this.context.dataSources.userApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.dataSources.memberApi.getMemberByCommunityIdUserId(this.context.community,user.id);
    let memberDo = new MemberConverter().toDomain(member,{passport:ReadOnlyPassport.GetInstance()});

    await this.withTransaction(async (repo) => {
      let newServiceTicket = await repo.getNewInstance(
        input.title,
        input.description,
        communityDo,
        propertyDo,
        memberDo);
      serviceTicketToReturn = new ServiceTicketConverter().toMongo(await repo.save(newServiceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<ServiceTicket> {
    let serviceTicketToReturn : ServiceTicket;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      if(serviceTicket.property.id !== input.propertyId) {
        let property = await this.context.dataSources.propertyApi.findOneById(input.propertyId);
        let propertyDo = new PropertyConverter().toDomain(property,{passport:ReadOnlyPassport.GetInstance()});
        serviceTicket.requestSetProperty(propertyDo);
      }
      serviceTicket.requestSetTitle(input.title);
      serviceTicket.requestSetDescription(input.description);
      serviceTicket.requestSetPriority(input.priority);
      serviceTicketToReturn = new ServiceTicketConverter().toMongo(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketSubmit(input: ServiceTicketSubmitInput) : Promise<ServiceTicket> {
    throw new Error('Method not implemented.');
  }
  async serviceTicketAssign(input: ServiceTicketAssignInput) : Promise<ServiceTicket> {
    throw new Error('Method not implemented.');
  }  
  async serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput) : Promise<ServiceTicket> {
    throw new Error('Method not implemented.');
  }
  async serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput) : Promise<ServiceTicket> {
    throw new Error('Method not implemented.');
  }

}