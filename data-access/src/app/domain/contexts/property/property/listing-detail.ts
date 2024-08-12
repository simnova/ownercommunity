import { ValueObject, ValueObjectProps } from '../../../../../../seedwork/domain-seedwork/value-object';
import { PropArray } from '../../../../../../seedwork/domain-seedwork/prop-array';
import { BedroomDetail, BedroomDetailProps, BedroomDetailReference } from './bedroom-detail';
import { AdditionalAmenity, AdditionalAmenityProps, AdditionalAmenityReference } from './additional-amenity';
import * as ValueObjects from './listing-detail.value-objects';
import { PropertyVisa } from './property.visa';

export interface ListingDetailProps extends ValueObjectProps {
  price: number;
  rentHigh: number;
  rentLow: number;
  lease: number;
  maxGuests: number;
  bedrooms: number;
  readonly bedroomDetails: PropArray<BedroomDetailProps>;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  lotSize: number;
  description: string;
  amenities: string[];
  readonly additionalAmenities: PropArray<AdditionalAmenityProps>;
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

export interface ListingDetailsEntityReference extends Readonly<Omit<ListingDetailProps, 'bedroomDetails' | 'additionalAmenities'>> {
  bedroomDetails: ReadonlyArray<BedroomDetailReference>;
  additionalAmenities: ReadonlyArray<AdditionalAmenityReference>;
}

export class ListingDetails extends ValueObject<ListingDetailProps> implements ListingDetailsEntityReference {
  constructor(props: ListingDetailProps, private readonly visa: PropertyVisa) {
    super(props);
  }

  get price() {
    return this.props.price;
  }
  get rentHigh() {
    return this.props.rentHigh;
  }
  get rentLow() {
    return this.props.rentLow;
  }
  get lease() {
    return this.props.lease;
  }
  get maxGuests() {
    return this.props.maxGuests;
  }
  get bedrooms() {
    return this.props.bedrooms;
  }
  get bedroomDetails(): ReadonlyArray<BedroomDetail> {
    return this.props.bedroomDetails.items.map((bedroomDetail) => new BedroomDetail(bedroomDetail, this.visa));
  }
  get bathrooms() {
    return this.props.bathrooms;
  }
  get squareFeet() {
    return this.props.squareFeet;
  }
  get yearBuilt() {
    return this.props.yearBuilt;
  }
  get lotSize() {
    return this.props.lotSize;
  }
  get description() {
    return this.props.description;
  }
  get amenities() {
    return this.props.amenities;
  }
  get additionalAmenities(): ReadonlyArray<AdditionalAmenity> {
    return this.props.additionalAmenities.items.map((additionalAmenity) => new AdditionalAmenity(additionalAmenity, this.visa));
  }
  get images() {
    return this.props.images;
  }
  get video() {
    return this.props.video;
  }
  get floorPlan() {
    return this.props.floorPlan;
  }
  get floorPlanImages() {
    return this.props.floorPlanImages;
  }
  get listingAgent() {
    return this.props.listingAgent;
  }
  get listingAgentPhone() {
    return this.props.listingAgentPhone;
  }
  get listingAgentEmail() {
    return this.props.listingAgentEmail;
  }
  get listingAgentWebsite() {
    return this.props.listingAgentWebsite;
  }
  get listingAgentCompany() {
    return this.props.listingAgentCompany;
  }
  get listingAgentCompanyPhone() {
    return this.props.listingAgentCompanyPhone;
  }
  get listingAgentCompanyEmail() {
    return this.props.listingAgentCompanyEmail;
  }
  get listingAgentCompanyWebsite() {
    return this.props.listingAgentCompanyWebsite;
  }
  get listingAgentCompanyAddress() {
    return this.props.listingAgentCompanyAddress;
  }

