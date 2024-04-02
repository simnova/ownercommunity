import { Service as ServiceDO } from '../../../app/domain/contexts/service-ticket/service';
import { ServiceConverter, ServiceDomainAdapter }from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/service.domain-adapter';
import { MongoServiceRepository } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/service.mongo-repository';
import { GraphqlContext } from '../../graphql-context';
import { ServiceCreateInput, ServiceUpdateInput } from '../../schema/builder/generated';
import { DomainDataSource } from './domain-data-source';
import { Service } from '../../../infrastructure-services-impl/datastore/mongodb/models/service';
import { CommunityConverter } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/community.domain-adapter';
import { ReadOnlyPassport } from '../../../app/domain/contexts/iam/passport';

type PropType = ServiceDomainAdapter;
type DomainType = ServiceDO<PropType>;
type RepoType = MongoServiceRepository<PropType>;

export class Services extends DomainDataSource<GraphqlContext,Service,PropType,DomainType,RepoType> {

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
      serviceToReturn = new ServiceConverter().toPersistence(await repo.save(newService));
    });
    return serviceToReturn;
  }

  async serviceUpdate(input: ServiceUpdateInput) : Promise<Service> {
    let serviceToReturn : Service;
    await this.withTransaction(async (repo) => {
      let service = await repo.getById(input.id);
      if (input.serviceName !== undefined) service.ServiceName=(input.serviceName);
      if (input.description !== undefined) service.Description=(input.description);
      if (input.isActive !== undefined) service.IsActive=(input.isActive);
      serviceToReturn = new ServiceConverter().toPersistence(await repo.save(service));
    });
    return serviceToReturn;
  }
}