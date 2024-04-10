import retry from 'async-retry';
import { AxiosRequestConfig } from 'axios';
import { LRUCache } from 'lru-cache';
import React, { FC, ReactNode, useEffect, useState } from 'react'; // useState
import FeatureFlagContext, { FeatureFlags } from './feature-flag-context';

/**
 * FeatureFlagConfig
 */
export interface FeatureFlagConfig {
  /** maximum age for the cache (in milliseconds), defaults to 30 seconds */
  cache?: number;
  /** url to retrieve the feature flags from */
  url: string;
  /** if url cannot be reached, load local feature flags */
  fallbackFlagValues: FeatureFlags;

  /** if making authenticated feature flag requests may need to add JWT to requests */
  axiosRequestConfig?: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
}
export type FeatureFlagProps = {
  config: FeatureFlagConfig;
  children: ReactNode;
};

const FeatureFlagProvider: FC<FeatureFlagProps> = (props: FeatureFlagProps): React.JSX.Element => {
  let tempFeatureFlagList: FeatureFlags | undefined;
  const [featureFlagList, setFeatureFlagListVal] = useState<FeatureFlags | undefined>();
  const cacheTimeout = !props.config.cache ? 30 * 1000 : props.config.cache;
  const isRendered = React.useRef(false); // Used to make Async code not get called on every render.

  const setFeatureFlagList = (newVal: FeatureFlags | undefined) => {
    // prevents re-rendering each time feature flags are set.
    if (JSON.stringify(tempFeatureFlagList) === JSON.stringify(newVal)) return;
    tempFeatureFlagList = newVal;
    setFeatureFlagListVal(newVal);
  };

  useEffect(() => {
    const setIntervalImmediately = (func: any, interval: number) => {
      func();
      return setInterval(func, interval);
    };

    const options: LRUCache.Options<string, FeatureFlags, any> = {
      max: 500,
      maxSize: 5000,
      ttlAutopurge: false,
      ttl: cacheTimeout,
      ignoreFetchAbort: true,
      allowStaleOnFetchAbort: true,
      sizeCalculation: () => {
        return 1;
      },
      fetchMethod: async (): Promise<FeatureFlags | undefined> => {
        // note: do NOT pass the signal to fetch()!
        // let's say this fetch can take a long time.
        return await retry(
          async () => {
            // if anything throws, we retry
            const res = await fetch(props.config.url);
            const result = await res.json() as FeatureFlags;
            console.log(result);
            return result;
          },
          {
            retries: 3,
          }
        );
      }
    };

    const cachedFetch = new LRUCache(options);

    const GetFeatureFlags = async () => {
      try {
        const result = await cachedFetch.fetch('featureFlagsKey');

        if (result instanceof Object) {
          setFeatureFlagList(result);
        }

      } catch (ex) {
        console.error('Fallback to local feature flags', ex);
        setFeatureFlagList(props.config.fallbackFlagValues);
      }
    };

    (async () => {
      // IIFE to make async code work in a non-async Functional Component
      if (!isRendered.current) {
        //setFeatureFlagList(props.config.fallbackFlagValues);
        setIntervalImmediately(async () => await GetFeatureFlags(), cacheTimeout / 2);
      }
    })();
    return () => {
      isRendered.current = true;
    };
  }, [cacheTimeout, props.config, setFeatureFlagList]);

  const getFeatureFlagByName = (name: string) => {
    const temp = !featureFlagList ? undefined : featureFlagList.FeatureFlags;
    if (!temp) return '';
    const result = temp.find((i) => i.Name === name)?.Value;
    return !result ? '' : result;
  };

  return (
    <FeatureFlagContext.Provider
      value={{
        FeatureFlagList: featureFlagList,
        GetFeatureFlagByName: (name: string) => getFeatureFlagByName(name)
      }}
    >
      {props.children}
    </FeatureFlagContext.Provider>
  );
};

export default FeatureFlagProvider;
