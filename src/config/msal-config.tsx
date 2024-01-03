import * as msal from '@azure/msal-browser';
import {
  MsalProviderPopupConfig,
  MsalProviderRedirectConfig,
} from '../components/shared/msal-react-lite';
import {
  ConfigType,
  MsalProviderConfigMap,
} from '../components/shared/msal-react-lite/msal-provider';


// confirmed Azure AD B2C > Identity Experience Framework > [App Registration] > Application (client) ID
const account_clientId = import.meta.env.VITE_AAD_ACCOUNT_CLIENTID ?? 'missing-client-id';

// B2C -> https://${tenantId}.b2clogin.com/${tenantId}.onmicrosoft.com/${customPolicyName}
const account_authority = import.meta.env.VITE_AAD_ACCOUNT_AUTHORITY ?? 'missing-passwordless-authority';

// "openid" is the default scope for B2C
const account_scopes = import.meta.env.VITE_AAD_ACCOUNT_SCOPES?.split('|') ?? ['missing-scopes'];

// B2C -> https://${tenantId}.b2clogin.com/${tenantId}.onmicrosoft.com/oauth2/v2.0/authorize?p=${customPolicyName}
const knownAuthorities = import.meta.env.VITE_AAD_KNOWN_AUTHORITIES ?? 'missing-known-authorities';

// the URL of where the user will be redirected to after login
const redirectUri = import.meta.env.VITE_AAD_REDIRECT_URI ?? 'missing-redirect-uri';


//var tenantId =import.meta.env.VITE_AAD_DIRECTORY_TENANTID ?? "missing-tenant-id";


//login.windows-ppe.net
//login.windows.net/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//const tenantAuthority = `https://login.microsoftonline.com/${tenantId}`; // allows ONLY for Other AAD accounts to register
//const tenantAuthority = `https://login.microsoftonline.com/${tenantId}.onmicrosoft.com`; // allows ONLY for Other AAD accounts to register

//"https://login.microsoftonline.com/{tenant name}.onmicrosoft.com"

//const appAuthority = tenantAuthority; //to allow any user to sign up must choose commonAuthority

var loggerOptions = {
  loggerCallback: (level:any, message:any, containsPii:boolean) => {
    if (containsPii) {
      return;
    }
    switch (level) {
      case msal.LogLevel.Error:
        console.error(message);
        return;
      case msal.LogLevel.Info:
        console.info(message);
        return;
      case msal.LogLevel.Verbose:
        console.debug(message);
        return;
      case msal.LogLevel.Warning:
        console.warn(message);
        return;
    }
  },
}

var accountConfig: MsalProviderRedirectConfig = {
  type: ConfigType.Redirect,
  msalConfig: {
    auth: {
      clientId: account_clientId,
      authority: account_authority,
      knownAuthorities: [knownAuthorities],
      redirectUri: redirectUri,      
      navigateToLoginRequestUrl: true, 
    },
    system: {
      loggerOptions: loggerOptions
    },
  },
  silentRequestConfig: {
    scopes: account_scopes,
  },
  endSessionRequestConfig: {},
  redirectRequestConfig: {
    scopes: account_scopes,
  },
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars

var msalProviderConfig: MsalProviderConfigMap = {
  type: ConfigType.Map,
  config: new Map<string, MsalProviderPopupConfig | MsalProviderRedirectConfig>(
    [
      ['account', accountConfig],
     // ['admin', adminConfig],
    ]
  ),
}; //when using Facebook Login - cannot use pop-up, login UI doesn't render correctly.

export default msalProviderConfig;
