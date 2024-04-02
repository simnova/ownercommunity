import { Property, ListingDetail, BedroomDetail, AdditionalAmenity, Location } from '../models/property';
import { CommunityEntityReference } from '../../../../app/domain/contexts/community/community';
import { MemberEntityReference } from '../../../../app/domain/contexts/community/member';
import { DomainExecutionContext } from '../../../../app/domain/contexts/domain-execution-context';
import { LocationProps } from '../../../../app/domain/contexts/property/location';
import { Property as PropertyDO, PropertyProps } from '../../../../app/domain/contexts/property/property';
import { MongooseDomainAdapter, MongoosePropArray } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { CommunityDomainAdapter } from './community.domain-adapter';
import { MemberDomainAdapter } from './member.domain-adapter';
import { ListingDetailProps } from '../../../../app/domain/contexts/property/listing-detail';
import { BedroomDetailProps } from '../../../../app/domain/contexts/property/bedroom-detail';
import { AdditionalAmenityProps } from '../../../../app/domain/contexts/property/additional-amenity';
import { AddressProps } from '../../../../app/domain/contexts/property/address';
import { PositionProps } from '../../../../app/domain/contexts/property/position';

export class PropertyConverter extends MongoTypeConverter<DomainExecutionContext, Property, PropertyDomainAdapter, PropertyDO<PropertyDomainAdapter>> {
  constructor() {
    super(PropertyDomainAdapter, PropertyDO);
  }
}

export class PropertyDomainAdapter extends MongooseDomainAdapter<Property> implements PropertyProps {
  get community() {
    if (this.doc.community) {
      return new CommunityDomainAdapter(this.doc.community);
    }
  }
  public setCommunityRef(community: CommunityEntityReference) {
    this.doc.set('community', community['props']['doc']);
  }

  // get location() {
  //   if(this.props.location) {return new LocationDomainAdapter(this.props.location);}
  // }

  // public setLocationRef(owner:LocationEntityReference) {
  //   this.props.set('location',owner.id);
  // }
  get location() {
    if (!this.doc.location) {
      this.doc.set('location', {});
    }
    return new LocationDomainAdapter(this.doc.location);
  }

  get owner() {
    if (this.doc.owner) {
      return new MemberDomainAdapter(this.doc.owner);
    }
  }
  public setOwnerRef(owner: MemberEntityReference | undefined) {
    this.doc.set('owner', owner ? owner.id : undefined);
  }

  get propertyName() {
    return this.doc.propertyName;
  }
  set propertyName(propertyName) {
    this.doc.propertyName = propertyName;
  }

  get propertyType() {
    return this.doc.propertyType;
  }
  set propertyType(propertyType) {
    this.doc.propertyType = propertyType;
  }

  get listedForSale() {
    return this.doc.listedForSale;
  }
  set listedForSale(listedForSale) {
    this.doc.listedForSale = listedForSale;
  }

  get listedForRent() {
    return this.doc.listedForRent;
  }
  set listedForRent(listedForRent) {
    this.doc.listedForRent = listedForRent;
  }

  get listedForLease() {
    return this.doc.listedForLease;
  }
  set listedForLease(listedForLease) {
    this.doc.listedForLease = listedForLease;
  }

  get listedInDirectory() {
    return this.doc.listedInDirectory;
  }
  set listedInDirectory(listedInDirectory) {
    this.doc.listedInDirectory = listedInDirectory;
  }

  get listingDetail() {
    if (!this.doc.listingDetail) {
      this.doc.set('listingDetail', {});
    }
    return new ListingDetailDomainAdapter(this.doc.listingDetail);
  }

  get tags() {
    return this.doc.tags;
  }
  set tags(tags) {
    this.doc.tags = tags;
  }

  get hash() {
    return this.doc.hash;
  }
  set hash(hash) {
    this.doc.hash = hash;
  }

  get lastIndexed() {
    return this.doc.lastIndexed;
  }
  set lastIndexed(lastIndexed) {
    this.doc.lastIndexed = lastIndexed;
  }

  get updateIndexFailedDate() {
    return this.doc.updateIndexFailedDate;
  }

  set updateIndexFailedDate(updateIndexFailedDate) {
    this.doc.updateIndexFailedDate = updateIndexFailedDate;
  }
}

export class ListingDetailDomainAdapter implements ListingDetailProps {
  constructor(public readonly props: ListingDetail) {}

  get price() {
    return this.props.price;
  }
  set price(price) {
    this.props.price = price;
  }

