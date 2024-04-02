import { CommunityDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/community";

export interface CommunityDatastoreApplicationService {
    getCurrentCommunity(): Promise<CommunityDataStructure>;
    getCommunityById(communityId: string): Promise<CommunityDataStructure>;
    getCommunityByHandle(handle: string): Promise<CommunityDataStructure>;
    getCommunityByDomain(domain: string): Promise<CommunityDataStructure>;
    getCommunityByHeader(header: string): Promise<CommunityDataStructure>;
    userIsAdmin(communityId: string): Promise<boolean>;
    getCommunitiesForCurrentUser(): Promise<CommunityDataStructure[]>;
}
