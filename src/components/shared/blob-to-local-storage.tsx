import { useEffect, useState } from "react";
import { usePageLayouts } from "../editor/local-data";


export interface BlobToLocalStorageProps {

    communityId?: string ;
  
}
 

export const BlobToLocalStorage: React.FC<BlobToLocalStorageProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [pageLayouts, setPageLayouts] = usePageLayouts();


  useEffect(() => {

    const tryGetPageLayouts = async (communityId:string):Promise<[any]|undefined> => {
        try {
        const api_call = await fetch(`https://ownercommunity.blob.core.windows.net/${ communityId }/website-root`); 
        return api_call.json();
      } catch (error) {
        console.log('app: cannot find pageLayouts from URL:',error);
      }
    }

    const tryGetCommunityId = async() : Promise<string|undefined> => {
      try {
        const api_call = await fetch(`https://ownercommunity.blob.core.windows.net/community-domains/${ window.location.hostname + (window.location.port && window.location.port !== '80' ? ':' + window.location.port: '') }`);
        const data = await api_call.json();
        if(data && data.communityId ){
          console.log('community-id:',data.communityId);
          return data.communityId;
        }
      } catch (error) {
        console.log('app: cannot find community from URL:',error);
      }
    }

    const loadLocalStorage = async (communityId:string|undefined) : Promise<void> => {
      if(typeof communityId === 'undefined' || communityId === ''){
        communityId = await tryGetCommunityId();
      }
      if(typeof communityId !== 'undefined' && communityId !== ''){
        localStorage.setItem('community',communityId);
        const pageLayoutsBlobValue = await tryGetPageLayouts(communityId);
        if(typeof pageLayoutsBlobValue !== 'undefined'){
          setPageLayouts(pageLayoutsBlobValue);
        }
      }
    }

    loadLocalStorage(props.communityId).catch(error => console.log('app: cannot find community to load into local storage:',error));
    setLoading(false);
    
  }, [setLoading,props.communityId]);

  return loading ? <></>:<>{props.children}</>;
}