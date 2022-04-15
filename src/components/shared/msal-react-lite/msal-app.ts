import {  MsalProviderPopupConfig, MsalProviderRedirectConfig } from '.';
import * as msal from '@azure/msal-browser';
import { ConfigType } from './msal-provider';
import { StringDict } from '@azure/msal-common';


export class MsalApp {

  private msalInstance : msal.PublicClientApplication;
  private config : MsalProviderPopupConfig | MsalProviderRedirectConfig;
  private usePopup : boolean;
  private homeAccountId : string |undefined;
  private isLoggedIn : boolean = false;
  private setLoginState: (isLoggedIn: boolean, authResult: msal.AuthenticationResult | undefined) => void = () => {
    //do nothing
  };

  
  public registerCallback = (callback:(isLoggedIn: boolean, authResult:msal.AuthenticationResult | undefined)=>void) => {
    this.setLoginState = callback;
    (async() => await this.getSilentAuthResult())()
  }

  get IsLoggedIn() : boolean{
    try {
      (async() => await this.getSilentAuthResult())()
      this.isLoggedIn = this.msalInstance.getAllAccounts().length > 0 ;
      console.log("getting logged in value:",this.isLoggedIn);
    } catch (err) {
      this.isLoggedIn = false;
    }
    return this.isLoggedIn;
  }
  get MsalInstance() : msal.PublicClientApplication{
    return this.msalInstance;
  }
  
  constructor(msalInstance : msal.PublicClientApplication, config : MsalProviderPopupConfig | MsalProviderRedirectConfig){
    this.msalInstance = msalInstance;
    this.config = config;
    this.usePopup = config.type === ConfigType.Popup;
  }
  
  /**
   *  Logs in the user interactively, call when you know the user is not already logged in.
   *  @param options object containing the following fields:
   * - `state`: optional - string to be passed back to the redirect uri after successful login.
   * - `params`: optional - additional parameters to be passed to the authorize endpoint - readable by AAD custom user journeys.
   */
  public async login(options?:{state?:string, params?:Map<string,string>}) : Promise<msal.AuthenticationResult | undefined> {
    
    var queryParams:StringDict = {};
    var state = options?.state ?? "";
   
    if(options && options.params){
      options.params.forEach((value,key)=>{
        queryParams[key] = value;
      });
    }

    console.log('adding state to query params',state);

    if (this.usePopup) {
      var popupConfig = this.config as MsalProviderPopupConfig;
      popupConfig.loginRequestConfig!.extraQueryParameters = queryParams;
      popupConfig.loginRequestConfig!.state = state;
      return this.loginPopup(popupConfig.loginRequestConfig);
    } else {
      var redirectConfig = this.config as MsalProviderRedirectConfig;
      redirectConfig.redirectRequestConfig!.extraQueryParameters = queryParams;
      redirectConfig.redirectRequestConfig!.state = state;
      await this.loginRedirect(redirectConfig?.redirectRequestConfig);
      return undefined;
    }
  }

  private async loginPopup(
    loginRequestConfig?: msal.PopupRequest
  )  : Promise<msal.AuthenticationResult | undefined> {
    try {
      const loginResponse = await this.msalInstance.loginPopup(loginRequestConfig);
      this.homeAccountId = loginResponse.account?.homeAccountId;
      return await this.getAuthResult();
    } catch (err) {
      console.error("Login error", err);
      this.isLoggedIn = false;
      this.setLoginState(false,undefined);
      return undefined;
    }
  }

  public async loginRedirect (
    redirectRequestConfig?: msal.RedirectRequest | undefined
  )  {
    try {
      await this.msalInstance.loginRedirect(redirectRequestConfig);
    } catch (err) {
      console.error("login redirect error",err);
      // handle error
    }
  }

  public async handleRedirectResult (
    authResult: msal.AuthenticationResult | null
  )  {
    if(authResult){
      this.isLoggedIn = true;
      this.setLoginState(true,authResult);
     // console.log('here-baby',authResult);
    }
    else {
      authResult = (await this.getAuthResult()) ?? null;
      if(authResult){
        this.isLoggedIn = true;
        this.setLoginState(true,authResult);
      }
    }
    this.isLoggedIn = false;
    this.setLoginState(false,undefined);
    /*

    if (!authResult && authResult !== null) {
      //may be called from loginTokenPopup or on a page load
      authResult = (await this.getAuthResult()) ?? null;
    }
    if (
        (
          authResult !== null &&
          authResult.account !== null &&
          authResult.account?.homeAccountId !== this.homeAccountId
        )
      ){
    */
     // this.homeAccountId = authResult.account?.homeAccountId;
     // this.getAuthResult(authResult.account?.homeAccountId);
    //} 
  }

