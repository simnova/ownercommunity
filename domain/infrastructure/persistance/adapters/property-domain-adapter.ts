import { Property, ListingDetail, BedroomDetail, AdditionalAmenity } from '../../../../infrastructure/data-sources/cosmos-db/models/property';
import { CommunityEntityReference } from '../../../contexts/community/community';
import { MemberEntityReference } from '../../../contexts/community/member';
import { DomainExecutionContext } from '../../../contexts/context';
import { LocationEntityReference } from '../../../contexts/property/location';
import { Property as PropertyDO, PropertyProps } from '../../../contexts/property/property';
import { MongooseDomainAdapter, MongoosePropArray } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';
import { CommunityDomainAdapter } from './community-domain-adapter';
import { LocationDomainAdapter } from './location-domain-adapter';
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
    this.props.set('community',community.id);
  }

  get location() {
    if(this.props.location) {return new LocationDomainAdapter(this.props.location);}
  }
  public setLocationRef(owner:LocationEntityReference) {
    this.props.set('location',owner.id);
  }
  
  get owner() {
    if(this.props.owner) {return new MemberDomainAdapter(this.props.owner);}
  }
  public setOwnerRef(owner:MemberEntityReference) {
    this.props.set('owner',owner.id);
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