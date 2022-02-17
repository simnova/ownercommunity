import config from './../test.settings.json';
const globalSetup = () => {
  console.log(`globalSetup>config: ${JSON.stringify(config)}`);  
  process.env = Object.assign(process.env, {
      ...config.Values
  });
};
export default globalSetup;