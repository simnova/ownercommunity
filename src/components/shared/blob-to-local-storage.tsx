import { useEffect, useState } from 'react';
import { usePageLayouts } from '../editor/page-layout';

export interface BlobToLocalStorageProps {
  communityId?: string;
  children: React.ReactNode;
}

export const BlobToLocalStorage: React.FC<BlobToLocalStorageProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [, setPageLayouts] = usePageLayouts();

  useEffect(() => {
    console.log('BlobToLocalStorage useEffect');
    const tryGetPageLayouts = async (communityId: string): Promise<[any] | undefined> => {
      try {
        const api_call = await fetch(`https://ownercommunity.blob.core.windows.net/${communityId}/website-root`);
        if (!api_call.ok) {
          console.log('app: cannot find pageLayouts from URL - Status:', api_call.status);
          return undefined; // or handle the error as needed
        }

        return api_call.json();

      } catch (error) {
        console.log('app: cannot find pageLayouts from URL:', error);
      }
    };

    const tryGetCommunityId = async (): Promise<string | undefined> => {
      try {
        console.log('tryGetCommunityId');
        const api_call = await fetch(
          `https://ownercommunity.blob.core.windows.net/community-domains/${
            window.location.hostname +
            (window.location.port && window.location.port !== '80' ? ':' + window.location.port : '')
          }`
        );
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
          localStorage.setItem('pageLayouts', JSON.stringify(pageLayoutsBlobValue));
        } else {
          localStorage.setItem('pageLayouts', JSON.stringify(''));
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
