import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ApolloConnection } from './components/shared/apollo-connection';
import { Accounts } from './components/layouts/accounts';
import { Admin } from './components/layouts/admin';
import { Members } from './components/layouts/members';
import { Root } from './components/layouts/root';
import { Staff } from './components/layouts/staff';
import { AuthLanding } from './components/shared/auth-landing';
import RequireAuth from './components/shared/require-auth';
import { AHPProofOfConcepts, AHPRootRouteLayer } from './components/layouts/ahp-proof-of-concepts';
import { AuthProvider } from 'react-oidc-context';
import { uiConfig, staffConfig } from './config/odic-config';
import MaintenanceMessageProvider from './components/shared/maintenance-message';
import { useFeatureFlags } from './components/shared/feature-flag-react-lite';

export function App() {
  const { GetFeatureFlagByName } = useFeatureFlags();

  let maintenanceInfo = {
    impendingMaintenanceStartTimestamp: GetFeatureFlagByName('MAINTENANCE_TIMESTAMP_IMPENDING_UIPORTAL'),
    maintenanceStartTimestamp: GetFeatureFlagByName('MAINTENANCE_START_TIMESTAMP_UIPORTAL'),
    maintenanceEndTimestamp: GetFeatureFlagByName('MAINTENANCE_END_TIMESTAMP_UIPORTAL'),
    upcomingMaintenance: GetFeatureFlagByName('MAINTENANCE_UPCOMING_UIPORTAL'),
    impendingMessage: GetFeatureFlagByName('MAINTENANCE_MSG_IMPENDING_UIPORTAL'),
    maintenanceMessage: GetFeatureFlagByName('MAINTENANCE_MSG_SYSTEM_UIPORTAL'),
    timeoutBeforeMaintenance: import.meta.env.VITE_TIMEOUT_BEFORE_MAINTENANCE ?? 120
  };

  const authSection = (
    <AuthProvider {...uiConfig}>
      <ApolloConnection>
        <RequireAuth forceLogin={true}>
          <MaintenanceMessageProvider maintenanceInfo={maintenanceInfo}>
            <AuthLanding />
          </MaintenanceMessageProvider>
        </RequireAuth>
      </ApolloConnection>
    </AuthProvider>
  );

  const rootSection = (
    <AuthProvider {...uiConfig}>
      <ApolloConnection>
        <MaintenanceMessageProvider maintenanceInfo={maintenanceInfo}>
          <Root />
        </MaintenanceMessageProvider>
      </ApolloConnection>
    </AuthProvider>
  );

  const communitySection = (
    <AuthProvider {...uiConfig}>
      <RequireAuth forceLogin={false}>
        <ApolloConnection>
          <MaintenanceMessageProvider maintenanceInfo={maintenanceInfo}>
            <Routes>
              <Route path="/" element={<Accounts />} />
              <Route path="/accounts/*" element={<Accounts />} />
              <Route path="/:communityId/admin/:memberId/*" element={<Admin />} />
              <Route path="/:communityId/member/:memberId/*" element={<Members />} />
              <Route path={`/${AHPRootRouteLayer}/*`} element={<AHPProofOfConcepts />} />
            </Routes>
          </MaintenanceMessageProvider>
        </ApolloConnection>
      </RequireAuth>
    </AuthProvider>
  );

  const staffSection = (
    <AuthProvider {...staffConfig}>
      <RequireAuth forceLogin={false}>
        <ApolloConnection>
          <MaintenanceMessageProvider maintenanceInfo={maintenanceInfo}>
            <Routes>
              <Route path="/" element={<Staff />} />
            </Routes>
          </MaintenanceMessageProvider>
        </ApolloConnection>
      </RequireAuth>
    </AuthProvider>
  );

  return (
    <Routes>
      <Route path="*" element={rootSection} />
      <Route path="/community/*" element={communitySection} />
      <Route path="/login" element={authSection} />

      <Route path="/staff/*" element={staffSection} />
    </Routes>
  );
}
