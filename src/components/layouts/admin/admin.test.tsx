import * as ApolloClient from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';
import * as Auth from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import { oidcConfig } from '../../../config/odic-config';
import App from '../../../App';
// unauthorized user
describe('given not authorized, when navigating to /community/admin', () => {
  it('should display Not Authorized', async () => {
    render(
      <AuthProvider {...oidcConfig}>
        <MemoryRouter initialEntries={['/community/admin']}>
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
//authorized user
describe('given a community named Reggie Main Test Complex when navigating to /community/admin', () => {
  it('should display the community name Reggie Main Test Complex and correct community ID', async () => {
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
        communityById: {
          name: 'Reggie Main Test Complex',
          id: '12345abcd',
          
        }
      }
    };
    useQuerySpy.mockReturnValue(mockQueryValue as any);

    render(
      <AuthProvider {...oidcConfig}>
        <MemoryRouter initialEntries={['/community/12345abcd/admin']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );
    const communityIdElement = screen.getByTestId('community-id');
    expect (communityIdElement).toHaveTextContent('12345abcd');
    const communityNameElement = screen.getByTestId('community-name');
    expect(communityNameElement).toHaveTextContent('Reggie Main Test Complex');
    
  });
});
