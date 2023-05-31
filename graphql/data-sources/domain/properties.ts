import { Property as PropertyDO } from '../../../domain/contexts/property/property';
import { PropertyConverter, PropertyDomainAdapter } from '../../../domain/infrastructure/persistence/property.domain-adapter';
import { MongoPropertyRepository } from '../../../domain/infrastructure/persistence/property.mongo-repository';
import { Context } from '../../context';
import { PropertyAddInput, PropertyAssignOwnerInput, PropertyRemoveOwnerInput, PropertyUpdateInput, PropertyDeleteInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { Property } from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { CommunityConverter } from '../../../domain/infrastructure/persistence/community.domain-adapter';
import { ReadOnlyPassport } from '../../../domain/contexts/iam/passport';
import { MemberConverter } from '../../../domain/infrastructure/persistence/member.domain-adapter';
import { Amenities, Images } from '../../../domain/contexts/property/listing-detail.value-objects';
import { AdditionalAmenity, AdditionalAmenityProps } from '../../../domain/contexts/property/additional-amenity';
import { BedDescriptions } from '../../../domain/contexts/property/bedroom-detail.value-objects';

type PropType = PropertyDomainAdapter;
type DomainType = PropertyDO<PropType>;
type RepoType = MongoPropertyRepository<PropType>;

export class Properties extends DomainDataSource<Context, Property, PropType, DomainType, RepoType> {
  async propertyAdd(input: PropertyAddInput): Promise<Property> {
    console.log(`propertyAdd`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:propertyAdd');
    }

    let propertyToReturn: Property;
    let community = await this.context.dataSources.communityCosmosdbApi.getCommunityById(this.context.community);
    let communityDo = new CommunityConverter().toDomain(community, { passport: ReadOnlyPassport.GetInstance() });

    await this.withTransaction(async (repo) => {
      let newProperty = await repo.getNewInstance(input.propertyName, communityDo);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(newProperty));
    });
    return propertyToReturn;
  }

  async propertyUpdate(input: PropertyUpdateInput): Promise<Property> {
    let propertyToReturn: Property;

    let mongoMember = await this.context.dataSources.memberCosmosdbApi.findOneById(input.owner?.id);
    let memberDo = new MemberConverter().toDomain(mongoMember, { passport: ReadOnlyPassport.GetInstance() });

    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      if (input.propertyName !== undefined) property.requestSetPropertyName(input.propertyName);
      if (input.propertyType !== undefined) property.requestSetPropertyType(input.propertyType);
      if (input.listedForSale !== undefined) property.requestSetListedForSale(input.listedForSale);
      if (input.listedForRent !== undefined) property.requestSetListedForRent(input.listedForRent);
      if (input.listedForLease !== undefined) property.requestSetListedForLease(input.listedForLease);
      if (input.listedInDirectory !== undefined) property.requestSetListedInDirectory(input.listedInDirectory);
      if (input.owner !== undefined) property.requestSetOwner(input.owner ? memberDo : undefined);
      if (input.listingDetail !== undefined) {
        if (input.listingDetail.price !== undefined) property.listingDetail.requestSetPrice(input.listingDetail.price);
        if (input.listingDetail.rentHigh !== undefined) property.listingDetail.requestSetRentHigh(input.listingDetail.rentHigh);
        if (input.listingDetail.rentLow !== undefined) property.listingDetail.requestSetRentLow(input.listingDetail.rentLow);
        if (input.listingDetail.lease !== undefined) property.listingDetail.requestSetLease(input.listingDetail.lease);
        if (input.listingDetail.maxGuests !== undefined) property.listingDetail.requestSetMaxGuests(input.listingDetail.maxGuests);
        if (input.listingDetail.bedrooms !== undefined) property.listingDetail.requestSetBedrooms(input.listingDetail.bedrooms);
        if (input.listingDetail.bedroomDetails !== undefined) {
          let systemBedroomDetails = property.listingDetail.bedroomDetails;
          let updatedBedroomDetails = input.listingDetail.bedroomDetails;
          updatedBedroomDetails.forEach((updatedBedroom) => {
            if (!updatedBedroom.id) {
              let newBedroom = property.listingDetail.requestNewBedroom();
              newBedroom.requestSetRoomName(updatedBedroom.roomName);
              newBedroom.requestSetBedDescriptions(new BedDescriptions(updatedBedroom.bedDescriptions));
            } else {
              let systemBedroom = systemBedroomDetails.find((bedroom) => bedroom.id === updatedBedroom.id);
              if (systemBedroom === undefined) throw new Error('Bedroom not found');
              systemBedroom.requestSetRoomName(updatedBedroom.roomName);
              systemBedroom.requestSetBedDescriptions(new BedDescriptions(updatedBedroom.bedDescriptions));
            }
          });
          let updatedIds = updatedBedroomDetails.filter((x) => x.id !== undefined).map((x) => x.id);
          systemBedroomDetails
            .filter((bedroom) => !updatedIds.includes(bedroom.id))
            .forEach((systemBedroom) => {
              property.listingDetail.requestRemoveBedroomDetails(systemBedroom);
            });
        }

        if (input.listingDetail.bathrooms !== undefined) property.listingDetail.requestSetBathrooms(input.listingDetail.bathrooms);
        if (input.listingDetail.squareFeet !== undefined) property.listingDetail.requestSetSquareFeet(input.listingDetail.squareFeet);
        if (input.listingDetail.description !== undefined) property.listingDetail.requestSetDescription(input.listingDetail.description);
        if (input.listingDetail.amenities !== undefined) property.listingDetail.requestSetAmenities(new Amenities(input.listingDetail.amenities));
        if (input.listingDetail.additionalAmenities !== undefined) {
          let systemAdditionalAmenities = property.listingDetail.additionalAmenities;
          let updatedAdditionalAmenities = input.listingDetail.additionalAmenities;
          updatedAdditionalAmenities.forEach((updatedAmenity) => {
            if (!updatedAmenity.id) {
              let newAmenity = property.listingDetail.requestNewAmenity();
              newAmenity.requestSetCategory(updatedAmenity.category);
              newAmenity.requestSetAmenities(new Amenities(updatedAmenity.amenities));
            } else {
              let systemAmenity = systemAdditionalAmenities.find((amenity) => amenity.id === updatedAmenity.id);
              if (systemAmenity === undefined) throw new Error('Amenity not found');
              systemAmenity.requestSetCategory(updatedAmenity.category);
              systemAmenity.requestSetAmenities(new Amenities(updatedAmenity.amenities));
            }
          });
          let updatedIds = updatedAdditionalAmenities.filter((x) => x.id !== undefined).map((x) => x.id);
          systemAdditionalAmenities
            .filter((amenity) => !updatedIds.includes(amenity.id))
            .forEach((systemAmenity) => {
              property.listingDetail.requestRemoveAdditionalAmenity(systemAmenity);
            });
        }
        if (input.listingDetail.images !== undefined) property.listingDetail.requestSetImages(new Images(input.listingDetail.images));
        //todo video
        if (input.listingDetail.floorPlan !== undefined) property.listingDetail.requestSetFloorPlan(input.listingDetail.floorPlan);
        if (input.listingDetail.floorPlanImages !== undefined) property.listingDetail.requestSetFloorPlanImages(new Images(input.listingDetail.floorPlanImages));
        if (input.listingDetail.listingAgent !== undefined) property.listingDetail.requestSetListingAgent(input.listingDetail.listingAgent);
        if (input.listingDetail.listingAgentPhone !== undefined) property.listingDetail.requestSetListingAgentPhone(input.listingDetail.listingAgentPhone);
        if (input.listingDetail.listingAgentEmail !== undefined) property.listingDetail.requestSetListingAgentEmail(input.listingDetail.listingAgentEmail);
        if (input.listingDetail.listingAgentWebsite !== undefined) property.listingDetail.requestSetListingAgentWebsite(input.listingDetail.listingAgentWebsite);
        if (input.listingDetail.listingAgentCompany !== undefined) property.listingDetail.requestSetListingAgentCompany(input.listingDetail.listingAgentCompany);
        if (input.listingDetail.listingAgentCompanyPhone !== undefined) property.listingDetail.requestSetListingAgentCompanyPhone(input.listingDetail.listingAgentCompanyPhone);
        if (input.listingDetail.listingAgentCompanyEmail !== undefined) property.listingDetail.requestSetListingAgentCompanyEmail(input.listingDetail.listingAgentCompanyEmail);
        if (input.listingDetail.listingAgentCompanyWebsite !== undefined) property.listingDetail.requestSetListingAgentCompanyWebsite(input.listingDetail.listingAgentCompanyWebsite);
        if (input.listingDetail.listingAgentCompanyAddress !== undefined) property.listingDetail.requestSetListingAgentCompanyAddress(input.listingDetail.listingAgentCompanyAddress);
      }

      if (input.location !== undefined) {
        if (input.location.address !== undefined) {
          property.location.requestSetAddress(input.location.address);
        }
        if (input.location.position !== undefined) {
          property.location.requestSetPosition(input.location.position);
        }
      }
      if (input.tags !== undefined) property.requestSetTags(input.tags);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyDelete(input: PropertyDeleteInput): Promise<Property> {
    let propertyToReturn: Property;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestDelete();
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyAssignOwner(input: PropertyAssignOwnerInput): Promise<Property> {
    let propertyToReturn: Property;
    let mongoMember = await this.context.dataSources.memberCosmosdbApi.findOneById(input.ownerId);
    let memberDo = new MemberConverter().toDomain(mongoMember, { passport: ReadOnlyPassport.GetInstance() });
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestSetOwner(memberDo);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyRemoveOwner(input: PropertyRemoveOwnerInput): Promise<Property> {
    let propertyToReturn: Property;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestSetOwner(undefined);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyImageRemove(propertyId: string, blobName: string): Promise<Property> {
    let propertyToReturn: Property;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(propertyId);
      property.listingDetail.requestRemoveImage(blobName);
      propertyToReturn = new PropertyConverter().toMongo(await repo.save(property));
    });
    return propertyToReturn;
  }
}
