import { AxiosRequestConfig } from 'axios';
import { FeatureFlagConfig } from '../components/shared/feature-flag-react-lite';
import defaultValues from './feature-flag-default-values.json';

let axiosHeaders = async (config: AxiosRequestConfig) => {
  //if config is not null
  if (config?.headers) {
    config.headers['Cache-Control'] = `no-cache`;
    config.headers['Pragma'] = `no-cache`;
    config.headers['Expires'] = `0`;
  }
  return config;
};

const featureFlagConfig: FeatureFlagConfig = {
  cache: 60 * 1000, //1 minute
  url: import.meta.env.VITE_FEATURE_FLAG_URL ?? "",
 

  fallbackFlagValues: defaultValues,
  axiosRequestConfig: axiosHeaders
};

export const storybookFeatureFlagConfig: FeatureFlagConfig = {
  cache: 30 * 1000,
  url: '',
  fallbackFlagValues: defaultValues,
  axiosRequestConfig: axiosHeaders
};
export default featureFlagConfig;
