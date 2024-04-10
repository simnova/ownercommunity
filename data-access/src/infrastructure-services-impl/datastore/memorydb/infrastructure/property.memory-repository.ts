import { CommunityEntityReference, CommunityProps } from "../../../../app/domain/contexts/community/community";
import { MemberEntityReference, MemberProps } from "../../../../app/domain/contexts/community/member";
import { DomainExecutionContext } from "../../../../app/domain/contexts/domain-execution-context";
import { AdditionalAmenityProps } from "../../../../app/domain/contexts/property/additional-amenity";
import { AddressProps } from "../../../../app/domain/contexts/property/address";
import { BedroomDetailProps } from "../../../../app/domain/contexts/property/bedroom-detail";
import { ListingDetailProps } from "../../../../app/domain/contexts/property/listing-detail";
import { LocationProps } from "../../../../app/domain/contexts/property/location";
import { PositionProps } from "../../../../app/domain/contexts/property/position";
import { Property, PropertyProps } from "../../../../app/domain/contexts/property/property";
import { PropertyRepository } from "../../../../app/domain/contexts/property/property.repository";
import { MemoryBaseAdapter } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryPropArray } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-prop-array";
import { MemoryRepositoryBase } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";

class MemoryAdditionalAmenity extends MemoryBaseAdapter implements AdditionalAmenityProps {
  category: string;
  amenities: string[];
}

class MemoryBedroomDetail extends MemoryBaseAdapter implements BedroomDetailProps {
  roomName: string;
  bedDescriptions: string[];
}

class MemoryListingDetail implements ListingDetailProps {
  price: number;
  rentHigh: number;
  rentLow: number;
  lease: number;
  maxGuests: number;
  bedrooms: number;
  private _bedroomDetails: BedroomDetailProps[] = [];
  get bedroomDetails() {
    return new MemoryPropArray(this._bedroomDetails, MemoryBedroomDetail);
  };
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  lotSize: number;
  description: string;
  amenities: string[];
  private _additionalAmenities: AdditionalAmenityProps[] = [];
  get additionalAmenities() {
    return new MemoryPropArray(this._additionalAmenities, MemoryAdditionalAmenity);
  };
  images: string[];
  video: string;
  floorPlan: string;
  floorPlanImages: string[];
  listingAgent: string;
  listingAgentPhone: string;
  listingAgentEmail: string;
  listingAgentWebsite: string;
  listingAgentCompany: string;
  listingAgentCompanyPhone: string;
  listingAgentCompanyEmail: string;
  listingAgentCompanyWebsite: string;
  listingAgentCompanyAddress: string;
}

class MemoryPosition implements PositionProps {
  type?: string;
  coordinates?: number[];
}

class MemoryAddress implements AddressProps {
    streetNumber: string;
    streetName: string;
    municipality: string;
    municipalitySubdivision: string;
    localName: string;
    countrySecondarySubdivision: string;
    countryTertiarySubdivision: string;
    countrySubdivision: string;
    countrySubdivisionName: string;
    postalCode: string;
    extendedPostalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    streetNameAndNumber: string;
    routeNumbers: string;
    crossStreet: string;
}

class MemoryLocation implements LocationProps {
  private _position: PositionProps;
  get position() {
    if(!this._position){
      this._position = new MemoryPosition();
    }
    return this._position;
  }
  private _address: AddressProps;
  get address() {
    if(!this._address){
      this._address = new MemoryAddress();
    }
    return this._address;
  }
}

class MemoryProperty extends MemoryBaseAdapter implements PropertyProps  {
  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference) : void {
    this.community = community as CommunityProps;
  };
  private _location: LocationProps;
  get location() {
    if(!this._location){
      this._location = new MemoryLocation();
    }
    return this._location;
  };
  owner: MemberProps;
  setOwnerRef(owner: MemberEntityReference) : void {
    this.owner = owner as unknown as MemberProps; // [MG-TBD]
  };
  propertyName: string;
  propertyType: string;
  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;
  private _listingDetail: ListingDetailProps;
  get listingDetail() {
    if(!this._listingDetail){
      this._listingDetail = new MemoryListingDetail();
    }
    return this._listingDetail;
  };
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  tags: string[];
  hash: string;
  lastIndexed: Date; // success
  updateIndexFailedDate: Date; // failure
}

export class MemoryPropertyRepository<
  PropType extends PropertyProps, 
  DomainType extends Property<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements PropertyRepository<PropType> 
    {

      async getNewInstance(name: string, community: CommunityEntityReference): Promise<Property<PropType>> {
        return Property.getNewInstance(new MemoryProperty as unknown as PropType, name, community, this.context); // [MG-TBD]
      }
      async getById(id: string): Promise<Property<PropType>>{
        const property = await this.get(id);
        return property;
      }
  }