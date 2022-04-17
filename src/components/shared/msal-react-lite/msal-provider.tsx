import React, { FC, ReactNode, useEffect } from 'react';
import MsalContext from './msal-context';
import * as msal from '@azure/msal-browser';
import { MsalApp } from './msal-app';

export enum ConfigType {
  Popup = "popup",
  Redirect = "redirect",
  Map = "map"
}

export interface MsalMinimalSilentRequestConfig {
  scopes: Array<string>;
  claims?: string;
  authority?: string;
  forceRequest?: boolean;
  redirectUri?: string;
}

export interface MsalProviderPopupConfig {
  type: ConfigType.Popup;
  msalConfig: msal.Configuration;
  silentRequestConfig: msal.SilentRequest;
  endSessionRequestConfig?: msal.EndSessionRequest;
  loginRequestConfig?: msal.PopupRequest;
}

export interface MsalProviderRedirectConfig {
  type: ConfigType.Redirect;
  msalConfig: msal.Configuration;
  silentRequestConfig: msal.SilentRequest;
  endSessionRequestConfig?: msal.EndSessionRequest;
  redirectRequestConfig?: msal.RedirectRequest;
}

export interface MsalProviderConfigMap {
  type: ConfigType.Map;
  config: Map<string, (MsalProviderPopupConfig | MsalProviderRedirectConfig)>;
}

export type MsalProps = {
  config: MsalProviderPopupConfig | MsalProviderRedirectConfig | MsalProviderConfigMap;
  children: ReactNode;
};

const MsalProvider: FC<MsalProps> =  (props: MsalProps): JSX.Element => {

  let createApp = (identifier:string,config:MsalProviderPopupConfig | MsalProviderRedirectConfig): [string, MsalApp] => {
    return [
      identifier,
      new MsalApp(
        new msal.PublicClientApplication(
          config.msalConfig
        ), 
        config)
      ];
  }
  
  let getMsalInstances = () => {
    if(props.config.type !== ConfigType.Map)
    {
      return new Map([ createApp("default",props.config) ])
    } else {
      var values: Array<[string,MsalApp]> = [] ;
      (props.config).config.forEach(
        (config,identifier) => {
          values.push([
            identifier,
            new MsalApp(
              new msal.PublicClientApplication(
                config.msalConfig
              ), 
              config
            )
          ])
        }
      );
      return new Map<string,MsalApp>(values);
    }
  }

  const msalInstances : Map<string,MsalApp>  = getMsalInstances();

  useEffect(() => {
    const registerRedirectCallbacks = async (instances:Map<string,MsalApp>) => {
      instances.forEach(async (instance,_identifier) => {
        try{
          var authResult = await instance.MsalInstance.handleRedirectPromise(window.location.hash);
          if(!authResult){
            authResult = await instance.MsalInstance.handleRedirectPromise();
          }
          console.log('before-handle-redirect-result',authResult);
          await instance.handleRedirectResult(authResult);
          console.log('after-handle-redirect-result');
        } catch(error){
          console.error('error-handle-redirect-result:',error);
        }
      });
    }
    registerRedirectCallbacks(msalInstances).catch((error) => console.error(error));
  }, [msalInstances]); // eslint-disable-line react-hooks/exhaustive-deps

  let findInstance =  (identifier:string | undefined) => {
    if(props.config.type !== ConfigType.Map && msalInstances.has("default")){
      return msalInstances.get("default")
    }else if(typeof identifier !== "undefined" && msalInstances.has(identifier)){
      return msalInstances.get(identifier);
    }else {
      throw new Error("MSAL-REACT-LITE : Configuration error: need to supply identifier")
    }
  }
  
  return  (
    <MsalContext.Provider
      value={{
        getAuthToken:  (identifier:string|undefined) =>  findInstance(identifier)?.getAuthToken() ?? new Promise<undefined>(() => {return undefined}),
        getAuthResult: (identifier:string|undefined) => findInstance(identifier)?.getAuthResult() ?? new Promise<undefined>(() => {return undefined}),
        getSilentAuthResult: (identifier:string|undefined) => findInstance(identifier)?.getSilentAuthResult() ?? new Promise<undefined>(() => {return undefined}),
        getIsLoggedIn: (identifier:string|undefined) => findInstance(identifier)?.IsLoggedIn ?? false,
        logout: (identifier:string|undefined) => findInstance(identifier)?.logout() ?? new Promise<void>(() => {return}),
        login:  (identifier:string|undefined,options:{state?:string, params?:Map<string,string>}|undefined) => findInstance(identifier)?.login(options) ?? new Promise<undefined>(() => {return undefined}),
        registerCallback: (identifier:string|undefined,callback:(isLoggedIn:boolean, authResult:msal.AuthenticationResult | undefined) => void) => findInstance(identifier)?.registerCallback(callback) ?? new Promise<void>(() => {return}),
      }}
    >
      {props.children}
    </MsalContext.Provider>
  );
};

export default MsalProvider;