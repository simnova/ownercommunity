import { Document, SchemaOptions } from 'mongoose';

export interface MongoBase {
  id?: any;
  schemaVersion: string;
  createdAt?: Date;
  updatedAt?: Date;
  version: number;
}

/**
 * This _should not_ extend document, but because of this issue we're stuck: https://github.com/GraphQLGuide/apollo-datasource-mongodb/issues/78
 *
 * Can also change type to "any" in the data source but loose type safety
 */
export interface Base extends Document, MongoBase {
  id: any;
  createdAt: Date;
  updatedAt: Date;
}
export const BaseOptions: SchemaOptions = {
  timestamps: true,
  versionKey: 'version',
};

/**
 * This interface is to be used for all Mongoose Subdocuments, either inside an array or as a single document
 * While defining the Mongoose Schema, Subdocument object should be defined as a separate Schema
 */
export interface SubdocumentBase extends Document, Omit<MongoBase, 'schemaVersion'> {}
export const SubdocumentBaseOptions: SchemaOptions = BaseOptions;

/**
 * This interface can only be used for defining a grouping of properties inside a path ina document
 * This should NOT be used for defining array elements, as they will be automatically converted to Subdocuments
 * While defining the Mongoose Schema, NestedPath object should be defined inline with the parent schema
 */
export interface NestedPath extends Document {}

export const Patterns = {
  EMAIL_PATTERN: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  GUID_PATTERN: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
};
