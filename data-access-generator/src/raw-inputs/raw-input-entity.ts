import { RawInputFromModel } from "../common";

export const rawInputEntity: RawInputFromModel = {
  aggregateRootDefinition: `export interface Entity extends Base {
  entityName?: string;
  entityLanguage?: string;
  isIssuingInstitution?: boolean;
  issuingInstitution?: EntityIssuingInstitution;
  isClient?: boolean;
  client?: EntityClient;
  address?: EntityAddressInfo;

  createdBy?: string; // username
  disabledAt?: Date;
  schemaVersion: string;
}`,
  complexSchemaTypeDefinitions: `
  export interface EntityAddressInfo extends NestedPath {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateOrProvince?: string;
  zipOrPostalCode?: string;
  country?: string; // extended ISO code
}


export interface EntityIssuingInstitution extends NestedPath {
  email: string;
  phoneNumber: string;
  address: EntityAddressInfo;
}


export interface EntityClient extends NestedPath {
  email?: string;
  phoneNumber?: string;
  address?: EntityAddressInfo;
}
  `,
};
