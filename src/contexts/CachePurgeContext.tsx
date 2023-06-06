import React, { ReactNode, createContext, useEffect, useState } from 'react';
import axios from "axios"



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
  const [cachedVersion, setCachedVersion] = useState('');
  // Check version on server
  const checkVersion = async () => {
    try {
      const { data } = await axios('/meta.json');
      setActualVersion(data.version);
    } catch (error) {
      console.log("Error occurred while checking the version:", error);
    }
  };

  // Run the checkVersion function every 5 seconds using setInterval
  useEffect(() => {
    checkVersion();
    // check if we have a cached version
    const version = localStorage.getItem('cachedVersion');
    if (version) {
      setCachedVersion(version);
    }else{
      // set the cached version to actual version
      localStorage.setItem('cachedVersion', actualVersion);
    }
    const interval = setInterval(() => {
      checkVersion();
    }, 5000);
    return () => clearInterval(interval);
  }, [
    actualVersion,
  ]);

  // Force cache reload if the server version is greater than the locally stored version
  useEffect(() => {
    if (actualVersion > cachedVersion) {
      window.location.reload();
      console.log("Reloading cache due to a newer version on the server");
    }
  }, [actualVersion]);

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

