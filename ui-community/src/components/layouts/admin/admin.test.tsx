import * as ApolloClient from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';
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
    ],
    role: {
      roleName: 'Admin',
      isDefault: 'true',
      createdAt: '03/01/2024',
      updatedAt: '03/01/2024',
      id: '12345abcd',
      __typename: 'Role',
      permissions: {
        serviceTicketPermissions: {
          canCreateTickets: 'true',
          canManageTickets: 'true',
          canAssignTickets: 'true',
          __typename: 'ServiceTicketPermissions'
        },
        communityPermissions: {
          canManageRolesAndPermissions: 'true',
          canManageCommunitySettings: 'true',
          canManageSiteContent: 'true',
          canManageMembers: 'true',
          canEditOwnMemberProfile: 'true',
          canEditOwnMemberAccounts: 'true',
          __typename: 'CommunityPermissions'
        },
        propertyPermissions: {
          canEditOwnProperty: 'true',
          canManageProperties: 'true',
          __typename: 'PropertyPermissions'
        },
        __typename: 'RolePermissions'
      }
    }
  }
};

const useAuthSpy = vi.spyOn(Auth, 'useAuth');
const mockResolveValue = {
  isAuthenticated: true
};

const useQuerySpy = vi.spyOn(ApolloClient, 'useQuery');

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

    useAuthSpy.mockReturnValue(mockResolveValue as any);

    // set up user data from useQuery

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
    useAuthSpy.mockReturnValue(mockResolveValue as any);

    // set up user data from useQuery

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
    useAuthSpy.mockReturnValue(mockResolveValue as any);

    // set up user data from useQuery

    useQuerySpy.mockReturnValue(communityMockQueryValue as any);

    await act(async () => {
      render(
        <AuthProvider {...oidcConfig}>
          <MemoryRouter initialEntries={['/community/12345abcd/admin/roles']}>
            <App />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    const isdefaultText = screen.getByRole('columnheader', {
      name: /is default/i
    });
    expect(isdefaultText).toBeInTheDocument();
  });
});

//authorized user on roles page and clicking on a role to edit
describe('given a community named Reggie Main Test Complex when on /community/admin/roles', () => {
  it('should display the roles edit page after clicking the edit button', async () => {
    // set up authenticated environment
    useAuthSpy.mockReturnValue(mockResolveValue as any);

    // set up user data from useQuery

    useQuerySpy.mockReturnValue(communityMockQueryValue as any);

    await act(async () => {
      render(
        <AuthProvider {...oidcConfig}>
          <MemoryRouter initialEntries={['/community/12345abcd/admin/roles']}>
            <App />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    const editButton = screen.getByRole('button', {
      name: /edit/i
    });

    await act(async () => {
      editButton.click();
    });

    const editRoleText = screen.getByText(/role detail/i);
    expect(editRoleText).toBeInTheDocument();
  });
});

//authorized user on roles edit page
describe('given a community named Reggie Main Test Complex when on /community/admin/roles/12345abcd', () => {
  it('should display the roles edit page and correct role details with all checkboxes checked', async () => {
    // set up authenticated environment

    useAuthSpy.mockReturnValue(mockResolveValue as any);

    // set up user data from useQuery

    useQuerySpy.mockReturnValue(communityMockQueryValue as any);

    await act(async () => {
      render(
        <AuthProvider {...oidcConfig}>
          <MemoryRouter initialEntries={['/community/12345abcd/admin/roles/12345abcd']}>
            <App />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    const roleDetailText = screen.getByText(/can edit own property/i);
    expect(roleDetailText).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox', {
      name: /can edit own property/i
    });
    expect(checkbox).toBeChecked();
  });
});
