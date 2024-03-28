import { ContentModeratorDomain, ContentModeratorDomainInitializeable } from "../../domain/infrastructure/content-moderator/interfaces";

export interface ContentModeratorInfrastructureService extends ContentModeratorDomain, ContentModeratorDomainInitializeable {}