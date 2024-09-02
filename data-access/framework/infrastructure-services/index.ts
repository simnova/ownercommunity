import { BlobStorageInfrastructureService } from "./blob-storage.infra.interface";
import { CognitiveSearchInfrastructureService } from "./cognitive-search.infra.interface";
import { ContentModeratorInfrastructureService } from "./content-moderator.infra.interface";
import { CybersourceInfrastructureService } from "./cybersource.infra.interface";
import { DomainInfrastructureService } from "./domain.infra.interface";
import { MapsInfrastructureService } from "./maps.infra.interface";
import { VercelInfrastructureService } from "./vercel.infra.interface";


export interface InfrastructureServices {
    vercel: VercelInfrastructureService;
    contentModerator: ContentModeratorInfrastructureService;
    cognitiveSearch: CognitiveSearchInfrastructureService;
    blobStorage: BlobStorageInfrastructureService;
    domain: DomainInfrastructureService;
    maps: MapsInfrastructureService;
    cybersource: CybersourceInfrastructureService;
}