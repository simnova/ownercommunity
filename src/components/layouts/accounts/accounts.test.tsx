import * as ApolloClient from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';
import * as Auth from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import App from '../../../App';
import { oidcConfig } from '../../../config/odic-config';
import { act } from 'react-dom/test-utils';

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
    // set up authenticated environment
    const useAuthSpy = vi.spyOn(Auth, 'useAuth');
    const mockResolveValue = {
      isAuthenticated: true
    };
    useAuthSpy.mockReturnValue(mockResolveValue as any);

    // set up user data from useQuery
    const useQuerySpy = vi.spyOn(ApolloClient, 'useQuery');
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

// authorized user, click Create Community button to navigate to create community page
describe('given authorized user, when navigating to community/accounts/create-community', () => {
  it('should display /community/accounts/create-community screen', async () => {
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

    const createCommunityButton = screen.getByText('Create a Community...');
    await act(async () => {
      await createCommunityButton.click();
    });

    await waitFor(() => {
      const createCommunityText = screen.queryByText('Creating your Community');
      expect(createCommunityText).toBeInTheDocument();
    });
  });
});
