export const uiConfig = {
  authority: import.meta.env.VITE_AAD_B2C_ACCOUNT_AUTHORITY ?? "",
  client_id:  import.meta.env.VITE_AAD_B2C_ACCOUNT_CLIENTID ?? "", 
  redirect_uri: import.meta.env.VITE_AAD_B2C_REDIRECT_URI ?? "",
  code_verifier: true,
  noonce: true,
  response_type: 'code',
  scope: import.meta.env.VITE_AAD_B2C_ACCOUNT_SCOPES,
  onSigninCallback: (_user:any | void) : void => {
    console.log('onSigninCallback');
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
    let redirectToPath = window.sessionStorage.getItem('redirectTo');
    if (redirectToPath){
        window.location.pathname = redirectToPath;
        window.sessionStorage.removeItem('redirectTo');
    }
  }
}
  
export const staffConfig = {
  authority: import.meta.env.VITE_AAD_ACCOUNT_AUTHORITY ?? "",
  client_id:  import.meta.env.VITE_AAD_ACCOUNT_CLIENTID ?? "", 
  redirect_uri: import.meta.env.VITE_AAD_REDIRECT_URI ?? "",
  code_verifier: true,
  noonce: true,
  response_type: 'code',
  scope: import.meta.env.VITE_AAD_ACCOUNT_SCOPES,
  onSigninCallback: (_user:any | void) : void => {
    console.log('onSigninStaffCallback');
  }
}