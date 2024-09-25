import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from './components/shared/azure-monitor';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.less';

import { ConfigProvider } from 'antd';
import FeatureFlagProvider from './components/shared/feature-flag-react-lite';
import featureFlagConfig from './config/feature-flag-config';

import { CachePurgeProvider } from './contexts/components/CachePurgeContext';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';

function ConfigProviderWrapper() {
  const { currentTokens } = useContext(ThemeContext);

  return (
    <ConfigProvider
      theme={{
        token: {
          ...currentTokens.token,
          colorBgBase: currentTokens.hardCodedTokens.backgroundColor,
          colorPrimaryText: currentTokens.hardCodedTokens.textColor
        }
      }}
    >
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppInsightsContext.Provider value={reactPlugin}>
      <FeatureFlagProvider config={featureFlagConfig}>
        <CachePurgeProvider>
          <ConfigProviderWrapper />
        </CachePurgeProvider>
      </FeatureFlagProvider>
    </AppInsightsContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
