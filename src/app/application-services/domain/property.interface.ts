import { PropertyData } from "../../infrastructure-services/datastore";

export interface PropertyDomainApplicationService {
  propertyAdd(input: PropertyAddInput): Promise<PropertyData>;
  propertyUpdate(input: PropertyUpdateInput): Promise<PropertyData>;
  propertyDelete(input: PropertyDeleteInput): Promise<PropertyData>;
  propertyAssignOwner(input: PropertyAssignOwnerInput): Promise<PropertyData>;
  propertyRemoveOwner(input: PropertyRemoveOwnerInput): Promise<PropertyData>;
  propertyImageRemove(propertyId: string, blobName: string): Promise<PropertyData>;
}

export type PropertyAddInput = {
  propertyName: string;
}

export type PropertyUpdateInput = {
  id: string;
  listedForLease?: boolean;
  listedForRent?: boolean;
  listedForSale?: boolean;
  listedInDirectory?: boolean;
  listingDetail?: ListingDetailsInput;
  location?: LocationInput;
  owner?: PropertyOwnerInput;
  propertyName?: string;
  propertyType?: string;
  tags?: string[];
};

export type ListingDetailsInput = {
  additionalAmenities?: AdditionalAmenitiesInput[];
  amenities?: string[];
  bathrooms?: number;
  bedroomDetails?: BedroomDetailsInput[];
  bedrooms?: number;
  description?: string;
  floorPlan?: string;
  floorPlanImages?: string[];
  images?: string[];
  lease?: number;
  listingAgent?: string;
  listingAgentCompany?: string;
  listingAgentCompanyAddress?: string;
  listingAgentCompanyEmail?: string;
  listingAgentCompanyPhone?: string;
  listingAgentCompanyWebsite?: string;
  listingAgentEmail?: string;
  listingAgentPhone?: string;
  listingAgentWebsite?: string;
  maxGuests?: number;
  price?: number;
  rentHigh?: number;
  rentLow?: number;
  squareFeet?: number;
  video?: string;
};

export type LocationInput = {
  address?: AddressInput;
  position?: PointInput;
};

export type AddressInput = {
  country: string;
  countryCode: string;
  countryCodeISO3: string;
  countrySecondarySubdivision: string;
  countrySubdivision: string;
  countrySubdivisionName: string;
  countryTertiarySubdivision: string;
  crossStreet: string;
  extendedPostalCode: string;
  freeformAddress: string;
  localName: string;
  municipality: string;
  municipalitySubdivision: string;
  postalCode: string;
  routeNumbers: string;
  streetName: string;
  streetNameAndNumber: string;
  streetNumber: string;
};

export type PointInput = {
  coordinates?: number[];
  type?: string;
};

export type PropertyOwnerInput = {
  id?: string;
};

export type AdditionalAmenitiesInput = {
  amenities?: string[];
  category?: string;
  id?: string;
};

export type BedroomDetailsInput = {
  bedDescriptions?: string[];
  id?: string;
  roomName?: string;
};

export type PropertyDeleteInput = {
  id: string;
};

export type PropertyAssignOwnerInput = {
  id: string;
  ownerId: string;
};

export type PropertyRemoveOwnerInput = {
  id: string;
};