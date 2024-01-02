import * as msal from '@azure/msal-browser';
import React, { FC, ReactNode, useEffect } from 'react';
import { MsalApp } from './msal-app';
import MsalContext from './msal-context';

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

const MsalProvider: FC<MsalProps> =  (props: MsalProps): React.JSX.Element => {
  const [loading, setLoading] = React.useState(true);
  const msalInstances = React.useRef<Map<string,MsalApp>>();
  
  console.log('here');
  

  //let msalInstances : Map<string,MsalApp> // = getMsalInstances();
  useEffect(() => {

    let createApp = (identifier:string,config:MsalProviderPopupConfig | MsalProviderRedirectConfig): [string, MsalApp] => {
      return [
        identifier,
        new MsalApp(
          new msal.PublicClientApplication(
            config.msalConfig
          ), 
          config,
          identifier)
        ];
    }
    const registerRedirectCallback = async(msalApp: MsalApp):Promise<void> => {
      try{
        var authResult = await msalApp.MsalInstance.handleRedirectPromise();
        console.log('handleRedirectPromise - result:',authResult);
        if(authResult?.state && authResult?.state.startsWith(msalApp.Identifier + "|")){ // ensure only the correct app is handling the redirect
          msalApp.handleRedirectResult(authResult);
        }
      } catch(error){
        console.error('handleRedirectPromise - error:',error);
      }
    }
    
    let getMsalInstances = () => {
      if(props.config.type !== ConfigType.Map)
      {
        return new Map([ createApp("default",props.config) ])
      } else {
        var values: Array<[string,MsalApp]> = [] ;
        (props.config).config.forEach(
          (config,identifier) => {
            let msalApp = new MsalApp(
              new msal.PublicClientApplication(
                config.msalConfig
              ), 
              config,
              identifier
            );
            if(config.type === ConfigType.Redirect){
              console.log('registering-redirect-callback');
              registerRedirectCallback(msalApp);
            }
            
            values.push([
              identifier,
              msalApp
            ])
          }
        );
        return new Map<string,MsalApp>(values);
      }
    }

    msalInstances.current  = getMsalInstances();
    console.log("msalInstances loaded",  msalInstances.current.entries.length)
    setLoading(false);
  },[props.config, setLoading,msalInstances]);
/*
  useEffect(() => {
    const registerRedirectCallbacks = async (instances:Map<string,MsalApp>) => {
      instances.forEach(async (instance,identifier) => {
        try{
          var authResult = await instance.MsalInstance.handleRedirectPromise();
          if(!authResult && window.location.hash && window.location.hash.startsWith("#state")){ // don't know why this is needed, but it is.
            console.log("handleRedirectPromise failed, trying again...");
            authResult = await instance.getAuthResult(identifier) || null;
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
*/
  let findInstance =  (identifier:string | undefined) => {
    if(!msalInstances || !msalInstances.current){
      throw new Error("MSAL-REACT-LITE : Configuration error: need to supply identifier")
    }
    if(props.config.type !== ConfigType.Map && msalInstances.current.has("default")){
      return msalInstances.current.get("default")
    }else if(typeof identifier !== "undefined" && msalInstances.current.has(identifier)){
      return msalInstances.current.get(identifier);
    }else {
      throw new Error("MSAL-REACT-LITE : Configuration error: need to supply identifier")
    }
  }
  
  return  (loading === true)?<></> :(

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