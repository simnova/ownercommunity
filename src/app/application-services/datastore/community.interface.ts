import { CommunityData } from "../../infrastructure-services/datastore";
export interface CommunityDatastoreApplicationService {
    getCurrentCommunity(): Promise<CommunityData>;
    getCommunityById(communityId: string): Promise<CommunityData>;
    getCommunityByHandle(handle: string): Promise<CommunityData>;
    getCommunityByDomain(domain: string): Promise<CommunityData>;
    getCommunityByHeader(header: string): Promise<CommunityData>;
    userIsAdmin(communityId: string): Promise<boolean>;
    getCommunitiesForCurrentUser(): Promise<CommunityData[]>;
}
