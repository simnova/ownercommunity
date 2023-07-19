import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from './components/shared/azure-monitor';

import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import MsalProvider from './components/shared/msal-react-lite';
import msalProviderConfig from './config/msal-config';
import { ConfigProvider } from 'antd';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import FeatureFlagProvider from './components/shared/feature-flag-react-lite';
import featureFlagConfig from './config/feature-flag-config';
import MaintenanceMessageProvider from './components/shared/maintenance-message';
import { CachePurgeProvider } from './contexts/CachePurgeContext';

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
