export interface MapsInfrastructureService {
  generateSharedKey(): Promise<string>;
}