  private getAccount (
    providedHomeAccountId?: string
  ): msal.AccountInfo | undefined  {
    let usedHomeAccountId = providedHomeAccountId ?? this.homeAccountId;
    if (!usedHomeAccountId) return this.msalInstance.getAllAccounts()[0];
    return this.msalInstance.getAccountByHomeId(usedHomeAccountId) ?? undefined;
  }

  private getFullSilentRequestConfig  (
    silentRequestConfig: msal.SilentRequest,
    providedHomeAccountId?: string
  ): msal.SilentRequest | undefined  {
    let account = this.getAccount(providedHomeAccountId) ?? ({} as msal.AccountInfo);
    if (typeof account === "undefined") return undefined;
    return {
      account,
      ...silentRequestConfig,
    } as msal.SilentRequest;
  }

  public async getAuthToken  (
    providedHomeAccountId?: string
  ): Promise<string | undefined> {
    return (await this.getAuthResult(providedHomeAccountId))?.accessToken;
  }

  private getAuthResults(
    providedHomeAccountId?: string,
    isSilent:boolean=false
  ): Promise<msal.AuthenticationResult | undefined>  {

    var fullSilentRequestConfig = this.getFullSilentRequestConfig(
      this.config.silentRequestConfig,
      providedHomeAccountId
    );

    if (!fullSilentRequestConfig) {
      this.isLoggedIn = false;
      return Promise.resolve(undefined);
    }

    if (this.usePopup) {
      var popupConfig = this.config as MsalProviderPopupConfig;
      return this.authTokenPopup(
        fullSilentRequestConfig,
        popupConfig.loginRequestConfig,
        true
      );
    } else {
      var redirectConfig = this.config as MsalProviderRedirectConfig;
      return this.authTokenRedirect(
        fullSilentRequestConfig,
        redirectConfig?.redirectRequestConfig,
        true
      );
    }
  }

  public async getAuthResult  (
    providedHomeAccountId?: string
  ): Promise<msal.AuthenticationResult | undefined>  {
    return this.getAuthResults(providedHomeAccountId);
  }

  public async getSilentAuthResult  (
    providedHomeAccountId?: string
  ): Promise<msal.AuthenticationResult | undefined>  {
    return this.getAuthResults(providedHomeAccountId, true);
  }

  private async authTokenPopup  (
    silentRequest: msal.SilentRequest,
    loginRequestConfig?: msal.PopupRequest | undefined,
    isSilent:boolean=false
  ): Promise<msal.AuthenticationResult | undefined>  {
    var authResult: msal.AuthenticationResult;
    try {
      console.log('try1')
      authResult = await this.msalInstance.acquireTokenSilent(silentRequest);
      console.log('logged in1');
      this.isLoggedIn = true;
      this.setLoginState(true,authResult);
      return authResult;
    } catch (err) {
      if (err instanceof msal.InteractionRequiredAuthError && !isSilent && loginRequestConfig) {
        console.log('logged in2');
        authResult = await this.msalInstance.acquireTokenPopup(loginRequestConfig);
        this.isLoggedIn = true;
        this.setLoginState(true,authResult);
        return authResult;
      }
      console.error("auth token popup error",err);
      return undefined;
    }
  }

  private async authTokenRedirect (
    silentRequest: msal.SilentRequest,
    redirectRequestConfig?: msal.RedirectRequest | undefined,
    isSilent:boolean=false
  ): Promise<msal.AuthenticationResult | undefined>  {
    try {
      console.log('try1a')
      var authResult = await this.msalInstance.acquireTokenSilent(silentRequest);
      console.log('logged in1a',authResult);
      this.homeAccountId = authResult.account?.homeAccountId;
      this.isLoggedIn = true;
      this.setLoginState(true,authResult);
      return authResult;
    } catch (err) {
      if (err instanceof msal.InteractionRequiredAuthError && !isSilent) {
        console.log('logged in2a');
        if(redirectRequestConfig) {
          await this.msalInstance.acquireTokenRedirect(redirectRequestConfig);
        }
      }
      
      this.isLoggedIn = false;
      this.setLoginState(false,undefined);
      console.log('error in2b');
      console.log("auth token redirect error",err);
      return undefined;
    }
  }

  public async logout()  {
    if (!this.config.endSessionRequestConfig) {
      this.config.endSessionRequestConfig = {};
    }
    this.config.endSessionRequestConfig.account = this.getAccount();
    if (this.usePopup) {
      await this.msalInstance.logoutPopup(this.config.endSessionRequestConfig)
    }else{
      await this.msalInstance.logoutRedirect(this.config.endSessionRequestConfig)
    }
    this.isLoggedIn = false;
    this.setLoginState(false,undefined);
  }

}