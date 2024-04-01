import { PropertyDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/property";
import { BlobAuthHeader } from "../../../../seedwork/services-seedwork-blob-storage-interfaces";
import { MutationStatus } from "./_base.interfaces";

export interface PropertyBlobStorageApplicationService {
  propertyPublicFileRemove(propertyId: string,memberId: string, fileName: string): Promise<void>;
  propertyListingImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult>;
  propertyFloorPlanImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult>;
  propertyListingImageRemove(propertyId: string, memberId: string, blobName: string): Promise<MutationStatus>;
}

export type PropertyBlobFileAuthHeaderResult = {
  authHeader?: BlobAuthHeader;
  property?: Property;
  status: MutationStatus;
};

export type Property = PropertyDataStructure & {
  mapSASToken?: string;
};