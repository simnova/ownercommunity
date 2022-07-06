import { ServiceTicket as ServiceTicketDO } from '../../../domain/contexts/service-ticket/service-ticket';
import { Member as MemberDO } from '../../../domain/contexts/community/member';
import { ServiceTicketConverter, ServiceTicketDomainAdapter }from '../../../domain/infrastructure/persistance/adapters/service-ticket-domain-adapter';
import { MongoServiceTicketRepository } from '../../../domain/infrastructure/persistance/repositories/mongo-service-ticket-repository';
import { Context } from '../../context';
import { ServiceTicketAddUpdateActivityInput, ServiceTicketAssignInput, ServiceTicketChangeStatusInput, ServiceTicketCreateInput, ServiceTicketSubmitInput, ServiceTicketUpdateInput, ServiceTicketDeleteInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { ServiceTicket } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { Member } from '../../../infrastructure/data-sources/cosmos-db/models/member';
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

    let member : Member;
    if(input.requestorId === undefined) { //assume requestor is the verified user
      let user = await this.context.dataSources.userApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
      member = await this.context.dataSources.memberApi.getMemberByCommunityIdUserId(this.context.community,user.id);
    } else {  //use the supplied requestorId - TODO: check that the current user is an admin
      member = await this.context.dataSources.memberApi.findOneById(input.requestorId);
    }
    let memberDo = new MemberConverter().toDomain(member,{passport:ReadOnlyPassport.GetInstance()});

    console.log(`serviceTicketCreate:memberDO`,memberDo);
    console.log(`serviceTicketCreate:requestorId`,input.requestorId);

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

  async serviceTicketDelete(input: ServiceTicketDeleteInput) : Promise<ServiceTicket> {
    let serviceTicketToReturn : ServiceTicket;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestDelete();
      serviceTicketToReturn = new ServiceTicketConverter().toMongo(await repo.save(serviceTicket));
    });

    return serviceTicketToReturn;
  }

  async serviceTicketSubmit(input: ServiceTicketSubmitInput) : Promise<ServiceTicket> {
    throw new Error('Method not implemented.');
  }
  
  async serviceTicketAssign(input: ServiceTicketAssignInput) : Promise<ServiceTicket> {
    let serviceTicketToReturn : ServiceTicket;
    let memberDo:MemberDO<any>|undefined = undefined;
    if(input.assignedToId) {
      let member = await this.context.dataSources.memberApi.findOneById(input.assignedToId);
      memberDo = new MemberConverter().toDomain(member,{passport:ReadOnlyPassport.GetInstance()});
    }
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestSetAssignedTo(memberDo);
      serviceTicketToReturn = new ServiceTicketConverter().toMongo(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
    
  }  

  async serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput) : Promise<ServiceTicket> {
    let user = await this.context.dataSources.userApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.dataSources.memberApi.getMemberByCommunityIdUserId(this.context.community,user.id);
    let memberDo = new MemberConverter().toDomain(member,{passport:ReadOnlyPassport.GetInstance()});
    let serviceTicketToReturn : ServiceTicket;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestAddStatusUpdate(input.activityDescription,memberDo);
      serviceTicketToReturn = new ServiceTicketConverter().toMongo(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

  async serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput) : Promise<ServiceTicket> {
    let user = await this.context.dataSources.userApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let member = await this.context.dataSources.memberApi.getMemberByCommunityIdUserId(this.context.community,user.id);
    let memberDo = new MemberConverter().toDomain(member,{passport:ReadOnlyPassport.GetInstance()});
    let serviceTicketToReturn : ServiceTicket;
    await this.withTransaction(async (repo) => {
      let serviceTicket = await repo.getById(input.serviceTicketId);
      serviceTicket.requestAddStatusTransition(input.status,input.activityDescription,memberDo);
      serviceTicketToReturn = new ServiceTicketConverter().toMongo(await repo.save(serviceTicket));
    });
    return serviceTicketToReturn;
  }

}