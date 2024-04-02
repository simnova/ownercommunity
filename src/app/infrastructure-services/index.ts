import { VercelInfrastructureService } from "./vercel";
import { ContentModeratorInfrastructureService } from "./content-moderator";
import { CognitiveSearchInfrastructureService } from "./cognitive-search";
import { BlobStorageInfrastructureService } from "./blob-storage";
import { DatastoreInfrastructureService } from "./datastore";
import { MapsInfrastructureService } from "./maps";

export interface InfrastructureServices {
    vercel: VercelInfrastructureService;
    contentModerator: ContentModeratorInfrastructureService;
    cognitiveSearch: CognitiveSearchInfrastructureService;
    blobStorage: BlobStorageInfrastructureService;
    datastore: DatastoreInfrastructureService;
    maps: MapsInfrastructureService;
}