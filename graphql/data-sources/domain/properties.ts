import { Property as PropertyDO } from '../../../domain/contexts/property/property';
import { PropertyConverter, PropertyDomainAdapter }from '../../../domain/infrastructure/persistance/adapters/property-domain-adapter';
import { MongoPropertyRepository } from '../../../domain/infrastructure/persistance/repositories/mongo-property-repository';
import { Context } from '../../context';
import { PropertyAddInput, PropertyAssignOwnerInput, PropertyRemoveOwnerInput, PropertyUpdateInput, PropertyDeleteInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { Property } from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { CommunityConverter } from '../../../domain/infrastructure/persistance/adapters/community-domain-adapter';
import { ReadOnlyPassport } from '../../../domain/contexts/iam/passport';
import { MemberConverter } from '../../../domain/infrastructure/persistance/adapters/member-domain-adapter';

type PropType = PropertyDomainAdapter;
type DomainType = PropertyDO<PropType>;
type RepoType = MongoPropertyRepository<PropType>;

export class Properties extends DomainDataSource<Context,Property,PropType,DomainType,RepoType> {

  async propertyAdd(input: PropertyAddInput) : Promise<Property> {
    console.log(`propertyAdd`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:propertyAdd');
    }
    
    let propertyToReturn : Property;
    let community = await this.context.dataSources.communityApi.getCommunityById(this.context.community);
    let communityDo = new CommunityConverter().toDomain(community,{passport:ReadOnlyPassport.GetInstance()});

    await this.withTransaction(async (repo) => {
      let newProperty = await repo.getNewInstance(
        input.propertyName,
        communityDo);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(newProperty));
    });
    return propertyToReturn;
  }

  async propertyUpdate(input: PropertyUpdateInput) : Promise<Property> {
    let propertyToReturn : Property;

    
    let mongoMember = await this.context.dataSources.memberApi.findOneById(input.owner?.id);
    let memberDo = new MemberConverter().toDomain(mongoMember,{passport:ReadOnlyPassport.GetInstance()});

    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestSetPropertyName(input.propertyName);
      property.requestSetPropertyType(input.propertyType);
      property.requestSetListedForSale(input.listedForSale);
      property.requestSetListedForRent(input.listedForRent);
      property.requestSetListedForLease(input.listedForLease);
      property.requestSetListedInDirectory(input.listedInDirectory);
      property.requestSetOwner(input.owner?memberDo:undefined);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyDelete(input: PropertyDeleteInput) : Promise<Property> {
    let propertyToReturn : Property;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestDelete();
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyAssignOwner(input:PropertyAssignOwnerInput): Promise<Property> {
    let propertyToReturn : Property;
    let mongoMember = await this.context.dataSources.memberApi.findOneById(input.ownerId);
    let memberDo = new MemberConverter().toDomain(mongoMember,{passport:ReadOnlyPassport.GetInstance()});
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestSetOwner(memberDo);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyRemoveOwner(input:PropertyRemoveOwnerInput): Promise<Property> {
    let propertyToReturn : Property;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestSetOwner(undefined);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }

}