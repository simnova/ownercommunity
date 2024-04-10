// test scenarios:
// 1. not in maintenance mode, show nothing
// 2. in impending mode, show impending message
// 3. in maintenance mode, show maintenance message

import { render, screen } from '@testing-library/react';
import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { act } from 'react-dom/test-utils';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import MaintenanceMessageProvider from '.';
import App from '../../../App';
import * as LocalData from '../../../components/editor/page-layout';
import featureFlagConfig from '../../../config/feature-flag-config';
import { oidcConfig } from '../../../config/odic-config';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import FeatureFlagProvider from '../feature-flag-react-lite';

dayjs.extend(utc);
dayjs.extend(timezone);

let notInMaintenanceModeInfo = {
  impendingMaintenanceStartTimestamp: '',
  maintenanceStartTimestamp: '',
  maintenanceEndTimestamp: '',
  upcomingMaintenance: 'false',
  impendingMessage: '',
  maintenanceMessage: '',
  timeoutBeforeMaintenance: 120
};

let inImpendingModeInfo = {
  impendingMaintenanceStartTimestamp: '2024-02-12T12:12:12Z',
  maintenanceStartTimestamp: '2024-06-12T12:12:12Z',
  maintenanceEndTimestamp: '2024-12-12T12:12:12Z',
  upcomingMaintenance: 'true',
  impendingMessage: 'impendingMessage',
  maintenanceMessage: 'maintenanceMessage',
  timeoutBeforeMaintenance: 120
};

let inMaintenanceModeInfo = {
  impendingMaintenanceStartTimestamp: '2024-02-12T12:12:12Z',
  maintenanceStartTimestamp: dayjs().subtract(1, 'day').toISOString(),
  maintenanceEndTimestamp: '2024-12-12T12:12:12Z',
  upcomingMaintenance: 'true',
  impendingMessage: 'impendingMessage',
  maintenanceMessage: 'maintenanceMessage',
  timeoutBeforeMaintenance: 120
};

const givenLoadedPageLayouts = [
  {
    id: '123123',
    parent: '123',
    title: 'title',
    pageType: 'pageType',
    path: 'yyy',
    expanded: false,
    children: [],
    layout: '{hello:world}'
  } as LocalData.LoadedPageLayout
] as LocalData.PageLayouts;

vi.mock('axios');

afterAll(() => {
  vi.resetAllMocks();
});

describe('given not in maintenance mode', () => {
  const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
  usePageLayoutsSpy.mockReturnValue([givenLoadedPageLayouts, {} as any, {} as any]);
  it('should not show any impending or maintenance message', async () => {
    await act(async () => {
      render(
        <FeatureFlagProvider config={featureFlagConfig}>
          <AuthProvider {...oidcConfig}>
            <MaintenanceMessageProvider maintenanceInfo={notInMaintenanceModeInfo}>
              <ThemeProvider>
                <MemoryRouter>
                  <App />
                </MemoryRouter>
              </ThemeProvider>
            </MaintenanceMessageProvider>
          </AuthProvider>
        </FeatureFlagProvider>
      );
    });
    screen.debug();

    const impendingMessage = screen.queryByTestId('impending-message');
    const maintenanceMessage = screen.queryByTestId('maintenance-message');
    expect(impendingMessage).toBeNull();
    expect(maintenanceMessage).toBeNull();

    // show main content only
    const mainContent = screen.getByText(/log in v6/i);
    expect(mainContent).not.toBeNull();
  });
});

describe('given in impending mode', () => {
  it('should show impending message', async () => {
    vi.mocked(axios, true).post.mockResolvedValueOnce({
      data: { data: { serverDate: dayjs().utc().toISOString() } }
    });
    const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
    usePageLayoutsSpy.mockReturnValue([givenLoadedPageLayouts, {} as any, {} as any]);
    await act(async () => {
      render(
        <FeatureFlagProvider config={featureFlagConfig}>
          <AuthProvider {...oidcConfig}>
            <MaintenanceMessageProvider maintenanceInfo={inImpendingModeInfo}>
              <ThemeProvider>
                <MemoryRouter>
                  <App />
                </MemoryRouter>
              </ThemeProvider>
            </MaintenanceMessageProvider>
          </AuthProvider>
        </FeatureFlagProvider>
      );
    });

    screen.debug();

    const impendingMessage = screen.queryByTestId('impending-message');
    const maintenanceMessage = screen.queryByTestId('maintenance-message');
    expect(impendingMessage).not.toBeNull();
    expect(maintenanceMessage).toBeNull();
    // show correct message
    expect(impendingMessage?.textContent).toContain(inMaintenanceModeInfo.impendingMessage);
  });
});

describe('given in maintenance mode', () => {
  vi.mock('axios');
  it('should show maintenance message', async () => {
    // vi.mocked(axios, true).post.mockResolvedValueOnce({
    //   data: { data: { serverDate: dayjs().utc().toISOString() } }
    // });
    // const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
    // usePageLayoutsSpy.mockReturnValue([givenLoadedPageLayouts, {} as any, {} as any]);
    await act(async () => {
      render(
        <FeatureFlagProvider config={featureFlagConfig}>
          <AuthProvider {...oidcConfig}>
            <MaintenanceMessageProvider maintenanceInfo={inMaintenanceModeInfo}>
              <ThemeProvider>
                <MemoryRouter>
                  <App />
                </MemoryRouter>
              </ThemeProvider>
            </MaintenanceMessageProvider>
          </AuthProvider>
        </FeatureFlagProvider>
      );
    });
    screen.debug();
    const impendingMessage = screen.queryByTestId('impending-message');
    const maintenanceMessage = screen.queryByTestId('maintenance-message');
    expect(impendingMessage).toBeNull();
    expect(maintenanceMessage).not.toBeNull();

    // show correct message
    expect(maintenanceMessage?.textContent).toContain(inMaintenanceModeInfo.maintenanceMessage);
    // show maintenance message only (no main content)
    const mainContent = screen.queryByText(/log in v6/i);
    expect(mainContent).toBeNull();
  });
});
