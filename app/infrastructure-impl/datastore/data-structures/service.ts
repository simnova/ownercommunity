import { BaseDataStructure } from "../../../../seedwork/services-seedwork-datastore-memorydb/interfaces/base";
import { CommunityDataStructure } from "./community";

export interface ServiceDataStructure extends BaseDataStructure {
  serviceName: string;
  description: string;
  community: CommunityDataStructure | string;
  isActive: boolean;
}