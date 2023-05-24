import { FeatureFlagConfig } from '../components/shared/feature-flag-react-lite';
import defaultValues from './feature-flag-default-values.json';
import { AxiosRequestConfig } from 'axios';

let axiosHeaders = async (config: AxiosRequestConfig) => {
  //if config is not null
  if (config && config.headers) {
    config.headers['Cache-Control'] = `no-cache`;
    config.headers['Pragma'] = `no-cache`;
    config.headers['Expires'] = `0`;
  }
  return config;
};

let featureFlagConfig: FeatureFlagConfig = {
  cache: 30 * 1000,
  // url: process.env.REACT_APP_FEATURE_FLAG_URL ?? "",
  url: 'https://efmdevstcfgavaqbizf2s7le.blob.core.windows.net/public/EFM_Feature_Flag_DEV.json',

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
