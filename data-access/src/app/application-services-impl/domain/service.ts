import { Service } from '../../domain/contexts/service-ticket/service';
import { ReadOnlyDomainVisa } from '../../domain/contexts/iam/domain-visa';
import { ServiceCreateInput, ServiceUpdateInput } from '../../external-dependencies/graphql-api';
import { DomainDataSource } from './domain-data-source';
import { CommunityConverter, ServiceConverter, ServiceDomainAdapter, ServiceRepository } from '../../external-dependencies/domain';
import { ServiceData } from '../../external-dependencies/datastore';
import { ServiceDomainApi } from '../../application-services/domain';
import { AppContext } from '../../init/app-context-builder';

type PropType = ServiceDomainAdapter;
type DomainType = Service<PropType>;
type RepoType = ServiceRepository<PropType>;

export class ServiceDomainApiImpl
  extends DomainDataSource<AppContext,ServiceData,PropType,DomainType,RepoType> 
  implements ServiceDomainApi
{

  async serviceCreate(input: ServiceCreateInput) : Promise<ServiceData> {
    console.log(`serviceCreate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceCreate');
    }
    
    let serviceToReturn : ServiceData;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.community?.id);
    let communityDo = new CommunityConverter().toDomain(community,{domainVisa:ReadOnlyDomainVisa.GetInstance()});

    await this.withTransaction(async (repo) => {
      let newService = await repo.getNewInstance(
        input.serviceName,
        input.description,
        communityDo);
      serviceToReturn = new ServiceConverter().toPersistence(await repo.save(newService));
    });
    return serviceToReturn;
  }

  async serviceUpdate(input: ServiceUpdateInput) : Promise<ServiceData> {
    let serviceToReturn : ServiceData;
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