import React, { ReactNode, createContext, useEffect, useState } from 'react';
import axios from "axios"
import PackageVersion from "../../package.json"
const version=PackageVersion.version
interface CachePurgeContextType {
  actualVersion: string;
  cachedVersion: string;
  purgeCache: () => void;
}

export const CachePurgeContext = createContext<CachePurgeContextType>({
  actualVersion: '',
  cachedVersion: '',
  purgeCache: () => {
  },
});

export const CachePurgeProvider = ({ children }: { children: ReactNode }) => {
  const [actualVersion, setActualVersion] = useState('');
  const [cachedVersion, setCachedVersion] = useState(version);
  
  
  useEffect(() => {
    
  }, [
    cachedVersion,actualVersion
  ]);
 


  return (
    <CachePurgeContext.Provider
      value={{
        actualVersion,
        cachedVersion,
        purgeCache: () => {
          window.location.reload();
          console.log("Done purging cache");
        }
      }}
    >
      {children}
    </CachePurgeContext.Provider>
  );
};

