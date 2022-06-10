import { Property, ListingDetail, BedroomDetail, AdditionalAmenity, Location } from '../../../../infrastructure/data-sources/cosmos-db/models/property';
import { CommunityEntityReference } from '../../../contexts/community/community';
import { MemberEntityReference } from '../../../contexts/community/member';
import { DomainExecutionContext } from '../../../contexts/context';
import { LocationEntityReference, LocationProps } from '../../../contexts/property/location';
import { Property as PropertyDO, PropertyProps } from '../../../contexts/property/property';
import { MongooseDomainAdapter, MongoosePropArray } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';
import { CommunityDomainAdapter } from './community-domain-adapter';
import { MemberDomainAdapter } from './member-domain-adapter';
import { ListingDetailProps } from '../../../contexts/property/listing-detail';
import { BedroomDetailProps } from '../../../contexts/property/bedroom-detail';
import { AdditionalAmenityProps } from '../../../contexts/property/additional-amenity';

export class PropertyConverter extends MongoTypeConverter<DomainExecutionContext,Property,PropertyDomainAdapter,PropertyDO<PropertyDomainAdapter>> {
  constructor() {
    super(PropertyDomainAdapter, PropertyDO);
  }
}

export class PropertyDomainAdapter extends MongooseDomainAdapter<Property> implements PropertyProps {
  constructor(props: Property) { super(props); }

  get community() {
    if(this.props.community) {return new CommunityDomainAdapter(this.props.community);}
  }
  public setCommunityRef(community:CommunityEntityReference) {
    this.props.set('community',community['props']['props']);
  }

  // get location() {
  //   if(this.props.location) {return new LocationDomainAdapter(this.props.location);}
  // }

  // public setLocationRef(owner:LocationEntityReference) {
  //   this.props.set('location',owner.id);
  // }
  get location(){
    if(!this.props.location){this.props.set('location',{});  }
    return new LocationDomainAdapter(this.props.location); 
  }
  
  get owner() {
    if(this.props.owner) {return new MemberDomainAdapter(this.props.owner);}
  }
  public setOwnerRef(owner:MemberEntityReference | undefined) {
    this.props.set('owner',owner?owner.id:undefined);
  }

  get propertyName() {return this.props.propertyName;}
  set propertyName(propertyName) {this.props.propertyName = propertyName;}

  get propertyType() {return this.props.propertyType;}
  set propertyType(propertyType) {this.props.propertyType = propertyType;}

  get listedForSale() {return this.props.listedForSale;}
  set listedForSale(listedForSale) {this.props.listedForSale = listedForSale;}

  get listedForRent() {return this.props.listedForRent;}
  set listedForRent(listedForRent) {this.props.listedForRent = listedForRent;}

  get listedForLease() {return this.props.listedForLease;}
  set listedForLease(listedForLease) {this.props.listedForLease = listedForLease;}

  get listedInDirectory() {return this.props.listedInDirectory;}
  set listedInDirectory(listedInDirectory) {this.props.listedInDirectory = listedInDirectory;}

  get listingDetail(){
    if(!this.props.listingDetail){this.props.set('listingDetail',{});  }
    return new ListingDetailDomainAdapter(this.props.listingDetail); 
  }
}

export class ListingDetailDomainAdapter implements ListingDetailProps {
  constructor(public readonly props: ListingDetail) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get price() {return this.props.price;}
  set price(price) {this.props.price = price;}

  get rentHigh() {return this.props.rentHigh;}
  set rentHigh(rentHigh) {this.props.rentHigh = rentHigh;}

  get rentLow() {return this.props.rentLow;}
  set rentLow(rentLow) {this.props.rentLow = rentLow;}

  get lease() {return this.props.lease;}
  set lease(lease) {this.props.lease = lease;}

  get maxGuests() {return this.props.maxGuests;}
  set maxGuests(maxGuests) {this.props.maxGuests = maxGuests;}

  get bedrooms() {return this.props.bedrooms;}
  set bedrooms(bedrooms) {this.props.bedrooms = bedrooms;}

  get bedroomDetails() { return new MongoosePropArray(this.props.bedroomDetails,BedroomDetailDomainAdapter); }

  get bathrooms() {return this.props.bathrooms;}
  set bathrooms(bathrooms) {this.props.bathrooms = bathrooms;}

  get squareFeet() {return this.props.squareFeet;}
  set squareFeet(squareFeet) {this.props.squareFeet = squareFeet;}

  get yearBuilt() {return this.props.yearBuilt;}
  set yearBuilt(yearBuilt) {this.props.yearBuilt = yearBuilt;}

  get lotSize() {return this.props.lotSize;}
  set lotSize(lotSize) {this.props.lotSize = lotSize;}

  get description() {return this.props.description;}
  set description(description) {this.props.description = description;}

  get amenities() {return this.props.amenities;}
  set amenities(amenities) {this.props.amenities = amenities;}

  get additionalAmenities() { return new MongoosePropArray(this.props.additionalAmenities,AdditionalAmenityDomainAdapter); }

  get images() {return this.props.images;}
  set images(images) {this.props.images = images;}

  get video() {return this.props.video;}
  set video(video) {this.props.video = video;}

  get floorPlan() {return this.props.floorPlan;}
  set floorPlan(floorPlan) {this.props.floorPlan = floorPlan;}

  get floorPlanImages() {return this.props.floorPlanImages;}
  set floorPlanImages(floorPlanImages) {this.props.floorPlanImages = floorPlanImages;}

  get listingAgent() {return this.props.listingAgent;}
  set listingAgent(listingAgent) {this.props.listingAgent = listingAgent;}

