import { Schema, model, Model } from 'mongoose';
import { Base, BaseOptions } from './interfaces/base';

export interface Community extends Base {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
}

export const CommunityModel = model<Community>('Community',new Schema<Community, Model<Community>, Community>(
  {
    schemaVersion: { type: String, default: '1.0.0' },
    name: { 
      type: String, 
      required: true,
      maxlength: 200,
    },
    domain: { type: String, required: false, unique: true, maxlength: 500 },
    whiteLabelDomain: { type: String, required: false, unique: true, maxlength: 500 },
    handle: { 
      type: String, 
      required: false, 
      unique: true,
      maxlength: 50,
    },
  },
  {
    ...BaseOptions,
  }
  ).index(
    { domain:1, whiteLabelDomain:1, handle:1 }
  )
);