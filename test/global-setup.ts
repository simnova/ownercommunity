import config from './../test.settings.json';
const globalSetup = () => {
  process.env = Object.assign(process.env, {
      ...config.Values
  });
};
export default globalSetup;