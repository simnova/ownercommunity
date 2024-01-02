import React, { useEffect, useState } from 'react';
import { usePageLayouts } from '../editor/local-data';

export interface BlobToLocalStorageProps {
  communityId?: string;
}

export const BlobToLocalStorage: React.FC<BlobToLocalStorageProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [, setPageLayouts] = usePageLayouts();

  useEffect(() => {
    const tryGetPageLayouts = async (communityId: string): Promise<[any] | undefined> => {
      try {
        const api_call = await fetch(`https://ownercommunity.blob.core.windows.net/${communityId}/website-root`);
        return api_call.json();
      } catch (error) {
        console.log('app: cannot find pageLayouts from URL:', error);
      }
    };

    const tryGetCommunityId = async (): Promise<string | undefined> => {
      try {
        // temp fix for owner.community blob
        // let hostName = window.location.hostname;
        // if (hostName === "owner.community" || hostName === "ownercommunity-ui.pages.dev") {
        //   hostName = "owners.atlantisocmd.com"
        // }

        // temp fix for the above temp fix - there are more urls we have to rewrite than just owner.community
        const hostName = 'owners.atlantisocmd.com';
        const special_ports = ['80', '3000']; // Not sure why we append ports to the blob storage, but adding this just in case it's needed

        const api_call = await fetch(
          `https://ownercommunity.blob.core.windows.net/community-domains/${
            hostName +
            (window.location.port && (!special_ports.includes(window.location.port) ? ':' + window.location.port : ''))
          }`
        );

        console.log('Blob Storage fetch call: ', api_call)

        const data = await api_call.json();
        if (data?.communityId) {
          console.log('community-id:', data.communityId);
          return data.communityId;
        }
      } catch (error) {
        console.log('app: cannot find community from URL:', error);
      }
    };

    const loadLocalStorage = async (communityId: string | undefined): Promise<void> => {
      if (typeof communityId === 'undefined' || communityId === '') {
        communityId = await tryGetCommunityId();
      }
      if (typeof communityId !== 'undefined' && communityId !== '') {
        localStorage.setItem('community', communityId);
        const pageLayoutsBlobValue = await tryGetPageLayouts(communityId);
        if (typeof pageLayoutsBlobValue !== 'undefined') {
          setPageLayouts(pageLayoutsBlobValue);
        }
      }
    };

    loadLocalStorage(props.communityId).catch((error) =>
      console.log('app: cannot find community to load into local storage:', error)
    );
    setLoading(false);
  }, [setLoading, props.communityId]);

  return loading ? <></> : <>{props.children}</>;
};
