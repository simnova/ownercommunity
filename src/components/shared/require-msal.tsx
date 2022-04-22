import RequireAuth from './require-auth';
import React, { useEffect, useState } from "react";
import { useMsal } from './msal-react-lite';

export interface RequireMsalProps {
  identifier: string;
  forceLogin?: boolean;
}

const RequireMsal:React.FC<RequireMsalProps> = (params) => {
  const { getIsLoggedIn, registerCallback, getSilentAuthResult, login } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean|undefined>(getIsLoggedIn(params.identifier) === false ? false : undefined);

  useEffect(() => {
    const determineIfUserHasActiveSession = async () => {
      const authResult = getSilentAuthResult(params.identifier);
      if(authResult !== undefined) {
        setIsAuthenticated(true);
      } 
    }
    console.log('lala',isAuthenticated)
    if(isAuthenticated === undefined){ //we are not certain the user has an active session
      console.log('lala')
      determineIfUserHasActiveSession().catch(e => console.error(e));
    }
    if(params.forceLogin && params.forceLogin === true && isAuthenticated === false){
      login(params.identifier);
    }
  }, [isAuthenticated])


  useEffect(() => {
    const processLoginResult = async (result:boolean): Promise<void> => {
      console.log('processLoginResult',result);
      if(params.forceLogin && params.forceLogin === true && result === false){
        await login(params.identifier)
      }else{
        setIsAuthenticated(result);
      }
    }
    registerCallback(params.identifier,(isLoggedIn) => 
      processLoginResult(isLoggedIn).catch(e => console.error(e))
    );
  }, [params,registerCallback,login,setIsAuthenticated]);
  
  return (params.forceLogin && params.forceLogin === true && (typeof isAuthenticated === 'undefined' || isAuthenticated === false)) ?  null : 
  (

    <RequireAuth isAuthenticated={isAuthenticated}>{params.children}</RequireAuth>
  )
}
export default RequireMsal;