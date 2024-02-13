import * as ApolloClient from '@apollo/client';
import { render, screen, waitFor, within } from '@testing-library/react';
import * as Auth from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import { oidcConfig } from '../../../config/odic-config';
import App from '../../../App';
import { act } from 'react-dom/test-utils';

const communityMockQueryValue = {
  loading: false,
  error: undefined,
  data: {
    communityById: {
      name: 'Reggie Main Test Complex',
      id: '12345abcd'
    },
    rolesByCommunityId: [
      {
        roleName: 'Admin',
        isDefault: 'true',
        createdAt: '03/01/2024',
        updatedAt: '03/01/2024',
        id: '12345abcd',
        __typename: 'Role'
      }
    ]
  }
};

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
//authorized user admin homePage
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

    useQuerySpy.mockReturnValue(communityMockQueryValue as any);

    render(
      <AuthProvider {...oidcConfig}>
        <MemoryRouter initialEntries={['/community/12345abcd/admin']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    const communityIdElement = screen.getByTestId('community-id');
    expect(communityIdElement).toHaveTextContent('12345abcd');
    const communityNameElement = screen.getByTestId('community-name');
    expect(communityNameElement).toHaveTextContent('Reggie Main Test Complex');
  });
});

//authorized user clicking roles tab and navigating to roles page
describe('given a community named Reggie Main Test Complex when navigating to /community/admin/roles', () => {
  it('should display the roles page', async () => {
    // set up authenticated environment
    const useAuthSpy = vi.spyOn(Auth, 'useAuth');
    const mockResolveValue = {
      isAuthenticated: true
    };
    useAuthSpy.mockReturnValue(mockResolveValue as any);

    // set up user data from useQuery
    const useQuerySpy = vi.spyOn(ApolloClient, 'useQuery');

    useQuerySpy.mockReturnValue(communityMockQueryValue as any);
    render(
      <AuthProvider {...oidcConfig}>
        <MemoryRouter initialEntries={['/community/12345abcd/admin']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );
    const rolesLink = screen.getByRole('link', { name: /roles/i });
    await act(async () => {
      rolesLink.click();
    });

    const rolesText = screen.getByTestId('roles-span');
    expect(rolesText).toBeInTheDocument();
  });
});

//authorized user on roles page

describe('given a community named Reggie Main Test Complex when on /community/admin/roles', () => {
  it('should display the roles page and correct roles list', async () => {
    // set up authenticated environment
    const useAuthSpy = vi.spyOn(Auth, 'useAuth');
    const mockResolveValue = {
      isAuthenticated: true
    };
    useAuthSpy.mockReturnValue(mockResolveValue as any);

    // set up user data from useQuery
    const useQuerySpy = vi.spyOn(ApolloClient, 'useQuery');

    useQuerySpy.mockReturnValue(communityMockQueryValue as any);

    // useQuerySpy.mockReturnValue(RoleMockQueryValue as any);
    await act(async () => {
      render(
        <AuthProvider {...oidcConfig}>
          <MemoryRouter initialEntries={['/community/12345abcd/admin/roles']}>
            <App />
          </MemoryRouter>
        </AuthProvider>
      );
    });
    screen.logTestingPlaygroundURL();

    const isdefaultText = screen.getByRole('columnheader', {
      name: /is default/i
    });
    expect(isdefaultText).toBeInTheDocument();
  });
});
