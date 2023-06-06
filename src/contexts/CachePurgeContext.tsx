import React, { ReactNode, createContext, useEffect, useState } from 'react';
import packageVersion from "../../package.json"
import axios from "axios"

(global as any).appVersion = packageVersion.version;
const version = (global as any).appVersion;

interface CachePurgeContextType {
  actualVersion: string;
  cachedVersion: string;
  forcePurgeCache: () => void;
}

export const CachePurgeContext = createContext<CachePurgeContextType>({
  actualVersion: '',
  cachedVersion: version,
  forcePurgeCache: () => {
    window.location.reload();
    console.log("Done purging cache");
  },
});

export const CachePurgeProvider = ({ children }: { children: ReactNode }) => {
  const [actualVersion, setActualVersion] = useState('');

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
    const interval = setInterval(() => {
      checkVersion();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Force cache reload if the server version is greater than the locally stored version
  useEffect(() => {
    if (actualVersion > version) {
      window.location.reload();
      console.log("Reloading cache due to a newer version on the server");
    }
  }, [actualVersion]);

  return (
    <CachePurgeContext.Provider
      value={{
        actualVersion,
        cachedVersion: version,
        forcePurgeCache: () => {
          window.location.reload();
          console.log("Done purging cache");
        }
      }}
    >
      {children}
    </CachePurgeContext.Provider>
  );
};

