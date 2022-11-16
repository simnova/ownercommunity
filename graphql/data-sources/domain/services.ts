import { Service as ServiceDO } from '../../../domain/contexts/service-ticket/service';
import { ServiceConverter, ServiceDomainAdapter }from '../../../domain/infrastructure/persistence/service.domain-adapter';
import { MongoServiceRepository } from '../../../domain/infrastructure/persistence/service.mongo-repository';
import { Context } from '../../context';
import { ServiceCreateInput, ServiceUpdateInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { Service } from '../../../infrastructure/data-sources/cosmos-db/models/service';
import { CommunityConverter } from '../../../domain/infrastructure/persistence/community.domain-adapter';
import { ReadOnlyPassport } from '../../../domain/contexts/iam/passport';

type PropType = ServiceDomainAdapter;
type DomainType = ServiceDO<PropType>;
type RepoType = MongoServiceRepository<PropType>;

export class Services extends DomainDataSource<Context,Service,PropType,DomainType,RepoType> {

  async serviceCreate(input: ServiceCreateInput) : Promise<Service> {
    console.log(`serviceCreate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceCreate');
    }
    
    let serviceToReturn : Service;
    let community = await this.context.dataSources.communityCosmosdbApi.getCommunityById(this.context.community);
    let communityDo = new CommunityConverter().toDomain(community,{passport:ReadOnlyPassport.GetInstance()});

    await this.withTransaction(async (repo) => {
      let newService = await repo.getNewInstance(
        input.serviceName,
        input.description,
        communityDo);
      serviceToReturn = new ServiceConverter().toMongo(await repo.save(newService));
    });
    return serviceToReturn;
  }

  async serviceUpdate(input: ServiceUpdateInput) : Promise<Service> {
    let serviceToReturn : Service;
    await this.withTransaction(async (repo) => {
      let service = await repo.getById(input.id);
      if (input.serviceName !== undefined) service.requestSetServiceName(input.serviceName);
      if (input.description !== undefined) service.requestSetDescription(input.description);
      if (input.isActive !== undefined) service.requestSetIsActive(input.isActive);
      serviceToReturn = new ServiceConverter().toMongo(await repo.save(service));
    });
    return serviceToReturn;
  }
}