  get listingAgentPhone() {return this.props.listingAgentPhone;}
  set listingAgentPhone(listingAgentPhone) {this.props.listingAgentPhone = listingAgentPhone;}

  get listingAgentEmail() {return this.props.listingAgentEmail;}
  set listingAgentEmail(listingAgentEmail) {this.props.listingAgentEmail = listingAgentEmail;}

  get listingAgentWebsite() {return this.props.listingAgentWebsite;}
  set listingAgentWebsite(listingAgentWebsite) {this.props.listingAgentWebsite = listingAgentWebsite;}

  get listingAgentCompany() {return this.props.listingAgentCompany;}
  set listingAgentCompany(listingAgentCompany) {this.props.listingAgentCompany = listingAgentCompany;}

  get listingAgentCompanyPhone() {return this.props.listingAgentCompanyPhone;}
  set listingAgentCompanyPhone(listingAgentCompanyPhone) {this.props.listingAgentCompanyPhone = listingAgentCompanyPhone;}

  get listingAgentCompanyEmail() {return this.props.listingAgentCompanyEmail;}
  set listingAgentCompanyEmail(listingAgentCompanyEmail) {this.props.listingAgentCompanyEmail = listingAgentCompanyEmail;}

  get listingAgentCompanyWebsite() {return this.props.listingAgentCompanyWebsite;}
  set listingAgentCompanyWebsite(listingAgentCompanyWebsite) {this.props.listingAgentCompanyWebsite = listingAgentCompanyWebsite;}

  get listingAgentCompanyAddress() {return this.props.listingAgentCompanyAddress;}
  set listingAgentCompanyAddress(listingAgentCompanyAddress) {this.props.listingAgentCompanyAddress = listingAgentCompanyAddress;}

}

export class BedroomDetailDomainAdapter implements BedroomDetailProps {
  constructor(public readonly props: BedroomDetail) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get roomName() {return this.props.roomName;}
  set roomName(roomName) {this.props.roomName = roomName;}

  get bedDescriptions() {return this.props.bedDescriptions;}
  set bedDescriptions(bedDescriptions) {this.props.bedDescriptions = bedDescriptions;}
}

export class AdditionalAmenityDomainAdapter implements AdditionalAmenityProps {
  constructor(public readonly props: AdditionalAmenity) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get category() {return this.props.category;}
  set category(category) {this.props.category = category;}

  get amenities() {return this.props.amenities;}
  set amenities(amenities) {this.props.amenities = amenities;}
}

export class LocationDomainAdapter implements LocationProps {
  constructor(public readonly props: Location) {}
  public get id(): string { return this.props.id.valueOf() as string; }
  get position(){
    if(!this.props || !this.props.position) return null;
    return{
      get type(){return this.props.position.type},
      set type(value){this.props.position.type = value},
      get coordinates(){return this.props.position.coordinates},
      set coordinates(value){this.props.position.coordinates = value}
    }
  }
  get address() {
    if(!this.props || !this.props.address) return null;
    return {
      get streetNumber(): string { return this.props.address.streetNumber; },
      set streetNumber(value: string) { this.props.address.streetNumber = value; },
      get streetName(): string { return this.props.address.streetName; },
      set streetName(value: string) { this.props.address.streetName = value; },
      get municipality(): string { return this.props.address.municipality; },
      set municipality(value: string) { this.props.address.municipality = value; },
      get municipalitySubdivision(): string { return this.props.address.municipalitySubdivision; },
      set municipalitySubdivision(value: string) { this.props.address.municipalitySubdivision = value; },
      get localName(): string { return this.props.address.localName; },
      set localName(value: string) { this.props.address.localName = value; },
      get countrySecondarySubdivision(): string { return this.props.address.countrySecondarySubdivision; },
      set countrySecondarySubdivision(value: string) { this.props.address.countrySecondarySubdivision = value; },
      get countryTertiarySubdivision(): string { return this.props.address.countryTertiarySubdivision; },
      set countryTertiarySubdivision(value: string) { this.props.address.countryTertiarySubdivision = value; },
      get countrySubdivision(): string { return this.props.address.countrySubdivision; },
      set countrySubdivision(value: string) { this.props.address.countrySubdivision = value; },
      get countrySubdivisionName(): string { return this.props.address.countrySubdivisionName; },
      set countrySubdivisionName(value: string) { this.props.address.countrySubdivisionName = value; },
      get postalCode(): string { return this.props.address.postalCode; },
      set postalCode(value: string) { this.props.address.postalCode = value; },
      get extendedPostalCode(): string { return this.props.address.extendedPostalCode; },
      set extendedPostalCode(value: string) { this.props.address.extendedPostalCode = value; },
      get countryCode(): string { return this.props.address.countryCode; },
      set countryCode(value: string) { this.props.address.countryCode = value; },
      get country(): string { return this.props.address.country; },
      set country(value: string) { this.props.address.country = value; },
      get countryCodeISO3(): string { return this.props.address.countryCodeISO3; },
      set countryCodeISO3(value: string) { this.props.address.countryCodeISO3 = value; },
      get freeformAddress(): string { return this.props.address.freeformAddress; },
      set freeformAddress(value: string) { this.props.address.freeformAddress = value; },

      get streetNameAndNumber(): string { return this.props.address.streetNameAndNumber; },
      set streetNameAndNumber(value: string) { this.props.address.streetNameAndNumber = value; },
      get routeNumbers(): string { return this.props.address.routeNumbers; },
      set routeNumbers(value: string) { this.props.address.routeNumbers = value; },
      get crossStreet(): string { return this.props.address.crossStreet; },
      set crossStreet(value: string) { this.props.address.crossStreet = value; }
    }
  }
}