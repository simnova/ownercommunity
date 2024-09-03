import { DomainDataSource } from "../../data-sources/domain-data-source";
import { ReadOnlyDomainVisa } from "../../domain/domain.visa";
import { Service } from "../../domain/contexts/community/service/service";
import { ServiceData } from "../../external-dependencies/datastore";
import { ServiceDomainAdapter, CommunityConverter, ServiceConverter, ServiceRepository } from "../../external-dependencies/domain";
import { ServiceCreateInput, ServiceUpdateInput } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../../../framework/app/app-context-builder";

export interface ServiceDomainApi {
  serviceCreate(input: ServiceCreateInput) : Promise<ServiceData>;
  serviceUpdate(input: ServiceUpdateInput) : Promise<ServiceData>;
}

type PropType = ServiceDomainAdapter;
type DomainType = Service<PropType>;
type RepoType = ServiceRepository<PropType>;

export class ServiceDomainApiImpl
  extends DomainDataSource<AppContext, ServiceData, PropType, DomainType, RepoType>
  implements ServiceDomainApi {

  async serviceCreate(input: ServiceCreateInput): Promise<ServiceData> {
    console.log(`serviceCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:serviceCreate');
    }

    let serviceToReturn: ServiceData;
    let community = await this.context.applicationServices.community.dataApi.getCommunityById(this.context.community?.id);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    await this.withTransaction(async (repo) => {
      let newService = await repo.getNewInstance(
        input.serviceName,
        input.description,
        communityDo);
      serviceToReturn = new ServiceConverter().toPersistence(await repo.save(newService));
    });
    return serviceToReturn;
  }

  async serviceUpdate(input: ServiceUpdateInput): Promise<ServiceData> {
    let serviceToReturn: ServiceData;
    await this.withTransaction(async (repo) => {
      let service = await repo.getById(input.id);
      if (input.serviceName !== undefined) service.ServiceName = (input.serviceName);
      if (input.description !== undefined) service.Description = (input.description);
      if (input.isActive !== undefined) service.IsActive = (input.isActive);
      serviceToReturn = new ServiceConverter().toPersistence(await repo.save(service));
    });
    return serviceToReturn;
  }
}
