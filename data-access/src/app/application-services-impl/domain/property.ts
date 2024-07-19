import { Property } from '../../domain/contexts/property/property';
import { ReadOnlyDomainVisa } from '../../domain/contexts/iam/domain-visa';
import { PropertyAddInput, PropertyAssignOwnerInput, PropertyRemoveOwnerInput, PropertyUpdateInput, PropertyDeleteInput } from '../../external-dependencies/graphql-api';
import { DomainDataSource } from './domain-data-source';
import { Amenities, Images } from '../../domain/contexts/property/listing-detail.value-objects';
import { BedDescriptions } from '../../domain/contexts/property/bedroom-detail.value-objects';
import { CommunityConverter, MemberConverter, PropertyConverter, PropertyDomainAdapter, PropertyRepository } from '../../external-dependencies/domain';
import { PropertyData } from '../../external-dependencies/datastore';
import { PropertyDomainApi } from '../../application-services/domain';
import { AppContext } from '../../init/app-context-builder';

type PropType = PropertyDomainAdapter;
type DomainType = Property<PropType>;
type RepoType = PropertyRepository<PropType>;

export class PropertyDomainApiImpl
  extends DomainDataSource<AppContext, PropertyData, PropType, DomainType, RepoType> 
  implements PropertyDomainApi
{
  async propertyAdd(input: PropertyAddInput): Promise<PropertyData> {
    console.log(`propertyAdd`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:propertyAdd');
    }

    let propertyToReturn: PropertyData;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.community?.id);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    await this.withTransaction(async (repo) => {
      let newProperty = await repo.getNewInstance(input.propertyName, communityDo);
      propertyToReturn = new PropertyConverter().toPersistence(await repo.save(newProperty));
    });
    return propertyToReturn;
  }

  async propertyUpdate(input: PropertyUpdateInput): Promise<PropertyData> {
    let propertyToReturn: PropertyData;
    
    let memberDo;
    if (input.owner !== undefined) {
      let mongoMember = await this.context.applicationServices.memberDataApi.getMemberById(input.owner?.id);
      memberDo = new MemberConverter().toDomain(mongoMember, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }

    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      if (input.propertyName !== undefined) property.PropertyName=(input.propertyName);
      if (input.propertyType !== undefined) property.PropertyType=(input.propertyType);
      if (input.listedForSale !== undefined) property.ListedForSale=(input.listedForSale);
      if (input.listedForRent !== undefined) property.ListedForRent=(input.listedForRent);
      if (input.listedForLease !== undefined) property.ListedForLease=(input.listedForLease);
      if (input.listedInDirectory !== undefined) property.ListedInDirectory=(input.listedInDirectory);
      if (input.owner !== undefined) property.Owner=(input.owner ? memberDo : undefined);
      if (input.listingDetail !== undefined) {
        if (input.listingDetail.price !== undefined) property.listingDetail.Price=(input.listingDetail.price);
        if (input.listingDetail.rentHigh !== undefined) property.listingDetail.RentHigh=(input.listingDetail.rentHigh);
        if (input.listingDetail.rentLow !== undefined) property.listingDetail.RentLow=(input.listingDetail.rentLow);
        if (input.listingDetail.lease !== undefined) property.listingDetail.Lease=(input.listingDetail.lease);
        if (input.listingDetail.maxGuests !== undefined) property.listingDetail.MaxGuests=(input.listingDetail.maxGuests);
        if (input.listingDetail.bedrooms !== undefined) property.listingDetail.Bedrooms=(input.listingDetail.bedrooms);
        if (input.listingDetail.bedroomDetails !== undefined) {
          let systemBedroomDetails = property.listingDetail.bedroomDetails;
          let updatedBedroomDetails = input.listingDetail.bedroomDetails;
          updatedBedroomDetails.forEach((updatedBedroom) => {
            if (!updatedBedroom.id) {
              let newBedroom = property.listingDetail.requestNewBedroom();
              newBedroom.RoomName=(updatedBedroom.roomName);
              newBedroom.BedDescriptions=(new BedDescriptions(updatedBedroom.bedDescriptions));
            } else {
              let systemBedroom = systemBedroomDetails.find((bedroom) => bedroom.id === updatedBedroom.id);
              if (systemBedroom === undefined) throw new Error('Bedroom not found');
              systemBedroom.RoomName=(updatedBedroom.roomName);
              systemBedroom.BedDescriptions=(new BedDescriptions(updatedBedroom.bedDescriptions));
            }
          });
          let updatedIds = updatedBedroomDetails.filter((x) => x.id !== undefined).map((x) => x.id);
          systemBedroomDetails
            .filter((bedroom) => !updatedIds.includes(bedroom.id))
            .forEach((systemBedroom) => {
              property.listingDetail.requestRemoveBedroomDetails(systemBedroom);
            });
        }

        if (input.listingDetail.bathrooms !== undefined) property.listingDetail.Bathrooms=(input.listingDetail.bathrooms);
        if (input.listingDetail.squareFeet !== undefined) property.listingDetail.SquareFeet=(input.listingDetail.squareFeet);
        if (input.listingDetail.description !== undefined) property.listingDetail.Description=(input.listingDetail.description);
        if (input.listingDetail.amenities !== undefined) property.listingDetail.Amenities=(new Amenities(input.listingDetail.amenities));
        if (input.listingDetail.additionalAmenities !== undefined) {
          let systemAdditionalAmenities = property.listingDetail.additionalAmenities;
          let updatedAdditionalAmenities = input.listingDetail.additionalAmenities;
          updatedAdditionalAmenities.forEach((updatedAmenity) => {
            if (!updatedAmenity.id) {
              let newAmenity = property.listingDetail.requestNewAmenity();
              newAmenity.Category=(updatedAmenity.category);
              newAmenity.Amenities=(new Amenities(updatedAmenity.amenities));
            } else {
              let systemAmenity = systemAdditionalAmenities.find((amenity) => amenity.id === updatedAmenity.id);
              if (systemAmenity === undefined) throw new Error('Amenity not found');
              systemAmenity.Category=(updatedAmenity.category);
              systemAmenity.Amenities=(new Amenities(updatedAmenity.amenities));
            }
          });
          let updatedIds = updatedAdditionalAmenities.filter((x) => x.id !== undefined).map((x) => x.id);
          systemAdditionalAmenities
            .filter((amenity) => !updatedIds.includes(amenity.id))
            .forEach((systemAmenity) => {
              property.listingDetail.requestRemoveAdditionalAmenity(systemAmenity);
            });
        }
        if (input.listingDetail.images !== undefined) property.listingDetail.Images=(new Images(input.listingDetail.images));
        //todo video
        if (input.listingDetail.floorPlan !== undefined) property.listingDetail.FloorPlan=(input.listingDetail.floorPlan);
        if (input.listingDetail.floorPlanImages !== undefined) property.listingDetail.FloorPlanImages=(new Images(input.listingDetail.floorPlanImages));
        if (input.listingDetail.listingAgent !== undefined) property.listingDetail.ListingAgent=(input.listingDetail.listingAgent);
        if (input.listingDetail.listingAgentPhone !== undefined) property.listingDetail.ListingAgentCompanyPhone=(input.listingDetail.listingAgentPhone);
        if (input.listingDetail.listingAgentEmail !== undefined) property.listingDetail.ListingAgentEmail=(input.listingDetail.listingAgentEmail);
        if (input.listingDetail.listingAgentWebsite !== undefined) property.listingDetail.ListingAgentWebsite=(input.listingDetail.listingAgentWebsite);
        if (input.listingDetail.listingAgentCompany !== undefined) property.listingDetail.ListingAgentCompany=(input.listingDetail.listingAgentCompany);
        if (input.listingDetail.listingAgentCompanyPhone !== undefined) property.listingDetail.ListingAgentCompanyPhone=(input.listingDetail.listingAgentCompanyPhone);
        if (input.listingDetail.listingAgentCompanyEmail !== undefined) property.listingDetail.ListingAgentCompanyEmail=(input.listingDetail.listingAgentCompanyEmail);
        if (input.listingDetail.listingAgentCompanyWebsite !== undefined) property.listingDetail.ListingAgentCompanyWebsite=(input.listingDetail.listingAgentCompanyWebsite);
        if (input.listingDetail.listingAgentCompanyAddress !== undefined) property.listingDetail.ListingAgentCompanyAddress=(input.listingDetail.listingAgentCompanyAddress);
      }

      if (input.location !== undefined) {
        if (input.location.address !== undefined) {
          property.location.Address=(input.location.address);
        }
        if (input.location.position !== undefined) {
          property.location.Position=(input.location.position);
        }
      }
      if (input.tags !== undefined) property.Tags=(input.tags);
      propertyToReturn = new PropertyConverter().toPersistence(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyDelete(input: PropertyDeleteInput): Promise<PropertyData> {
    let propertyToReturn: PropertyData;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestDelete();
      propertyToReturn = new PropertyConverter().toPersistence(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyAssignOwner(input: PropertyAssignOwnerInput): Promise<PropertyData> {
    let propertyToReturn: PropertyData;
    let mongoMember = await this.context.applicationServices.memberDataApi.getMemberById(input.ownerId);
    let memberDo = new MemberConverter().toDomain(mongoMember, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.Owner=(memberDo);
      propertyToReturn = new PropertyConverter().toPersistence(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyRemoveOwner(input: PropertyRemoveOwnerInput): Promise<PropertyData> {
    let propertyToReturn: PropertyData;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.Owner=(undefined);
      propertyToReturn = new PropertyConverter().toPersistence(await repo.save(property));
    });
    return propertyToReturn;
  }

  async propertyImageRemove(propertyId: string, blobName: string): Promise<PropertyData> {
    let propertyToReturn: PropertyData;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(propertyId);
      property.listingDetail.requestRemoveImage(blobName);
      propertyToReturn = new PropertyConverter().toPersistence(await repo.save(property));
    });
    return propertyToReturn;
  }
}