  private validateVisa() {
    if (!this.visa.determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  // using set from TS 5.1

  set Price(price: number | null) {
    this.validateVisa();
    this.props.price = new ValueObjects.Price(price).valueOf();
  }

  set RentHigh(rentHigh: number | null) {
    this.validateVisa();
    this.props.rentHigh = new ValueObjects.RentHigh(rentHigh).valueOf();
  }

  set RentLow(rentLow: number | null) {
    this.validateVisa();
    this.props.rentLow = new ValueObjects.RentLow(rentLow).valueOf();
  }

  set Lease(lease: number | null) {
    this.validateVisa();
    this.props.lease = new ValueObjects.Lease(lease).valueOf();
  }

  set MaxGuests(maxGuests: number | null) {
    this.validateVisa();
    this.props.maxGuests = new ValueObjects.MaxGuests(maxGuests).valueOf();
  }

  set Bedrooms(bedrooms: number | null) {
    this.validateVisa();
    this.props.bedrooms = new ValueObjects.Bedrooms(bedrooms).valueOf();
  }

  set Bathrooms(bathrooms: number | null) {
    this.validateVisa();
    this.props.bathrooms = new ValueObjects.Bathrooms(bathrooms).valueOf();
  }

  set SquareFeet(squareFeet: number | null) {
    this.validateVisa();
    this.props.squareFeet = new ValueObjects.SquareFeet(squareFeet).valueOf();
  }

  set YearBuilt(yearBuilt: number | null) {
    this.validateVisa();
    this.props.yearBuilt = new ValueObjects.YearBuilt(yearBuilt).valueOf();
  }

  set LotSize(lotSize: number | null) {
    this.validateVisa();
    this.props.lotSize = new ValueObjects.LotSize(lotSize).valueOf();
  }

  set Description(description: string | null) {
    this.validateVisa();
    this.props.description = new ValueObjects.Description(description).valueOf();
  }

  set Amenities(amenities: string[] | null) {
    this.validateVisa();
    this.props.amenities = new ValueObjects.Amenities(amenities).valueOf();
  }

  set Images(images: string[] | null) {
    this.validateVisa();
    //TODO: if any images are removed, remove them from blob storage as well as part of events.
    this.props.images = new ValueObjects.Images(images).valueOf();
  }

  set Video(video: string | null) {
    this.validateVisa();
    this.props.video = new ValueObjects.Video(video).valueOf();
  }

  set FloorPlan(floorPlan: string | null) {
    this.validateVisa();
    this.props.floorPlan = new ValueObjects.FloorPlan(floorPlan).valueOf();
  }

  set FloorPlanImages(floorPlanImages: string[] | null) {
    this.validateVisa();
    this.props.floorPlanImages = new ValueObjects.FloorPlanImages(floorPlanImages).valueOf();
  }

  set ListingAgent(listingAgent: string | null) {
    this.validateVisa();
    this.props.listingAgent = new ValueObjects.ListingAgent(listingAgent).valueOf();
  }

  set ListingAgentPhone(listingAgentPhone: string | null) {
    this.validateVisa();
    this.props.listingAgentPhone = new ValueObjects.ListingAgentPhone(listingAgentPhone).valueOf();
  }

  set ListingAgentEmail(listingAgentEmail: string | null) {
    this.validateVisa();
    this.props.listingAgentEmail = new ValueObjects.ListingAgentEmail(listingAgentEmail).valueOf();
  }

  set ListingAgentWebsite(listingAgentWebsite: string | null) {
    this.validateVisa();
    this.props.listingAgentWebsite = new ValueObjects.ListingAgentWebsite(listingAgentWebsite).valueOf();
  }

  set ListingAgentCompany(listingAgentCompany: string | null) {
    this.validateVisa();
    this.props.listingAgentCompany = new ValueObjects.ListingAgentCompany(listingAgentCompany).valueOf();
  }

  set ListingAgentCompanyPhone(listingAgentCompanyPhone: string | null) {
    this.validateVisa();
    this.props.listingAgentCompanyPhone = new ValueObjects.ListingAgentCompanyPhone(listingAgentCompanyPhone).valueOf();
  }

  set ListingAgentCompanyEmail(listingAgentCompanyEmail: string | null) {
    this.validateVisa();
    this.props.listingAgentCompanyEmail = new ValueObjects.ListingAgentCompanyEmail(listingAgentCompanyEmail).valueOf();
  }

  set ListingAgentCompanyWebsite(listingAgentCompanyWebsite: string | null) {
    this.validateVisa();
    this.props.listingAgentCompanyWebsite = new ValueObjects.ListingAgentCompanyWebsite(listingAgentCompanyWebsite).valueOf();
  }

  set ListingAgentCompanyAddress(listingAgentCompanyAddress: string | null) {
    this.validateVisa();
    this.props.listingAgentCompanyAddress = new ValueObjects.ListingAgentCompanyAddress(listingAgentCompanyAddress).valueOf();
  }
  //

  requestRemoveBedroomDetails(bedroomDetails: BedroomDetail): void {
    this.validateVisa();
    this.props.bedroomDetails.removeItem(bedroomDetails.props);
  }
  requestNewBedroom(): BedroomDetail {
    this.validateVisa();
    return new BedroomDetail(this.props.bedroomDetails.getNewItem(), this.visa);
  }

  requestNewAmenity(): AdditionalAmenity {
    this.validateVisa();
    return new AdditionalAmenity(this.props.additionalAmenities.getNewItem(), this.visa);
  }
  requestRemoveAdditionalAmenity(additionalAmenity: AdditionalAmenity): void {
    this.validateVisa();
    this.props.additionalAmenities.removeItem(additionalAmenity.props);
  }
  requestAddAdditionalAmenity(additionalAmenity: AdditionalAmenity): void {
    this.validateVisa();
    this.props.additionalAmenities.addItem(additionalAmenity.props);
  }

  requestRemoveImage(blobName: string) {
    if (blobName.includes('/listing-floor-plan-images/')) {
      const newFloorPlanImages = this.props.floorPlanImages.filter((image) => image !== blobName);
      this.FloorPlanImages = newFloorPlanImages;
    } else {
      const newImages = this.props.images.filter((image) => image !== blobName);
      this.Images = newImages;
    }
  }
}
