import { Service } from '../../app/domain/contexts/service-ticket/service';
import { ServiceCreateInput, ServiceUpdateInput } from '../../app/application-services/domain/service.interface';
import { ServiceDomainApplicationService } from '../../app/application-services/domain/service.interface';
import { DomainApplicationServiceImpl } from './_domain.application-service';
import { BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { ServiceProps } from '../../app/domain/contexts/service-ticket/service';
import { ServiceRepository } from '../../app/domain/contexts/service-ticket/service.repository';
import { CommunityEntityReference } from '../../app/domain/contexts/community/community';

type PropType = ServiceProps;
type Root = Service<PropType>;
type RepoType = ServiceRepository<PropType>;

export class ServiceDomainApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> 
  extends DomainApplicationServiceImpl<Context, PropType, Root, RepoType> 
  implements ServiceDomainApplicationService
{

  async serviceCreate(input: ServiceCreateInput) : Promise<Root> {
    console.log(`serviceCreate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceCreate');
    }
    
    let serviceToReturn : Root;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = community as CommunityEntityReference; //new CommunityConverter().toDomain(community,{passport:ReadOnlyPassport.GetInstance()});

    await this.withTransaction(async (repo) => {
      let newService = await repo.getNewInstance(
        input.serviceName,
        input.description,
        communityDo);
      serviceToReturn = await repo.save(newService);
    });
    return serviceToReturn;
  }

  async serviceUpdate(input: ServiceUpdateInput) : Promise<Root> {
    let serviceToReturn : Root;
    await this.withTransaction(async (repo) => {
      let service = await repo.getById(input.id);
      if (input.serviceName !== undefined) service.ServiceName=(input.serviceName);
      if (input.description !== undefined) service.Description=(input.description);
      if (input.isActive !== undefined) service.IsActive=(input.isActive);
      serviceToReturn = await repo.save(service);
    });
    return serviceToReturn;
  }
}