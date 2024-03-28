import { CommunityDataStructure, MemberDataStructure, PropertyDataStructure, RoleDataStructure, ServiceDataStructure, ServiceTicketDataStructure, UserDataStructure } from "../../application-services/datastore";
import { DatastoreDomain , DatastoreDomainInitializeable} from "../../domain/infrastructure/datastore/interfaces";

export interface Fields {
  [fieldName: string]:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
}

export interface FindQueries<TData> {
  findOneById(id: string): Promise<TData | null | undefined>;
  findManyByIds(ids: string[]): Promise<(TData | null | undefined)[]>;
  findByFields(fields: Fields): Promise<(TData | null | undefined)[]>;
}
export interface DatastoreInfrastructureService extends DatastoreDomain, DatastoreDomainInitializeable {
  communityDatastore: FindQueries<CommunityDataStructure> & {
    getCommunityByHeader(header: string): Promise<CommunityDataStructure>;
    isUserAdmin(communityId: string, externalId: string): Promise<boolean>;
    getCommunitiesForUser(externalId: string): Promise<CommunityDataStructure[]>;

  };
  memberDatastore: FindQueries<MemberDataStructure> & {
    getMembersAssignableToTickets(communityId: string): Promise<MemberDataStructure[]>;
    getMemberByIdWithCommunity(memberId: string): Promise<MemberDataStructure>;
  };
  roleDatastore: FindQueries<RoleDataStructure>;
  propertyDatastore: FindQueries<PropertyDataStructure> & {
    getAll(): Promise<PropertyDataStructure[]>;
    getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<PropertyDataStructure[]>;
    getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyDataStructure>;
  };
  serviceDatastore: FindQueries<ServiceDataStructure>;
  serviceTicketDatastore: FindQueries<ServiceTicketDataStructure> & {
    findByFieldsWithPopulatedValues(fields: Fields): Promise<ServiceTicketDataStructure[]>;
  };
  userDatastore: FindQueries<UserDataStructure> & {
    getAll(): Promise<UserDataStructure[]>;
  };
}