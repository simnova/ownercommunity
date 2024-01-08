import fs from 'fs'

import config from './../test.settings.json';
const globalSetup = () => {
  let localConfig = {Values: {}};

  if (!fs.existsSync('./../local.settings.json')) {
    localConfig = require('./../local.settings.json');
  }

  process.env = {
    ...process.env,
    ...localConfig.Values,
    ...config.Values,
  };
};
export default globalSetup;