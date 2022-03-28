import RequireAuth from './require-auth';
import React, { useEffect, useState } from "react";
import { useMsal } from './msal-react-lite';

export interface RequireMsalProps {
  identifier: string;
}

const RequireMsal:React.FC<RequireMsalProps> = (params:any) => {
  const { getIsLoggedIn, registerCallback } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getIsLoggedIn(params.identifier));

  useEffect(() => {
    registerCallback(params.identifier, setIsAuthenticated)
  }, [params.identifier,registerCallback]);
  
  return(
    <RequireAuth isAuthenticated={isAuthenticated}>{params.children}</RequireAuth>
  )
}
export default RequireMsal;