  get rentHigh() {
    return this.props.rentHigh;
  }
  set rentHigh(rentHigh) {
    this.props.rentHigh = rentHigh;
  }

  get rentLow() {
    return this.props.rentLow;
  }
  set rentLow(rentLow) {
    this.props.rentLow = rentLow;
  }

  get lease() {
    return this.props.lease;
  }
  set lease(lease) {
    this.props.lease = lease;
  }

  get maxGuests() {
    return this.props.maxGuests;
  }
  set maxGuests(maxGuests) {
    this.props.maxGuests = maxGuests;
  }

  get bedrooms() {
    return this.props.bedrooms;
  }
  set bedrooms(bedrooms) {
    this.props.bedrooms = bedrooms;
  }

  get bedroomDetails() {
    return new MongoosePropArray(this.props.bedroomDetails, BedroomDetailDomainAdapter);
  }

  get bathrooms() {
    return this.props.bathrooms;
  }
  set bathrooms(bathrooms) {
    this.props.bathrooms = bathrooms;
  }

  get squareFeet() {
    return this.props.squareFeet;
  }
  set squareFeet(squareFeet) {
    this.props.squareFeet = squareFeet;
  }

  get yearBuilt() {
    return this.props.yearBuilt;
  }
  set yearBuilt(yearBuilt) {
    this.props.yearBuilt = yearBuilt;
  }

  get lotSize() {
    return this.props.lotSize;
  }
  set lotSize(lotSize) {
    this.props.lotSize = lotSize;
  }

  get description() {
    return this.props.description;
  }
  set description(description) {
    this.props.description = description;
  }

  get amenities() {
    return this.props.amenities;
  }
  set amenities(amenities) {
    this.props.amenities = amenities;
  }

  get additionalAmenities() {
    return new MongoosePropArray(this.props.additionalAmenities, AdditionalAmenityDomainAdapter);
  }

  get images() {
    return this.props.images;
  }
  set images(images) {
    this.props.images = images;
  }

  get video() {
    return this.props.video;
  }
  set video(video) {
    this.props.video = video;
  }

  get floorPlan() {
    return this.props.floorPlan;
  }
  set floorPlan(floorPlan) {
    this.props.floorPlan = floorPlan;
  }

  get floorPlanImages() {
    return this.props.floorPlanImages;
  }
  set floorPlanImages(floorPlanImages) {
    this.props.floorPlanImages = floorPlanImages;
  }

  get listingAgent() {
    return this.props.listingAgent;
  }
  set listingAgent(listingAgent) {
    this.props.listingAgent = listingAgent;
  }

  get listingAgentPhone() {
    return this.props.listingAgentPhone;
  }
  set listingAgentPhone(listingAgentPhone) {
    this.props.listingAgentPhone = listingAgentPhone;
  }

  get listingAgentEmail() {
    return this.props.listingAgentEmail;
  }
  set listingAgentEmail(listingAgentEmail) {
    this.props.listingAgentEmail = listingAgentEmail;
  }

  get listingAgentWebsite() {
    return this.props.listingAgentWebsite;
  }
  set listingAgentWebsite(listingAgentWebsite) {
    this.props.listingAgentWebsite = listingAgentWebsite;
  }

  get listingAgentCompany() {
    return this.props.listingAgentCompany;
  }
  set listingAgentCompany(listingAgentCompany) {
    this.props.listingAgentCompany = listingAgentCompany;
  }

  get listingAgentCompanyPhone() {
    return this.props.listingAgentCompanyPhone;
  }
  set listingAgentCompanyPhone(listingAgentCompanyPhone) {
    this.props.listingAgentCompanyPhone = listingAgentCompanyPhone;
  }

  get listingAgentCompanyEmail() {
    return this.props.listingAgentCompanyEmail;
  }
  set listingAgentCompanyEmail(listingAgentCompanyEmail) {
    this.props.listingAgentCompanyEmail = listingAgentCompanyEmail;
  }

  get listingAgentCompanyWebsite() {
    return this.props.listingAgentCompanyWebsite;
  }
  set listingAgentCompanyWebsite(listingAgentCompanyWebsite) {
    this.props.listingAgentCompanyWebsite = listingAgentCompanyWebsite;
  }

  get listingAgentCompanyAddress() {
    return this.props.listingAgentCompanyAddress;
  }
  set listingAgentCompanyAddress(listingAgentCompanyAddress) {
    this.props.listingAgentCompanyAddress = listingAgentCompanyAddress;
  }
}

