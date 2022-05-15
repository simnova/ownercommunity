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
      if(input.propertyName !== undefined) property.requestSetPropertyName(input.propertyName);
      if(input.propertyType !== undefined) property.requestSetPropertyType(input.propertyType);
      if(input.listedForSale !== undefined) property.requestSetListedForSale(input.listedForSale);
      if(input.listedForRent !== undefined) property.requestSetListedForRent(input.listedForRent);
      if(input.listedForLease !== undefined) property.requestSetListedForLease(input.listedForLease);
      if(input.listedInDirectory !== undefined) property.requestSetListedInDirectory(input.listedInDirectory);
      if(input.owner !== undefined) property.requestSetOwner(input.owner?memberDo:undefined);
      if(input.listingDetail !== undefined) {
        if(input.listingDetail.price !== undefined) property.listingDetail.requestSetPrice(input.listingDetail.price);
        if(input.listingDetail.rentHigh !== undefined) property.listingDetail.requestSetRentHigh(input.listingDetail.rentHigh);
        if(input.listingDetail.rentLow !== undefined) property.listingDetail.requestSetRentLow(input.listingDetail.rentLow);
        if(input.listingDetail.lease !== undefined) property.listingDetail.requestSetLease(input.listingDetail.lease);
        if(input.listingDetail.maxGuests !== undefined) property.listingDetail.requestSetMaxGuests(input.listingDetail.maxGuests);
        if(input.listingDetail.bedrooms !== undefined) property.listingDetail.requestSetBedrooms(input.listingDetail.bedrooms);
        //todo bedroom details
        if(input.listingDetail.bathrooms !== undefined) property.listingDetail.requestSetBathrooms(input.listingDetail.bathrooms);
        if(input.listingDetail.squareFeet !== undefined) property.listingDetail.requestSetSquareFeet(input.listingDetail.squareFeet);
        if(input.listingDetail.description !== undefined) property.listingDetail.requestSetDescription(input.listingDetail.description);
       // if(input.listingDetail.amenities !== undefined) property.listingDetail.requestSetAmenities(input.listingDetail.amenities);
       //todo addtional ammenities
       //todo images
       //todo video
        if(input.listingDetail.floorPlan !== undefined) property.listingDetail.requestSetFloorPlan(input.listingDetail.floorPlan);
        //todo floor plan images
        if(input.listingDetail.listingAgent !== undefined) property.listingDetail.requestSetListingAgent(input.listingDetail.listingAgent);
        if(input.listingDetail.listingAgentPhone !== undefined) property.listingDetail.requestSetListingAgentPhone(input.listingDetail.listingAgentPhone);
        if(input.listingDetail.listingAgentEmail !== undefined) property.listingDetail.requestSetListingAgentEmail(input.listingDetail.listingAgentEmail);
        if(input.listingDetail.listingAgentWebsite !== undefined) property.listingDetail.requestSetListingAgentWebsite(input.listingDetail.listingAgentWebsite);
        if(input.listingDetail.listingAgentCompany !== undefined) property.listingDetail.requestSetListingAgentCompany(input.listingDetail.listingAgentCompany);
        if(input.listingDetail.listingAgentCompanyPhone !== undefined) property.listingDetail.requestSetListingAgentCompanyPhone(input.listingDetail.listingAgentCompanyPhone);
        if(input.listingDetail.listingAgentCompanyEmail !== undefined) property.listingDetail.requestSetListingAgentCompanyEmail(input.listingDetail.listingAgentCompanyEmail);
        if(input.listingDetail.listingAgentCompanyWebsite !== undefined) property.listingDetail.requestSetListingAgentCompanyWebsite(input.listingDetail.listingAgentCompanyWebsite);
        if(input.listingDetail.listingAgentCompanyAddress !== undefined) property.listingDetail.requestSetListingAgentCompanyAddress(input.listingDetail.listingAgentCompanyAddress);

      }
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