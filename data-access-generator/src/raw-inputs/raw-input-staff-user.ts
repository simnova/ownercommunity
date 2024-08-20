import { RawInputFromModel } from "../common";

export const rawInputStaffUser: RawInputFromModel = {
  aggregateRootDefinition: `export interface StaffUser extends User {
  role: PopulatedDoc<StaffRole.StaffRole> | ObjectId;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  accessBlocked: boolean;
  tags?: string[];
  search?: StaffUserSearch;
  displayName: string;
  userType: string;

  externalId: string;

}`,
  complexSchemaTypeDefinitions:`export interface StaffUserSearch extends NestedPath {
  hash: string;
  indexedAt: Date;
  indexingFailedAt?: Date;
}
`,
}

