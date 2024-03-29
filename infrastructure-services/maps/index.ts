// import { CognitiveSearchDomain, CognitiveSearchDomainInitializeable } from "../../domain/infrastructure/cognitive-search/interfaces";

export interface MapsInfrastructureService { //extends CognitiveSearchDomain, CognitiveSearchDomainInitializeable {
  generateSharedKey(): Promise<string>;
}