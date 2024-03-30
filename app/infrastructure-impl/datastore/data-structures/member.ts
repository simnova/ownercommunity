import { BaseDataStructure, NestedPathDataStructure, SubdocumentBaseDataStructure } from "../../../../seedwork/services-seedwork-datastore-memorydb/interfaces/base";
import { CommunityDataStructure } from "./community";
import { RoleDataStructure } from "./role";
import { UserDataStructure } from "./user";

export interface MemberDataStructure extends BaseDataStructure {
  memberName: string;
  community: CommunityDataStructure | string;
  accounts: Account[];
  customViews: CustomView[];
  role?: RoleDataStructure | string;
  profile: Profile;
}

export interface Profile extends NestedPathDataStructure{
  name: string;
  email: string;
  bio: string;
  avatarDocumentId: string;
  interests: string[];
  showInterests: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showProfile: boolean;
  showLocation: boolean;
  showProperties: boolean;
}

export interface CustomView extends SubdocumentBaseDataStructure {
  name: string;
  type: string;
  filters: string[];
  sortOrder: string;
  columnsToDisplay: string[];
}

export interface Account extends SubdocumentBaseDataStructure {
  firstName: string;
  lastName?: string;
  user: UserDataStructure | string;
  statusCode: string;
  createdBy: UserDataStructure | string;
}