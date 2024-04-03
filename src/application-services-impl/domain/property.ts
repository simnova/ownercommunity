import { Property } from '../../app/domain/contexts/property/property';
import { PropertyAddInput, PropertyAssignOwnerInput, PropertyRemoveOwnerInput, PropertyUpdateInput, PropertyDeleteInput } from '../../app/application-services/domain/property.interface';
import { Amenities, Images } from '../../app/domain/contexts/property/listing-detail.value-objects';
import { BedDescriptions } from '../../app/domain/contexts/property/bedroom-detail.value-objects';
import { BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { DomainApplicationServiceImpl } from './_domain.application-service';
import { PropertyDomainApplicationService } from '../../app/application-services/domain/property.interface';
import { PropertyProps } from '../../app/domain/contexts/property/property';
import { PropertyRepository } from '../../app/domain/contexts/property/property.repository';
import { CommunityEntityReference } from '../../app/domain/contexts/community/community';
import { MemberEntityReference } from '../../app/domain/contexts/community/member';

type PropType = PropertyProps;
type Root = Property<PropType>;
type RepoType = PropertyRepository<PropType>;

export class PropertyDomainApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> 
  extends DomainApplicationServiceImpl<Context, PropType, Root, RepoType> 
  implements PropertyDomainApplicationService
{
  async propertyAdd(input: PropertyAddInput): Promise<Root> {
    console.log(`propertyAdd`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:propertyAdd');
    }

    let propertyToReturn: Root;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = community as CommunityEntityReference; // new CommunityConverter().toDomain(community, { passport: ReadOnlyPassport.GetInstance() });

    await this.withTransaction(async (repo) => {
      let newProperty = await repo.getNewInstance(input.propertyName, communityDo);
      propertyToReturn = await repo.save(newProperty);
    });
    return propertyToReturn;
  }

  async propertyUpdate(input: PropertyUpdateInput): Promise<Root> {
    let propertyToReturn: Root;

    let member = await this.context.applicationServices.memberDataApi.getMemberById(input.owner?.id);
    let memberDo = member as MemberEntityReference; // new MemberConverter().toDomain(mongoMember, { passport: ReadOnlyPassport.GetInstance() });

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
      propertyToReturn = await repo.save(property);
    });
    return propertyToReturn;
  }

  async propertyDelete(input: PropertyDeleteInput): Promise<Root> {
    let propertyToReturn: Root;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.requestDelete();
      propertyToReturn = await repo.save(property);
    });
    return propertyToReturn;
  }

  async propertyAssignOwner(input: PropertyAssignOwnerInput): Promise<Root> {
    let propertyToReturn: Root;
    let member = await this.context.applicationServices.memberDataApi.getMemberById(input.ownerId);
    let memberDo = member as MemberEntityReference; // new MemberConverter().toDomain(mongoMember, { passport: ReadOnlyPassport.GetInstance() });
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.Owner=(memberDo);
      propertyToReturn = await repo.save(property);
    });
    return propertyToReturn;
  }

  async propertyRemoveOwner(input: PropertyRemoveOwnerInput): Promise<Root> {
    let propertyToReturn: Root;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(input.id);
      property.Owner=(undefined);
      propertyToReturn = await repo.save(property);
    });
    return propertyToReturn;
  }

  async propertyImageRemove(propertyId: string, blobName: string): Promise<Root> {
    let propertyToReturn: Root;
    await this.withTransaction(async (repo) => {
      let property = await repo.getById(propertyId);
      property.listingDetail.requestRemoveImage(blobName);
      propertyToReturn = await repo.save(property);
    });
    return propertyToReturn;
  }
}
