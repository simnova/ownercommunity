import { PropertyData } from "../../external-dependencies/datastore";
import { PropertyAddInput, PropertyAssignOwnerInput, PropertyDeleteInput, PropertyRemoveOwnerInput, PropertyUpdateInput } from "../../external-dependencies/graphql-api";

export interface PropertyDomainApplicationService {
  propertyAdd(input: PropertyAddInput): Promise<PropertyData>;
  propertyUpdate(input: PropertyUpdateInput): Promise<PropertyData>;
  propertyDelete(input: PropertyDeleteInput): Promise<PropertyData>;
  propertyAssignOwner(input: PropertyAssignOwnerInput): Promise<PropertyData>;
  propertyRemoveOwner(input: PropertyRemoveOwnerInput): Promise<PropertyData>;
  propertyImageRemove(propertyId: string, blobName: string): Promise<PropertyData>;
}