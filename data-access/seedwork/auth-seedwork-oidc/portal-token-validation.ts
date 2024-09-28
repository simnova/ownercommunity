import { OpenIdConfig, VerifiedTokenService } from "./verified-token-service";

 export class PortalTokenValidation {
  private tokenVerifier: VerifiedTokenService;
  private tokenSettings: Map<string,OpenIdConfig>;
  
  /**
   * @param refreshInterval The number of seconds to wait between refreshing the keystore, defaults to 5 minutes
   * @param openIdConfigs A map of key and enviornment variable prefix, when a JWT is verified, the matching key is returned with the verified JWT
   * 
   * Expects to have 3 environment variables set:
   * - [prefix]_OIDC_ENDPOINT
   * - [prefix]_OIDC_AUDIENCE  
   * - [prefix]_OIDC_ISSUER
   **/
  private constructor(portal: Map<string, string>, refreshInterval: number  = 1000*60*5) {
    this.tokenSettings = new Map<string,OpenIdConfig>();
    
    for(let [portalKey, envPrefix] of portal){
      this.tokenSettings.set(
        portalKey,
        {
          oidcEndpoint: this.tryGetConfigValue(envPrefix + '_OIDC_ENDPOINT'),   
          clockTolerance: this.tryGetConfigValueWithDefault(envPrefix + '_OIDC_CLOCK_TOLERANCE', '5 minutes'), 
          audience: this.tryGetConfigValue(envPrefix + '_OIDC_AUDIENCE'),
          issuerUrl: this.tryGetConfigValue(envPrefix + '_OIDC_ISSUER'),
          ignoreIssuer: this.tryGetConfigValueWithDefault(envPrefix + '_OIDC_IGNORE_ISSUER', 'false') === 'true',
        } as OpenIdConfig
      );
    }
    this.tokenVerifier = new VerifiedTokenService(this.tokenSettings,refreshInterval);
  }

  public tryGetConfigValue(configKey:string){
    if(process.env.hasOwnProperty(configKey)){
      return process.env[configKey];
    }else{
      throw new Error(`Environment variable ${configKey} not set`);
    }
  }

  public tryGetConfigValueWithDefault(configKey:string, defaultValue: string){
    if(process.env.hasOwnProperty(configKey)){
      return process.env[configKey];
    }else{
      return defaultValue;
    }
  }

  public Start(){
    this.tokenVerifier.Start();
  }

  public async GetVerifiedJwt<OpenIdConfigKeyEnumType> (bearerToken:string): Promise<{verifiedJWT:any,openIdConfigKey:OpenIdConfigKeyEnumType}|null>{ 
    for await(let [openIdConfigKey] of this.tokenSettings){
      let verifiedJWT = await this.tokenVerifier.GetVerifiedJwt(bearerToken,openIdConfigKey);
      // console.log(`for ${openIdConfigKey} with bearerToken: ${bearerToken} verifiedJWT: ${JSON.stringify(verifiedJWT)}`)
      if(verifiedJWT){
        return {
          verifiedJWT:verifiedJWT.payload,
          openIdConfigKey:openIdConfigKey as OpenIdConfigKeyEnumType
        }
      }
    }
    
    return null;
  }

  private static instance: PortalTokenValidation;
  public static initialize(portal: Map<string, string>, refreshInterval: number  = 1000*60*5): void {
    if (PortalTokenValidation.instance) {
      throw new Error('PortalTokenValidation is already initialized');
    }
    PortalTokenValidation.instance = new PortalTokenValidation(portal,refreshInterval);
  }
  public static getInstance(): PortalTokenValidation {
    if (!PortalTokenValidation.instance) {
      throw new Error('PortalTokenValidation is not initialized');
    }
    return PortalTokenValidation.instance;
  }
}