import { BaseDataStructure } from "../../../../seedwork/services-seedwork-datastore-memorydb/interfaces/base";

export interface UserDataStructure extends BaseDataStructure {
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
}