import { GeographyPoint, SearchIndex } from './base-types';

export const PropertyListingIndexSpec = {
  name: 'property-listings',
  fields: [
    { name: 'id', type: 'Edm.String', searchable: false, key: true },
    {
      name: 'communityId',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
    },
    {
      name: 'name',
      type: 'Edm.String',
      searchable: true,
      filterable: false,
      sortable: true,
      facetable: false,
    },
    {
      name: 'type',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
      sortable: false,
      facetable: true,
    },
    {
      name: 'bedrooms',
      type: 'Edm.Int32',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },

    {
      name: 'amenities',
      type: 'Collection(Edm.String)',
      searchable: false,
      filterable: true,
      sortable: false,
      facetable: true,
    },
    {
      name: 'additionalAmenities',
      type: 'Collection(Edm.ComplexType)',
      fields: [
        {
          name: 'category',
          type: 'Edm.String',
          facetable: true,
          filterable: true,
          retrievable: true,
          searchable: false,
          sortable: false,
        },
        {
          name: 'amenities',
          type: 'Collection(Edm.String)',
          facetable: true,
          filterable: true,
          retrievable: true,
          searchable: false,
          sortable: false,
        },
      ],
    },
    {
      name: 'price',
      type: 'Edm.Double',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: false,
    },
    {
      name: 'squareFeet',
      type: 'Edm.Double',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: false,
    },
    {
      name: 'bathrooms',
      type: 'Edm.Double',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      name: 'position',
      type: 'Edm.GeographyPoint',
      filterable: true,
      sortable: true,
    },
    {
      name: 'images',
      type: 'Collection(Edm.String)',
      searchable: false,
      filterable: false,
      sortable: false,
      facetable: false,
    },
    {
      name: 'listingAgentCompany',
      type: 'Edm.String',
      searchable: false,
      filterable: false,
      sortable: false,
      facetable: false,
    },
    {
      name: 'address',
      type: 'Edm.ComplexType',
      fields: [
        {
          name: 'streetNumber',
          type: 'Edm.String',
          filterable: false,
          sortable: false,
          facetable: false,
          searchable: true,
        },
        {
          name: 'streetName',
          type: 'Edm.String',
          filterable: false,
          sortable: false,
          facetable: false,
          searchable: true,
        },

        {
          name: 'municipality',
          type: 'Edm.String',
          facetable: true,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: true,
        },

        {
          name: 'municipalitySubdivision',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'localName',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'countrySecondarySubdivision',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'countryTertiarySubdivision',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'countrySubdivision',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'countrySubdivisionName',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'postalCode',
          type: 'Edm.String',
          searchable: true,
          filterable: true,
          sortable: true,
          facetable: true,
        },
        {
          name: 'extendedPostalCode',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'countryCode',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'country',
          type: 'Edm.String',
          searchable: true,
          filterable: true,
          sortable: true,
          facetable: true,
        },
        {
          name: 'countryCodeISO3',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'freeformAddress',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'streetNameAndNumber',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'routeNumbers',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
        {
          name: 'crossStreet',
          type: 'Edm.String',
          facetable: false,
          filterable: true,
          retrievable: true,
          searchable: true,
          sortable: false,
        },
      ],
    },
    {
      name: 'listedForSale',
      type: 'Edm.Boolean',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },

    {
      name: 'listedForRent',
      type: 'Edm.Boolean',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      name: 'listedForLease',
      type: 'Edm.Boolean',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      name: 'updatedAt',
      type: 'Edm.DateTimeOffset',
      facetable: true,
      filterable: true,
      retrievable: true,
      sortable: true,
    },
    {
      name: 'createdAt',
      type: 'Edm.DateTimeOffset',
      facetable: true,
      filterable: true,
      retrievable: true,
      sortable: true,
    },

    {
      name: 'tags',
      type: 'Collection(Edm.String)',
      searchable: false,
      filterable: true,
      sortable: false,
      facetable: true,
    },
  ],
} as SearchIndex;

export interface PropertyListingIndexDocument {
  id: string;
  communityId: string;
  name: string;
  type: string;
  bedrooms: number;
  amenities: string[];
  additionalAmenities: {
    category: string;
    amenities: string[];
  }[];
  price: number;
  bathrooms: number;
  squareFeet: number;
  position: GeographyPoint;
  images: string[];
  listingAgentCompany: string;
  address: {
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
  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  updatedAt: string;
  createdAt: string;
  tags: string[];
}
