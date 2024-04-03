import { ValueObject, ValueObjectProps } from '../../../../../seedwork/domain-seedwork/value-object';
import { PropArray } from '../../../../../seedwork/domain-seedwork/prop-array';
import { BedroomDetail, BedroomDetailProps, BedroomDetailReference } from './bedroom-detail';
import { AdditionalAmenity, AdditionalAmenityProps, AdditionalAmenityReference } from './additional-amenity';
import * as ValueObjects from './listing-detail.value-objects';
import { PropertyVisa } from '../iam/property-visa';
import { Images } from './listing-detail.value-objects';

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

  set Price(price: ValueObjects.Price | null) {
    this.validateVisa();
    this.props.price = price?.valueOf();
  }

  set RentHigh(rentHigh: ValueObjects.RentHigh | null) {
    this.validateVisa();
    this.props.rentHigh = rentHigh?.valueOf();
  }

  set RentLow(rentLow: ValueObjects.RentLow | null) {
    this.validateVisa();
    this.props.rentLow = rentLow?.valueOf();
  }

  set Lease(lease: ValueObjects.Lease | null) {
    this.validateVisa();
    this.props.lease = lease?.valueOf();
  }

  set MaxGuests(maxGuests: ValueObjects.MaxGuests | null) {
    this.validateVisa();
    this.props.maxGuests = maxGuests?.valueOf();
  }

  set Bedrooms(bedrooms: ValueObjects.Bedrooms | null) {
    this.validateVisa();
    this.props.bedrooms = bedrooms?.valueOf();
  }

  set Bathrooms(bathrooms: ValueObjects.Bathrooms | null) {
    this.validateVisa();
    this.props.bathrooms = bathrooms?.valueOf();
  }

  set SquareFeet(squareFeet: ValueObjects.SquareFeet | null) {
    this.validateVisa();
    this.props.squareFeet = squareFeet?.valueOf();
  }

  set YearBuilt(yearBuilt: ValueObjects.YearBuilt | null) {
    this.validateVisa();
    this.props.yearBuilt = yearBuilt?.valueOf();
  }

  set LotSize(lotSize: ValueObjects.LotSize | null) {
    this.validateVisa();
    this.props.lotSize = lotSize?.valueOf();
  }

  set Description(description: ValueObjects.Description | null) {
    this.validateVisa();
    this.props.description = description?.valueOf();
  }

  set Amenities(amenities: ValueObjects.Amenities | null) {
    this.validateVisa();
    this.props.amenities = amenities?.valueOf();
  }

  set Images(images: ValueObjects.Images | null) {
    this.validateVisa();
    //TODO: if any images are removed, remove them from blob storage as well as part of events.
    this.props.images = images?.valueOf();
  }

  set Video(video: ValueObjects.Video | null) {
    this.validateVisa();
    this.props.video = video?.valueOf();
  }

  set FloorPlan(floorPlan: ValueObjects.FloorPlan | null) {
    this.validateVisa();
    this.props.floorPlan = floorPlan?.valueOf();
  }

  set FloorPlanImages(floorPlanImages: ValueObjects.FloorPlanImages | null) {
    this.validateVisa();
    this.props.floorPlanImages = floorPlanImages?.valueOf();
  }

  set ListingAgent(listingAgent: ValueObjects.ListingAgent | null) {
    this.validateVisa();
    this.props.listingAgent = listingAgent?.valueOf();
  }

  set ListingAgentPhone(listingAgentPhone: ValueObjects.ListingAgentPhone | null) {
    this.validateVisa();
    this.props.listingAgentPhone = listingAgentPhone?.valueOf();
  }

  set ListingAgentEmail(listingAgentEmail: ValueObjects.Email | null) {
    this.validateVisa();
    this.props.listingAgentEmail = listingAgentEmail?.valueOf();
  }

  set ListingAgentWebsite(listingAgentWebsite: ValueObjects.ListingAgentWebsite | null) {
    this.validateVisa();
    this.props.listingAgentWebsite = listingAgentWebsite?.valueOf();
  }

  set ListingAgentCompany(listingAgentCompany: ValueObjects.ListingAgentCompany | null) {
    this.validateVisa();
    this.props.listingAgentCompany = listingAgentCompany?.valueOf();
  }

  set ListingAgentCompanyPhone(listingAgentCompanyPhone: ValueObjects.ListingAgentCompanyPhone | null) {
    this.validateVisa();
    this.props.listingAgentCompanyPhone = listingAgentCompanyPhone?.valueOf();
  }

  set ListingAgentCompanyEmail(listingAgentCompanyEmail: ValueObjects.Email | null) {
    this.validateVisa();
    this.props.listingAgentCompanyEmail = listingAgentCompanyEmail?.valueOf();
  }

  set ListingAgentCompanyWebsite(listingAgentCompanyWebsite: ValueObjects.ListingAgentCompanyWebsite | null) {
    this.validateVisa();
    this.props.listingAgentCompanyWebsite = listingAgentCompanyWebsite?.valueOf();
  }

  set ListingAgentCompanyAddress(listingAgentCompanyAddress: ValueObjects.ListingAgentCompanyAddress | null) {
    this.validateVisa();
    this.props.listingAgentCompanyAddress = listingAgentCompanyAddress?.valueOf();
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
      this.FloorPlanImages = new Images(newFloorPlanImages);
    } else {
      const newImages = this.props.images.filter((image) => image !== blobName);
      this.Images = new Images(newImages);
    }
  }
}
