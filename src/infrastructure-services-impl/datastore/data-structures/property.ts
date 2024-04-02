import { BaseDataStructure, NestedPathDataStructure, SubdocumentBaseDataStructure } from "../../../../seedwork/services-seedwork-datastore-memorydb/interfaces/base";
import { CommunityDataStructure } from "./community";
import { MemberDataStructure } from "./member";

export interface Point{
  type: string;
  coordinates: number[];
}

export interface ListingDetail extends NestedPathDataStructure {
  id: any;
  price: number;
  rentHigh: number;
  rentLow: number;
  lease: number;
  maxGuests: number;
  bedrooms: number;
  bedroomDetails: BedroomDetail[];
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  lotSize: number;
  description: string;
  amenities: string[];
  additionalAmenities: AdditionalAmenity[];
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

export interface BedroomDetail extends SubdocumentBaseDataStructure {
  id: any;
  roomName: string;
  bedDescriptions: string[];
}

export interface AdditionalAmenity extends SubdocumentBaseDataStructure {
  id: any;
  category: string;
  amenities: string[];
}

export interface Location extends NestedPathDataStructure {
  position: Point;
  address: {
    id: any;
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
  };
}

export interface PropertyDataStructure extends BaseDataStructure {
  community: CommunityDataStructure | string;
  location: Location;
  owner?: MemberDataStructure | string;
  propertyName: string;
  propertyType: string;

  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;

  listingDetail: ListingDetail;

  tags: string[];
  hash: string;
  lastIndexed: Date;
  updateIndexFailedDate: Date;
}