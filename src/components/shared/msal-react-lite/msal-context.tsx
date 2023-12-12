import * as msal from "@azure/msal-browser";
import { createContext } from 'react';

export interface MsalContextInterface {
  getAuthToken:  (identifier:string|undefined) => Promise<string|undefined>, 
  getAuthResult: (identifier:string|undefined) => Promise<msal.AuthenticationResult|undefined>,
  getSilentAuthResult: (identifier:string|undefined) => Promise<msal.AuthenticationResult|undefined>,

  /**
   * Determines if the user has been authenticated, they however may not have an access token.
   * To determine if the user has an access token use this in combination with one of the following
   *  -getAuthResult() -which will prompt for login
   *  -getSilentAuthResult() -which will not prompt for login
  **/
  getIsLoggedIn: (identifier:string|undefined) => boolean,
  logout:        (identifier:string|undefined) => Promise<void>;

  /**
   *  Logs in the user interactively, call when you know the user is not already logged in.
   *  @param options optional - object containing the following fields:
   * - `state`: optional - string to be passed back to the redirect uri after successful login.
   * - `params`: optional - additional parameters to be passed to the authorize endpoint - readable by AAD custom user journeys.
   */
  login:         (identifier:string|undefined,options?:{state?:string, params?:Map<string,string>}|undefined) => Promise<msal.AuthenticationResult|undefined>;
  registerCallback: (identifier:string|undefined,callback:(isLoggedIn:boolean, authResult:msal.AuthenticationResult | undefined) => void) => void;
} 

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <MsalProvider>.');
};

const initialContext = {
  getAuthToken:   stub,
  getAuthResult:  stub,
  getSilentAuthResult:  stub,
  getIsLoggedIn:  stub,
  logout:         stub,
  login:          stub,
  registerCallback: stub,
};
  
const MsalContext = createContext<MsalContextInterface>(initialContext);
  
export default MsalContext;