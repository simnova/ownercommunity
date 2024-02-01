import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import { oidcConfig } from '../../../config/odic-config';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../../../App';
import * as Auth from 'react-oidc-context';
import { before } from 'lodash';

// unauthorized user
describe('given not authorized, when navigating to community/accounts', () => {

  it('should display Not Authorized', async () => {
    render(
      <AuthProvider {...oidcConfig}>
        <MemoryRouter initialEntries={['/community/accounts']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      const element = screen.queryByText('Not Authorized');
      expect(element).toBeInTheDocument();
    });
  });
});

// authorized user
describe('given authorized, when navigating to community/accounts', () => {
  const useAuthSpy = vi.spyOn(Auth, 'useAuth');

  beforeAll(() => {
    const mockResolveValue = {
      isAuthenticated: true
    };
    useAuthSpy.mockReturnValue(mockResolveValue as any);
  });

  it('should display Accounts', async () => {
    render(
      <AuthProvider {...oidcConfig}>
        <MemoryRouter initialEntries={['/community/accounts']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      const element = screen.queryByText('Your Community');
      expect(element).toBeInTheDocument();
    });
  });
});
