import { BaseDataStructure } from "../../../../seedwork/services-seedwork-datastore-memorydb/interfaces/base";
import { UserDataStructure } from "./user";

export interface CommunityDataStructure extends BaseDataStructure {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  createdBy: UserDataStructure | string;
}