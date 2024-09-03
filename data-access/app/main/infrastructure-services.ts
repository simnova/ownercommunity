import { BlobStorageInfrastructureService } from "library/services-seedwork-blob-storage-interfaces";
import { CognitiveSearchInfrastructureService } from "library/services-seedwork-cognitive-search-interfaces";
import { ContentModeratorInfrastructureService } from "library/services-seedwork-content-moderator-interfaces";
import { MapsInfrastructureService } from "library/services-seedwork-maps-interfaces";
import { CybersourceInfrastructureService } from "library/services-seedwork-payment-cybersource-interfaces";
import { VercelInfrastructureService } from "library/services-seedwork-vercel-api/interfaces";
import { DomainInfrastructureService } from "@framework/application-services/domain/domain-infrastructure.interface";


export interface InfrastructureServices {
    vercel: VercelInfrastructureService;
    contentModerator: ContentModeratorInfrastructureService;
    cognitiveSearch: CognitiveSearchInfrastructureService;
    blobStorage: BlobStorageInfrastructureService;
    domain: DomainInfrastructureService;
    maps: MapsInfrastructureService;
    cybersource: CybersourceInfrastructureService;
}