import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from './components/shared/azure-monitor';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.less';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';
import FeatureFlagProvider from './components/shared/feature-flag-react-lite';
import MaintenanceMessageProvider from './components/shared/maintenance-message';
import MsalProvider from './components/shared/msal-react-lite';
import featureFlagConfig from './config/feature-flag-config';
import msalProviderConfig from './config/msal-config';
import { CachePurgeProvider } from './contexts/CachePurgeContext';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';

function ConfigProviderWrapper() {
  

  const {
    currentTokens
  }=useContext(ThemeContext)
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
    <AppInsightsContext.Provider value={reactPlugin}>
      <FeatureFlagProvider config={featureFlagConfig}>
        <MaintenanceMessageProvider>
          <CachePurgeProvider>
            <ThemeProvider>
              <ConfigProviderWrapper />
            </ThemeProvider>
          </CachePurgeProvider>
        </MaintenanceMessageProvider>
      </FeatureFlagProvider>
    </AppInsightsContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
