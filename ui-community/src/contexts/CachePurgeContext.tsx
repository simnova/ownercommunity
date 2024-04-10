import axios from 'axios';
import { ReactNode, createContext, useEffect } from 'react';
import PackageVersion from '../../package.json';
const appVersion = PackageVersion.version;
interface CachePurgeContextType {
  currentVersion: string;
}

export const CachePurgeContext = createContext<CachePurgeContextType>({
  currentVersion: appVersion
});

export const CachePurgeProvider = ({ children }: { children: ReactNode }) => {
  let cachedVersion = localStorage.getItem('cachedVersion');
  useEffect(() => {
    // check if there is cachedVersion in localstorage
    cachedVersion = localStorage.getItem('cachedVersion');
    if (!cachedVersion) {
      localStorage.setItem('cachedVersion', appVersion);
    }
  }, []);

  const fethcVersion = async () => {
    const url = '/meta.json';
    // it will make sure no cache is used
    const config = {
      params: {
        timestamp: Date.now()
      },
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
      }
    };

   try {
    const response = await axios.get(url, config);
    const data = response.data;
    console.log('Checking version', data.version, cachedVersion);
    //check to see if both cached version and data.version are defined and not null

    if (   (cachedVersion && data.version) && (data.version !== cachedVersion)) {
      localStorage.setItem('cachedVersion', data.version);
      window.location.reload();
    }
   } catch (error) {
    console.error('Error fetching version:', error);
   }
  };
// we check for possible cache purgin every 20 seconds

  useEffect(() => {
    const setIntervalImmediately = (func: any, interval: number) => {
      func();
      return setInterval(func, interval);
    }
    (async()=>{
      setIntervalImmediately(fethcVersion, 20000);
    })()
  }, []);

  return (
    <CachePurgeContext.Provider
      value={{
        currentVersion: cachedVersion ?? appVersion
      }}
    >
      {children}
    </CachePurgeContext.Provider>
  );
};
