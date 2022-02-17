import { Schema, model, Model,ObjectId, PopulatedDoc, Types } from 'mongoose';
import { Base, BaseOptions, EmbeddedBase } from './interfaces/base';
import * as Community from './community';
import * as Member from './member';
import * as Location from './location';

export interface Property extends Base {
  community: ObjectId;
  location?: PopulatedDoc<Location.Location>;
  owner?: PopulatedDoc<Member.Member>;
  propertyName: string;
  propertyType: string;

  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;

  listingDetails : {
    price: number;
    rentHigh: number;
    rentLow: number;
    lease: number;
    maxGuests: number;
    bedrooms: number;
    bedroomDetails: {
      roomName: string;
      bedDescriptions: string[];
    }
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    lotSize: number;
    description: string;
    amenities: string[];
    addionalAmenities: [{
      category: string;
      amenities: string[];
    }]
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
  },
}

export const PropertyModel = model<Property>('Property', new Schema<Property, Model<Property>, Property>(
  {
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: true, index: true, unique: false },    
    location: Location.LocationModel.schema,
    owner: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: false, index: true, unique: false },
    propertyName: { type: String, required: true },
    propertyType: { type: String, required: false },

    listedForSale: { type: Boolean, required: false, default: false },
    listedForRent: { type: Boolean, required: false, default: false },
    listedForLease: { type: Boolean, required: false, default: false },
    listedInDirectory: { type: Boolean, required: false, default: false },

    listingDetails : {
      price: { type: Number, required: false },
      rentHigh: { type: Number, required: false },
      rentLow: { type: Number, required: false },
      lease: { type: Number, required: false },
      maxGuests : { type: Number, required: false },
      bedrooms: { type: Number, required: false },
      bedroomDetails: [{
        roomName: { type: String, required: false },
        bedDescriptions: { type: [String], required: false },
      }],
      bathrooms: { type: Number, required: false },
      squareFeet: { type: Number, required: false },
      yearBuilt: { type: Number, required: false },
      lotSize: { type: Number, required: false },
      description: { type: String, required: false },
      amenities: { type: [String], required: false },
      additionalAmmenities: [
        {
          category: { type: String, required: false },
          ammenities: { type: [String], required: false },
        }
      ],
      images: { type: [String], required: false },
      video: { type: String, required: false },
      floorPlan: { type: String, required: false },
      floorplanImages: { type: [String], required: false },
      listingAgent: { type: String, required: false },
      listingAgentPhone: { type: String, required: false },
      listingAgentEmail: { type: String, required: false },
      listingAgentWebsite: { type: String, required: false },
      listingAgentCompany: { type: String, required: false },
      listingAgentCompanyPhone: { type: String, required: false },
      listingAgentCompanyEmail: { type: String, required: false },
      listingAgentCompanyWebsite: { type: String, required: false },
      listingAgentCompanyAddress: { type: String, required: false },
    }

      
  },
  {
    ...BaseOptions 
  }
));