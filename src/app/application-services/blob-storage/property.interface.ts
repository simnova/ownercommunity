import { MutationStatus, PropertyBlobFileAuthHeaderResult } from "../../external-dependencies/graphql-api";

export interface PropertyBlobStorageApplicationService {
  propertyPublicFileRemove(propertyId: string,memberId: string, fileName: string): Promise<void>;
  propertyListingImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult>;
  propertyFloorPlanImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult>;
  propertyListingImageRemove(propertyId: string, memberId: string, blobName: string): Promise<MutationStatus>;
}