export class BedroomDetailDomainAdapter implements BedroomDetailProps {
  constructor(public readonly props: BedroomDetail) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }

  get roomName() {
    return this.props.roomName;
  }
  set roomName(roomName) {
    this.props.roomName = roomName;
  }

  get bedDescriptions() {
    return this.props.bedDescriptions;
  }
  set bedDescriptions(bedDescriptions) {
    this.props.bedDescriptions = bedDescriptions;
  }
}

export class AdditionalAmenityDomainAdapter implements AdditionalAmenityProps {
  constructor(public readonly props: AdditionalAmenity) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }

  get category() {
    return this.props.category;
  }
  set category(category) {
    this.props.category = category;
  }

  get amenities() {
    return this.props.amenities;
  }
  set amenities(amenities) {
    this.props.amenities = amenities;
  }
}

export class LocationDomainAdapter implements LocationProps {
  constructor(public readonly props: Location) {}

  get position() {
    if (!this.props?.position) {
      this.props.set('position', {});
      return null;
    }
    return new PositionDomainAdapter(this.props.position);
  }
  get address() {
    if (!this.props.address) {
      this.props.set('address', {});
      return null;
    }
    return new AddressDomainAdapter(this.props.address);
  }
}

export class AddressDomainAdapter implements AddressProps {
  constructor(public readonly props: Location['address']) {}

  get streetNumber(): string {
    return this.props.streetNumber;
  }
  set streetNumber(value: string) {
    this.props.streetNumber = value;
  }

  get streetName(): string {
    return this.props.streetName;
  }
  set streetName(value: string) {
    this.props.streetName = value;
  }

  get municipality(): string {
    return this.props.municipality;
  }
  set municipality(value: string) {
    this.props.municipality = value;
  }

  get municipalitySubdivision(): string {
    return this.props.municipalitySubdivision;
  }
  set municipalitySubdivision(value: string) {
    this.props.municipalitySubdivision = value;
  }

  get localName(): string {
    return this.props.localName;
  }
  set localName(value: string) {
    this.props.localName = value;
  }

  get countrySecondarySubdivision(): string {
    return this.props.countrySecondarySubdivision;
  }
  set countrySecondarySubdivision(value: string) {
    this.props.countrySecondarySubdivision = value;
  }

  get countryTertiarySubdivision(): string {
    return this.props.countryTertiarySubdivision;
  }
  set countryTertiarySubdivision(value: string) {
    this.props.countryTertiarySubdivision = value;
  }

  get countrySubdivision(): string {
    return this.props.countrySubdivision;
  }
  set countrySubdivision(value: string) {
    this.props.countrySubdivision = value;
  }

  get countrySubdivisionName(): string {
    return this.props.countrySubdivisionName;
  }
  set countrySubdivisionName(value: string) {
    this.props.countrySubdivisionName = value;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }
  set postalCode(value: string) {
    this.props.postalCode = value;
  }

  get extendedPostalCode(): string {
    return this.props.extendedPostalCode;
  }
  set extendedPostalCode(value: string) {
    this.props.extendedPostalCode = value;
  }

  get countryCode(): string {
    return this.props.countryCode;
  }
  set countryCode(value: string) {
    this.props.countryCode = value;
  }

  get country(): string {
    return this.props.country;
  }
  set country(value: string) {
    this.props.country = value;
  }

  get countryCodeISO3(): string {
    return this.props.countryCodeISO3;
  }
  set countryCodeISO3(value: string) {
    this.props.countryCodeISO3 = value;
  }

  get freeformAddress(): string {
    return this.props.freeformAddress;
  }
  set freeformAddress(value: string) {
    this.props.freeformAddress = value;
  }

  get streetNameAndNumber(): string {
    return this.props.streetNameAndNumber;
  }
  set streetNameAndNumber(value: string) {
    this.props.streetNameAndNumber = value;
  }

  get routeNumbers(): string {
    return this.props.routeNumbers;
  }
  set routeNumbers(value: string) {
    this.props.routeNumbers = value;
  }

  get crossStreet(): string {
    return this.props.crossStreet;
  }
  set crossStreet(value: string) {
    this.props.crossStreet = value;
  }
}

export class PositionDomainAdapter implements PositionProps {
  constructor(public readonly props: Location['position']) {}

  get type(): string {
    return this.props.type;
  }
  set type(value: string) {
    this.props.type = value;
  }

  get coordinates(): number[] {
    return this.props.coordinates;
  }
  set coordinates(value: number[]) {
    this.props.coordinates = value;
  }
}
