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
   <MaintenanceMessageProvider>
   <ThemeProvider>
      <ConfigProviderWrapper />
    </ThemeProvider>
   </MaintenanceMessageProvider>
   </FeatureFlagProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
