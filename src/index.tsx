import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import MsalProvider from './components/shared/msal-react-lite';
import msalProviderConfig from './config/msal-config';
import ApolloConnection from './components/shared/apollo-connection';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { StyleProvider } from '@ant-design/cssinjs';
import { Button } from 'antd';
import { set } from 'lodash';
import FeatureFlagProvider from './components/shared/feature-flag-react-lite';
import featureFlagConfig from './config/feature-flag-config';
import MaintenanceMessageProvider from './components/shared/maintenance-message';
import { CacheBuster } from 'react-cache-buster/dist/CacheBuster';
import { version } from '../package.json';
function ConfigProviderWrapper() {
  

  const {
    currentTokens
  }=useContext(ThemeContext)
  
console.log("Current token has this things", currentTokens)

  return (
    <ConfigProvider theme={{
      token: {
        ...currentTokens.token,
        colorBgBase: currentTokens.hardCodedTokens.backgroundColor,
        colorTextBase: currentTokens.hardCodedTokens.textColor
      }
    }}>
      
      {/* <StyleProvider hashPriority="high"> */}
      
        <MsalProvider config={msalProviderConfig}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MsalProvider>
      {/* </StyleProvider> */}
    </ConfigProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
   <FeatureFlagProvider config={
    featureFlagConfig
   }>
     <CacheBuster
      currentVersion={version}
      isEnabled={true} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      loadingComponent={<h1>Busting Cache</h1>} //If not pass, nothing appears at the time of new version check.
      // metaFileDirectory={'.'} //If public assets are hosted somewhere other than root on your server.
    >
   <MaintenanceMessageProvider>
   <ThemeProvider>
      <ConfigProviderWrapper />
    </ThemeProvider>
   </MaintenanceMessageProvider>
   </CacheBuster>
   </FeatureFlagProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
