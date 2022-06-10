import { Schema, model, Model,ObjectId, PopulatedDoc, Types } from 'mongoose';
import { Base, BaseOptions, EmbeddedBase, Patterns } from './interfaces/base';
import * as Community from './community';
import * as Member from './member';
// import * as Location from './location';
import * as Point from './point';

export interface ListingDetail extends EmbeddedBase {
  id: ObjectId;
  price: number;
  rentHigh: number;
  rentLow: number;
  lease: number;
  maxGuests: number;
  bedrooms: number;
  bedroomDetails: Types.DocumentArray<BedroomDetail>;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  lotSize: number;
  description: string;
  amenities: string[];
  additionalAmenities: Types.DocumentArray<AdditionalAmenity>;
  images: string[];
  video: string;
  floorPlan: string;
  floorPlanImages: string[];
  listingAgent: string,
  listingAgentPhone: string,
  listingAgentEmail: string,
  listingAgentWebsite: string,
  listingAgentCompany: string,
  listingAgentCompanyPhone: string,
  listingAgentCompanyEmail: string,
  listingAgentCompanyWebsite: string,
  listingAgentCompanyAddress: string
  
}
export interface BedroomDetail extends EmbeddedBase {
  id: ObjectId;
  roomName: string;
  bedDescriptions: string[];
}
export interface AdditionalAmenity extends EmbeddedBase {
  id: ObjectId;
  category: string;      
  amenities: string[];
}

export interface Location extends EmbeddedBase {
  position: Point.Point;
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
  }
}
export interface Property extends Base {
  community: PopulatedDoc<Community.Community>;
  // location?: PopulatedDoc<Location.Location>;
  location: Location;
  owner?: PopulatedDoc<Member.Member>;
  propertyName: string;
  propertyType: string;

  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;

  listingDetail : ListingDetail;
}
const schema = new Schema<Property, Model<Property>, Property>(
  {
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: true, index: true, unique: false },    
    // location: Location.LocationModel.schema,
    location: {
      position: Point.PointModel.schema,
      address: {
        streetNumber: { type: String, required: true,},
        streetName: { type: String, required: true,},
        municipality: { type: String, required: true,},
        municipalitySubdivision: { type: String, required: true, },
        localName: { type: String, required: true,},
        countrySecondarySubdivision: { type: String, required: true,},
        countryTertiarySubdivision: { type: String, required: true,},
        countrySubdivision: { type: String, required: true,},
        countrySubdivisionName: { type: String, required: true,},
        postalCode: { type: String, required: true, },
        extendedPostalCode: { type: String, required: true,},
        countryCode: {type: String, required: true,},
        country: { type: String, required: true,},
        countryCodeISO3: { type: String, required: true,},
        freeformAddress: {type: String, required: true,},
        streetNameAndNumber: { type: String, required: true,},
        routeNumbers: { type: String, required: true,},
        crossStreet: { type: String, required: true,}
      },
    },
    owner: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: false, index: true, unique: false },
    propertyName: { type: String, required: true, maxlength: 100, index: true },
    propertyType: { type: String, required: false, maxlength: 100 },

    listedForSale: { type: Boolean, required: false, default: false },
    listedForRent: { type: Boolean, required: false, default: false },
    listedForLease: { type: Boolean, required: false, default: false },
    listedInDirectory: { type: Boolean, required: false, default: false },

    listingDetail : {
      price: { type: Number, required: false },
      rentHigh: { type: Number, required: false },
      rentLow: { type: Number, required: false },
      lease: { type: Number, required: false },
      maxGuests : { type: Number, required: false },
      bedrooms: { type: Number, required: false },
      bedroomDetails: [{
        roomName: { type: String, required: false, maxlength: 100 },
        bedDescriptions: { type: [{type: String, maxlength:40}], required: false },
      }],
      bathrooms: { type: Number, required: false },
      squareFeet: { type: Number, required: false },
      yearBuilt: { type: Number, required: false },
      lotSize: { type: Number, required: false },
      description: { type: String, required: false, maxlength: 5000 },
      amenities: { type: [{type: String, maxlength:100}], required: false },
      additionalAmenities: [
        {
          category: { type: String, required: false, maxlength: 100  },
          amenities: { type: [{type: String, maxlength: 100 }], required: false },
        }
      ],
      images: { type: [String], required: false },
      video: { type: String, required: false },
      floorPlan: { type: String, required: false, maxlength: 2000 },
      floorPlanImages: { type: [String], required: false },
      listingAgent: { type: String, required: false, maxlength: 500 },
      listingAgentPhone: { type: String, required: false, maxlength: 100 },
      listingAgentEmail: { type: String, match: Patterns.EMAIL_PATTERN, required: false, maxlength: 254 },
      listingAgentWebsite: { type: String, required: false, maxlength: 1000 },
      listingAgentCompany: { type: String, required: false, maxlength: 500  },
      listingAgentCompanyPhone: { type: String, required: false, maxlength: 100 },
      listingAgentCompanyEmail: { type: String, match: Patterns.EMAIL_PATTERN, required: false, maxlength: 254  },
      listingAgentCompanyWebsite: { type: String, required: false, maxlength: 1000 },
      listingAgentCompanyAddress: { type: String, required: false, maxlength: 1000 },
    }
  },
  {
    ...BaseOptions,
    shardKey: {community:1} 
  }
  ).index(
    { community: 1, propertyName: 1 },  { unique: true }
  );  
/*
schema.path('listingDetails.additionalAmenities').validate(function(additionalAmenities) {
  return additionalAmenities.length > 20;
}, 'Additional Amenities cannot be more than 20');
schema.path('listingDetails.additionalAmenities.amenities').validate(function(amenities) {
  return amenities.length > 20;
}, 'Additional Amenities - Amenities cannot be more than 20');
schema.path('listingDetails.bedroomDetails').validate(function(bedroomDetails) {
  return bedroomDetails.length > 20;
}, 'Bedroom Details cannot be more than 20');
*/

export const PropertyModel = model<Property>('Property', schema);