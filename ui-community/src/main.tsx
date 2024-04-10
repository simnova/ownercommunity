import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';

import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from './components/shared/azure-monitor';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.less';

import { ConfigProvider } from 'antd';
import { AuthProvider, useAuth } from 'react-oidc-context';
import FeatureFlagProvider, { useFeatureFlags } from './components/shared/feature-flag-react-lite';
import MaintenanceMessageProvider from './components/shared/maintenance-message';
import featureFlagConfig from './config/feature-flag-config';
import { oidcConfig } from './config/odic-config';
import { CachePurgeProvider } from './contexts/CachePurgeContext';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';

function ConfigProviderWrapper() {
  const { currentTokens } = useContext(ThemeContext);
  const { GetFeatureFlagByName } = useFeatureFlags();
  const auth = useAuth();

  let maintenanceInfo = {
    impendingMaintenanceStartTimestamp: GetFeatureFlagByName('MAINTENANCE_TIMESTAMP_IMPENDING_UIPORTAL'),
    maintenanceStartTimestamp: GetFeatureFlagByName('MAINTENANCE_START_TIMESTAMP_UIPORTAL'),
    maintenanceEndTimestamp: GetFeatureFlagByName('MAINTENANCE_END_TIMESTAMP_UIPORTAL'),
    upcomingMaintenance: GetFeatureFlagByName('MAINTENANCE_UPCOMING_UIPORTAL'),
    impendingMessage: GetFeatureFlagByName('MAINTENANCE_MSG_IMPENDING_UIPORTAL'),
    maintenanceMessage: GetFeatureFlagByName('MAINTENANCE_MSG_SYSTEM_UIPORTAL'),
    timeoutBeforeMaintenance: import.meta.env.VITE_TIMEOUT_BEFORE_MAINTENANCE ?? 120
  };

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
      <MaintenanceMessageProvider maintenanceInfo={maintenanceInfo} auth={auth}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </MaintenanceMessageProvider>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppInsightsContext.Provider value={reactPlugin}>
      <FeatureFlagProvider config={featureFlagConfig}>
        <CachePurgeProvider>
          <AuthProvider {...oidcConfig}>
            <ConfigProviderWrapper />
          </AuthProvider>
        </CachePurgeProvider>
      </FeatureFlagProvider>
    </AppInsightsContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
