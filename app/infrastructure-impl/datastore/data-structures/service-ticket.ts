import { BaseDataStructure, SubdocumentBaseDataStructure } from "../../../../seedwork/services-seedwork-datastore-memorydb/interfaces/base";
import { CommunityDataStructure } from "./community";
import { MemberDataStructure } from "./member";
import { PropertyDataStructure } from "./property";
import { ServiceDataStructure } from "./service";

export interface ActivityDetail extends SubdocumentBaseDataStructure {
  id: any;
  activityType: string;
  activityDescription: string;
  activityBy: MemberDataStructure | string;
}

export interface Photo extends SubdocumentBaseDataStructure {
  id: any;
  documentId: string;
  description: string;
}

export interface ServiceTicketDataStructure extends BaseDataStructure {
  community: CommunityDataStructure | string;
  property?: PropertyDataStructure | string;
  requestor: MemberDataStructure | string;
  assignedTo?: MemberDataStructure | string;
  service?: ServiceDataStructure | string;
  title: string;
  description: string;
  status: string;
  priority: number;
  activityLog: ActivityDetail[];
  photos: Photo[];
  hash: string;
  lastIndexed: Date;
  updateIndexFailedDate: Date;
}