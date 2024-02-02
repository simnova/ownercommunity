import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import { oidcConfig } from '../../../config/odic-config';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../../../App';
import * as Auth from 'react-oidc-context';
import * as ApolloClient from '@apollo/client';

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
describe('given authorized user named Duy Nguyen, when navigating to community/accounts', () => {
  it('should display /community/accounts screen, and display Duy Nguyen', async () => {
    const useAuthSpy = vi.spyOn(Auth, 'useAuth');
    const useQuerySpy = vi.spyOn(ApolloClient, 'useQuery');

    const mockResolveValue = {
      isAuthenticated: true
    };
    useAuthSpy.mockReturnValue(mockResolveValue as any);

    const mockQueryValue = {
      loading: false,
      error: undefined,
      data: {
        userCurrent: {
          externalId: '123',
          firstName: 'Duy',
          lastName: 'Nguyen'
        }
      }
    };
    useQuerySpy.mockReturnValue(mockQueryValue as any);

    render(
      <AuthProvider {...oidcConfig}>
        <MemoryRouter initialEntries={['/community/accounts']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      const welcomeTextOnAccountsScreen = screen.queryByText('Your Community');
      expect(welcomeTextOnAccountsScreen).toBeInTheDocument();
      
      const userFirstLastName = screen.queryByText('Duy Nguyen');
      expect(userFirstLastName).toBeInTheDocument();
    });
  });
});
