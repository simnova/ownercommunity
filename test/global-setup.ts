import localConfig from './../local.settings.json';
import config from './../test.settings.json';
const globalSetup = () => {
  process.env = Object.assign({},process.env,
    {... localConfig.Values},
     {
      ...config.Values
  });
};
export default globalSetup;