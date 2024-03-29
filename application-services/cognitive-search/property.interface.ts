import { FacetDetail, SearchDocumentsResult } from './_base.interface';

export interface PropertyCognitiveSearchApplicationService {
  propertiesSearch(input: PropertiesSearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  getPropertiesSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>, input: PropertiesSearchInput): Promise<PropertySearchResult>;
}

export type PropertiesSearchInput = {
  options?: PropertiesSearchOptions;
  searchString?: string;
};

export type PropertiesSearchOptions = {
  facets?: string[];
  filter?: FilterDetail;
  orderBy?: string[];
  skip?: number;
  top?: number;
};

export type FilterDetail = {
  communityId?: string;
  createdAt?: string;
  distance?: number;
  listedInfo?: string[];
  listingDetail?: ListingDetailsFilterInput;
  position?: GeographyPointInput;
  propertyType?: string[];
  tags?: string[];
  updatedAt?: string;
};

export type ListingDetailsFilterInput = {
  additionalAmenities?: AdditionalAmenitiesFilterInput[];
  amenities?: string[];
  bathrooms?: number;
  bedrooms?: number;
  prices?: number[];
  squareFeets?: number[];
};

export type AdditionalAmenitiesFilterInput = {
  amenities?: string[];
  category?: string;
  id?: string;
};

export type GeographyPointInput = {
  latitude?: number;
  longitude?: number;
};

export type PropertySearchResult = {
  count?: number;
  facets?: PropertySearchFacets;
  propertyResults?: PropertyResult[];
};

export type PropertySearchFacets = {
  additionalAmenitiesAmenities?: FacetDetail[];
  additionalAmenitiesCategory?: FacetDetail[];
  amenities?: FacetDetail[];
  bathrooms?: FacetDetail[];
  bedrooms?: FacetDetail[];
  createdAt?: FacetDetail[];
  listedForLease?: FacetDetail[];
  listedForRent?: FacetDetail[];
  listedForSale?: FacetDetail[];
  tags?: FacetDetail[];
  type?: FacetDetail[];
  updatedAt?: FacetDetail[];
};

export type PropertyResult = {
  additionalAmenities?: AdditionalAmenitiesSearchResult[];
  address?: Address;
  amenities?: string[];
  bathrooms?: number;
  bedrooms?: number;
  communityId?: string;
  createdAt?: Date;
  id?: string;
  images?: string[];
  listedForLease?: boolean;
  listedForRent?: boolean;
  listedForSale?: boolean;
  listingAgentCompany?: string;
  name?: string;
  position?: GeographyPoint;
  price?: number;
  squareFeet?: number;
  tags?: string[];
  type?: string;
  updatedAt?: Date;
};

export type GeographyPoint = {
  latitude?: number;
  longitude?: number;
};

export type AdditionalAmenitiesSearchResult = {
  amenities?: string[];
  category?: string;
};

export type Address = {
  country?: string;
  countryCode?: string;
  countryCodeISO3?: string;
  countrySecondarySubdivision?: string;
  countrySubdivision?: string;
  countrySubdivisionName?: string;
  countryTertiarySubdivision?: string;
  crossStreet?: string;
  extendedPostalCode?: string;
  freeformAddress?: string;
  localName?: string;
  municipality?: string;
  municipalitySubdivision?: string;
  postalCode?: string;
  routeNumbers?: string;
  streetName?: string;
  streetNameAndNumber?: string;
  streetNumber?: string;
};

