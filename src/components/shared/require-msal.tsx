import RequireAuth from './require-auth';
import React, { useEffect, useState } from "react";
import { useMsal } from './msal-react-lite';

export interface RequireMsalProps {
  identifier: string;
}

const RequireMsal:React.FC<RequireMsalProps> = (params:any) => {
  const { getIsLoggedIn, registerCallback, getSilentAuthResult } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean|undefined>(getIsLoggedIn(params.identifier) === false ? false : undefined);

  useEffect(() => {
    const determineIfUserHasActiveSession = async () => {
      const authResult = getSilentAuthResult(params.identifier);
      if(authResult !== undefined) {
        setIsAuthenticated(true);
      }
    }

    if(isAuthenticated === undefined){ //we are not certain the user has an active session
      determineIfUserHasActiveSession();
    }
  }, [isAuthenticated])


  useEffect(() => {
    registerCallback(params.identifier, setIsAuthenticated)
  }, [params.identifier,registerCallback]);
  
  return(
    <RequireAuth isAuthenticated={isAuthenticated}>{params.children}</RequireAuth>
  )
}
export default RequireMsal;