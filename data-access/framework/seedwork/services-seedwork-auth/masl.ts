import {jwtVerify,createRemoteJWKSet} from 'jose';

const verifyAccessToken = async (context) : Promise<[object, boolean]>  => {
  let token = context.request.headers["authorization"];
  if (!token?.startsWith("Bearer ")) return [{}, false];

  token = token.slice(7, token.length).trimStart(); // Remove 'Bearer ' characters from start of Auth header value

  const settings = {
    audience: process.env.AAD_TOKEN_APPLICATION_ID,
    openIdConfigUrl: process.env.AAD_TOKEN_OPEN_ID_CONNECT_METADATA_DOCUMENT,
    tenantId: process.env.AAD_TOKEN_TENANT_ID
  };

  const JWKS = createRemoteJWKSet(new URL(settings.openIdConfigUrl))
  
  let results = await jwtVerify(
    token,
    JWKS,
    {
      audience: settings.audience,//`api://uiapi.pathways.ecfmg.org`,
      issuer: `https://login.microsoftonline.com/${settings.tenantId}/v2.0`
      //`https://sts.windows.net/5e43b6fa-3faf-4d28-87b8-7af9772b5e6a/`
      // issuer: 
        //issuer must remain commented out if you're accepting tokens from :
        // Microsoft's public endpoint (which will be: 'https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0' or it can be any AAD tenant's ID)
        //if you only want to accept local AAD Accounts use: `https://login.microsoftonline.com/${settings.tenantId}/v2.0`
    }
  );
  
  return [
    {
      "authToken": results.payload,
      "userId": results.payload.oid
    },
    true
  ];
}

export default {
  VerifyAccessToken: verifyAccessToken
}