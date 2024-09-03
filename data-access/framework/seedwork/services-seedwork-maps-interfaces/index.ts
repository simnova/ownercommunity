export interface MapsBase {
  generateSharedKey(): Promise<string>;
}

export interface MapsInfrastructureService extends MapsBase {}